from flask import Flask, request, jsonify
import json
import boto3
import os
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
import uuid
import datetime
from flask_cors import CORS
import PyPDF2
import google.generativeai as genai
from supabase import create_client, Client
from elevenlabs import VoiceSettings
from elevenlabs.client import ElevenLabs

# Load environment variables
load_dotenv('.env.local')

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# AWS Credentials and S3 Bucket Name
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_REGION = os.getenv('AWS_REGION')
S3_BUCKET_NAME = os.getenv('S3_BUCKET_NAME')

print(AWS_REGION)

# Configure boto3 client
s3_client = boto3.client(
    's3',
    region_name=AWS_REGION,
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY
)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'pdf', 'txt', 'zip', 'docx', 'mp3'}  # Fixed typo
MAX_CONTENT_LENGTH = 2 * 1024 * 1024 * 1024  # 2 GB limit

app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

voices = {
    "female1": "LcfcDJNUP1GQjkzn1xUU",
    "female2": "oWAxZDx7w5VEj9dCyTzz",
    "male1" : "nPczCjzI2devNBz1zQrb",
    "male2" : "TX3LPaxmHKxFdv7VOQHJ",
}

ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")
client = ElevenLabs(
    api_key=ELEVENLABS_API_KEY,
)

def text_to_speech_file(text: str) -> str:
    # Calling the text_to_speech conversion API with detailed parameters
    response = client.text_to_speech.convert(
        voice_id=voices["male1"], # Adam pre-made voice
        output_format="mp3_22050_32",
        text=text,
        model_id="eleven_turbo_v2_5", # use the turbo model for low latency
        voice_settings=VoiceSettings(
            stability=0.0,
            similarity_boost=1.0,
            style=0.0,
            use_speaker_boost=True,
        ),
    )
    return response

API_KEY = os.getenv('NEXT_PUBLIC_GEMINI_API_KEY')
genai.configure(api_key=API_KEY)

def parse_and_summarize(prompt):
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return response.text

@app.route('/api/upload/<id>', methods=['POST'])
def upload(id):
    files = request.files.getlist('files')
    if not files:
        return jsonify({'error': 'No files provided'}), 400

    uploaded_files_info = []
    extracted_texts = []  # List to store extracted texts
    for file in files:
        if file.filename == '':
            continue  # Skip files with no filename
        if allowed_file(file.filename):
            unique_filename = str(uuid.uuid4())
            date_prefix = datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')
            s3_key = f"{date_prefix}_{unique_filename}"
            try:
                # Extract text from PDF
                pdf_reader = PyPDF2.PdfReader(file)  # Use PdfReader instead of PdfFileReader
                text = ""
                for page_num in range(len(pdf_reader.pages)):
                    page = pdf_reader.pages[page_num]
                    text += page.extract_text()
                extracted_texts.append({'filename': file.filename, 'text': text})

                # Reset file pointer to the beginning
                file.seek(0)

                # Upload file to S3
                s3_client.upload_fileobj(
                    file,
                    S3_BUCKET_NAME,
                    s3_key,
                    ExtraArgs={'ACL': 'private'}
                )
                # Generate the S3 file URL
                file_url = s3_client.generate_presigned_url(
                    'get_object',
                    Params={'Bucket': S3_BUCKET_NAME, 'Key': s3_key},
                )
                uploaded_files_info.append(
                    {'filename': file.filename, 'url': file_url})
            except Exception as e:
                print(e)
                return jsonify({'error': 'Error uploading file'}), 500
        else:
            return jsonify({'error': f'File type not allowed: {file.filename}'}), 400

    if uploaded_files_info:
        try:
            prompt = "Make a 5 minute podcast episode about the following text: "
            for text in extracted_texts:
                prompt += text["filename"] + ": " + text['text']
            speak = parse_and_summarize(prompt)
            file = text_to_speech_file(speak)
            name = parse_and_summarize("Generate a name for this podcast episode: " + prompt[56:])
            # Upload this file to S3
            unique_filename = str(uuid.uuid4())
            date_prefix = datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')
            s3_key = f"{date_prefix}_{unique_filename}.mp3"
            s3_client.upload_fileobj(
                file,
                S3_BUCKET_NAME,
                s3_key,
                ExtraArgs={'ACL': 'private'}
            )
            # Generate the S3 file URL
            audio_file_url = s3_client.generate_presigned_url(
                'get_object',
                Params={'Bucket': S3_BUCKET_NAME, 'Key': s3_key},
            )

            # Insert the file URLs into the database
            documents = []
            for uploaded_file_info in uploaded_files_info:
                documents.append(str(uploaded_file_info['url']))

            uid = str(uuid.uuid4())

            response = supabase.table("podcasts").insert([{"id": uid, "owner": id, "name": name, "documents": json.dumps(documents), "audio": audio_file_url}])

        except Exception as e:
            print(e)
            return jsonify({'error': 'Error parsing and summarizing text'}), 500

        return jsonify({'files': uploaded_files_info, 'texts': extracted_texts}), 200
    else:
        return jsonify({'error': 'No files uploaded'}), 400

if __name__ == '__main__':
    app.run(debug=True)
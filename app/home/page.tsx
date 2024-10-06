"use client";
import React, { useState, useEffect, useRef, use } from "react";
import ChooseFiles from "../../components/ChooseFiles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { createClient } from "../../utils/supabase/client";

export default function Home() {
  const [files, setFiles] = useState<any>([]);
  const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  const hiddenFileInput = useRef(null);
  const [id, setId] = useState<string | null>(null);
  const supabase = createClient();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUploadClick = (event: any) => {
    hiddenFileInput.current.click();
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    if (event.target.files[0].size >= 2 * 1024 * 1024 * 1024 ) {
      alert("Please select a file less than 2gb.");
    }
    const file = event.target.files[0];
    setFiles([...files, file]);
    setUploadedFiles([...uploadedFiles, file]);

  };

  const handleDrop = (acceptedFiles: File[]) => {
    setUploading(true);
    setError("");

    const fileSet = new Set(files.map((file: File) => file.name));
    const intersectedFiles = acceptedFiles.filter(file => fileSet.has(file.name));

    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("files", file);
    });

    fetch(`/api/upload/${id}`, {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          setUploadedFiles(data.files);
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Error uploading files");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Error uploading files");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const handleGenerate = () => {
    handleDrop(files);
  }

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const id = user?.id ?? null;
      setId(id);
    }
    getUser();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container flex flex-col justify-center py-8 mx-auto">
        <p className="m-8 text-gray-600">
          (explanation of service and how to use it) Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <div className="flex items-center justify-between mx-24">
          <input
            type="file"
            className="hidden"
            ref={hiddenFileInput}
            onChange={handleUpload}
          />
          <button
            type="submit"
            onClick={handleUploadClick}
            className="bg-gray-300 hover:bg-gray-400 rounded-3xl p-8 flex flex-col items-center w-[40%]"
          >
            <FontAwesomeIcon icon={faUpload} className="w-[50px] h-[50px]" />
            <p className="mt-6 text-xl font-semibold">
              Upload material(s) here
            </p>
          </button>
          <div className="text-xl">or</div>
          <div className="w-[40%]">
            <ChooseFiles files={uploadedFiles} setFiles={setFiles} />
          </div>
        </div>
        <button className="bg-gray-300 m-auto mt-4 hover:bg-gray-400 rounded-3xl p-8 w-[40%]" onClick={handleGenerate}>
            Generate
          </button>
        {uploading && <p className="mt-4 text-blue-600">Uploading files...</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
}

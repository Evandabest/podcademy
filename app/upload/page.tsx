"use client";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ChooseFiles from "../../components/ChooseFiles";
import clsx from "clsx";

const UploadPage = () => {
  const [files, setFiles] = useState<any>([]);
  const [voiceOptions, setVoiceOptions] = useState<any>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<any>();
  const [instructions, setInstructions] = useState<string>("");

  const fakeFiles = [
    { name: "mynotes.pdf", checked: false },
    {
      name: "pset-pset-pset-pset-pset-pset-pset-pset-pset--set2.pdf",
      checked: false,
    },
    { name: "lecture20.pdf", checked: false },
  ];

  const fakeVoiceOptions = [
    { name: "Female voice 1", isClicked: false },
    { name: "Female voice 2", isClicked: false },
    { name: "Male voice 1", isClicked: false },
    { name: "Male voice 2", isClicked: false },
  ];

  useEffect(() => {
    setFiles(fakeFiles);
    setVoiceOptions(fakeVoiceOptions);
  }, []);

  const handleCustomize = (index: number) => {
    const updatedVoices = voiceOptions.map((voice: any, idx: number) => ({
      ...voice,
      isClicked: idx === index ? !voice.isClicked : false,
    }));
    setVoiceOptions(updatedVoices);
    setSelectedVoice(
      updatedVoices[index].isClicked ? updatedVoices[index].name : ""
    );
  };

  const handleGenerate = () => {};

  return (
    <div>
      <p className="m-8">
        (explanation of service and how to use it) Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
      </p>
      <div className="flex flex-col items-center justify-center gap-4 mx-32">
        <div className="flex gap-4 w-full h-[250px]">
          <ChooseFiles files={files} setFiles={setFiles} />
          <div className="flex flex-col w-1/4 p-6 bg-gray-300 rounded-3xl">
            <p className="mb-2 text-lg font-bold">Customize</p>
            <div className="flex flex-col flex-grow space-y-2 overflow-auto">
              {voiceOptions.map((voice: any, idx: any) => (
                <button
                  key={idx}
                  onClick={() => handleCustomize(idx)}
                  className={clsx("rounded-3xl px-2 py-1", {
                    "hover:bg-gray-400": !voice.isClicked,
                    "bg-gray-400": voice.isClicked,
                  })}
                >
                  {voice.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full p-6 bg-gray-300 rounded-3xl">
          <p className="mb-2 text-lg font-bold">Add instructions</p>
          <textarea
            rows={3}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Focus on section 1.2"
            className="w-full p-2 rounded-md"
          />
        </div>
        <button
          onClick={handleGenerate}
          className="p-3 ml-auto bg-gray-300 rounded-3xl hover:bg-gray-400"
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default UploadPage;

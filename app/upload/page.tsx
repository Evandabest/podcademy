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
      <Header showMyPods />
      <p className="m-8">
        (explanation of service and how to use it) Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
      </p>
      <div className="flex flex-col justify-center items-center gap-4 mx-32">
        <div className="flex gap-4 w-full h-[250px]">
          <ChooseFiles files={files} setFiles={setFiles} />
          <div className="bg-gray-300 rounded-3xl p-6 flex flex-col w-1/4">
            <p className="font-bold text-lg mb-2">Customize</p>
            <div className="flex flex-col space-y-2 flex-grow overflow-auto">
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
        <div className="bg-gray-300 rounded-3xl p-6 w-full">
          <p className="font-bold text-lg mb-2">Add instructions</p>
          <textarea
            rows={3}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Focus on section 1.2"
            className="rounded-md p-2 w-full"
          />
        </div>
        <button
          onClick={handleGenerate}
          className="bg-gray-300 rounded-3xl p-3 ml-auto hover:bg-gray-400"
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default UploadPage;

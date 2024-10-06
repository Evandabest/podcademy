"use client";
import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import ChooseFiles from "../../components/ChooseFiles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [files, setFiles] = useState<any>([]);
  const hiddenFileInput = useRef(null);

  const handleUploadClick = (event: any) => {
    hiddenFileInput.current.click();
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    if (event.target.files[0].size >= 2048) {
      alert("Please select a file less than 2mb.");
    }
  };

  const fakeFiles = [
    {
      name: "mynotes.pdf",
      checked: false,
    },
    {
      name: "pset-pset-pset-pset-pset-pset-pset-pset-2.pdf",
      checked: false,
    },
    {
      name: "lecture20.pdf",
      checked: false,
    },
  ];

  useEffect(() => {
    setFiles(fakeFiles);
  }, []);

  return (
    <div className="min-h-screen">
      <Header showMyPods showUpload />
      <div className="container mx-auto py-8">
        <p className="text-gray-600 m-8">
          (explanation of service and how to use it) Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <div className="flex justify-between items-center mx-24">
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
            <p className="text-xl font-semibold mt-6">
              Upload material(s) here
            </p>
          </button>
          <div className="text-xl">or</div>
          <div className="w-[40%]">
            <ChooseFiles files={files} setFiles={setFiles} />
          </div>
        </div>
      </div>
    </div>
  );
}

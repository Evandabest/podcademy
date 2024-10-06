"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [files, setFiles] = useState<any>([]);

  const handleFileCheck = (index: number) => {
    const updatedFiles = files.map((file: any, idx: number) => {
      if (idx === index) {
        return { ...file, checked: !file.checked };
      }
      return file;
    });
    setFiles(updatedFiles);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedFiles = files.map((file: any) => ({
      ...file,
      checked: !selectAll,
    }));
    setFiles(updatedFiles);
  };

  const handleUpload = () => {};

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
    <div className="min-h-screen m-5">
      <Header showMyPods={true} showUpload={true} handleUpload={handleUpload} />
      <div className="container mx-auto py-8">
        <p className="text-gray-600 mb-8">
          (explanation of service and how to use it) Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <div className="flex justify-between items-center">
          <button
            onClick={handleUpload}
            className="bg-gray-300 hover:bg-gray-400 rounded-2xl p-8 flex flex-col items-center w-[40%]"
          >
            <FontAwesomeIcon icon={faUpload} className="w-[50px] h-[50px]" />
            <p className="text-xl font-semibold mt-6">
              Upload material(s) here
            </p>
          </button>
          <div>or</div>
          <div className="bg-gray-300 rounded-2xl p-8 w-[40%]">
            <p className="font-bold text-lg mb-2">Choose files</p>
            <label className="text-left font-medium flex justify-between">
              Select all
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </label>
            {files.map((file: any, idx: number) => (
              <label key={idx} className="text-left flex justify-between mt-1">
                {file.name}
                <input
                  type="checkbox"
                  checked={file.checked}
                  onChange={() => handleFileCheck(idx)}
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

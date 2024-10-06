import React, { useState } from "react";
interface ChooseFilesProps {
  files: any[];
  setFiles: React.Dispatch<any>;
}
const ChooseFiles: React.FC<ChooseFilesProps> = ({ files, setFiles }) => {
  const [selectAll, setSelectAll] = useState<boolean>(false);

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
  return (
    <div className="grow bg-gray-300 rounded-3xl p-6 flex flex-col overflow-auto">
      <p className="font-bold text-lg mb-2">Choose files</p>
      <label className="text-left font-medium flex justify-between gap-2">
        Select all
        <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
      </label>
      {files.map((file: any, idx: number) => (
        <label key={idx} className="text-left flex justify-between mt-1 gap-2">
          {file.name}
          <input
            type="checkbox"
            checked={file.checked}
            onChange={() => handleFileCheck(idx)}
          />
        </label>
      ))}
    </div>
  );
};

export default ChooseFiles;

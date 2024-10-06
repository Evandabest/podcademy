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
    <div className="flex flex-col p-6 overflow-auto bg-gray-300 grow rounded-3xl">
      <p className="mb-2 text-lg font-bold">Choose files</p>
      {files && files.length === 0 ?
      (
        <p>upload some files!</p>
      ) : (
        <label className="flex justify-between gap-2 font-medium text-left">
        Select all
        <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
      </label>
      )}
      {files.map((file: any, idx: number) => (
        <label key={idx} className="flex justify-between gap-2 mt-1 text-left">
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

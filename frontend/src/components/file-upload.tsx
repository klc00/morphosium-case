import React from "react";

const FileUpload = ({ handleFileUpload }: any) => {
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  return <input type="file" accept=".xml,.xls" onChange={handleFileChange} />;
};

export default FileUpload;

import React from "react";

const Result = ({ success, totalRecords, errorMessage }: any) => {
  return (
    <div>
      {success ? (
        <p>İşlem başarılı, {totalRecords} kayıt işlendi.</p>
      ) : (
        <p>İşlem başarısız: {errorMessage}</p>
      )}
    </div>
  );
};

export default Result;

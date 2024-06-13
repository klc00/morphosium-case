"use client";
import React, { useState, useEffect } from "react";
import { Dropdown, Button, Row, Col } from "react-bootstrap";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/file-upload";
import Result from "@/components/result";

const UploadPage = () => {
  const router = useRouter();
  const [selectedTable, setSelectedTable] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const tables = [
    { label: "Tedarikçiler – 10 kolon – 26738 satır", value: "suppliers" },
    { label: "Müşteriler – 8 kolon – 13542 satır", value: "customers" },
    // Diğer tablo seçenekleri...
  ];

  const handleTableChange = (value: any) => {
    setSelectedTable(value);
    // Seçilen tabloya göre veri çekme işlemleri yapılabilir.
  };

  const handlePageChange = (action: any) => {
    if (action === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (action === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const refreshData = () => {
    // Verilerin yenilenmesi işlemleri
  };

  const handleUploadButtonClick = () => {
    // Upload sayfasına yönlendirme işlemi
    router.push("/");
  };

  const handleSendXML = () => {
    // Upload sayfasına yönlendirme işlemi
    router.push("/");
  };

  useEffect(() => {
    // Verilerin çekilmesi ve sayfalama hesaplamaları
  }, [selectedTable, currentPage]);

  const [fileLoading, setFileLoading] = useState(false);
  const [fileUploadSuccess, setFileUploadSuccess] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileUpload = (file: any) => {
    // Dosya yükleme işlemleri
  };

  return (
    <div className="container justify-content-center">
      <Row className="my-3">
        <Col xs={12} md={6} className="text-center">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {selectedTable ? selectedTable : "Select Table"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {tables.map((table) => (
                <Dropdown.Item
                  key={table.value}
                  onClick={() => handleTableChange(table.value)}
                >
                  {table.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs={12} md={6} className="text-center">
          <Button variant="success" onClick={handleUploadButtonClick}>
            View
          </Button>
        </Col>
      </Row>
      <Row className="my-3 justify-content-center">
        <Col xs={12} md={6}>
          <FileUpload handleFileUpload={handleFileUpload} />
        </Col>
      </Row>
      <Row className="my-3 justify-content-center">
        <Col xs={12} md={6}>
          <Button variant="success" onClick={handleSendXML}>
            Send
          </Button>
        </Col>
      </Row>
      <Row className="my-3 justify-content-center">
        <Col xs={12} md={6}>
          <Result
            success={fileUploadSuccess}
            totalRecords={totalRecords}
            errorMessage={errorMessage}
          />
        </Col>
      </Row>
    </div>
  );
};

export default UploadPage;

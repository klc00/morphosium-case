"use client";
import React, { useState, useEffect } from "react";
import { Dropdown, Button, Row, Col } from "react-bootstrap";
import TableWithPagination from "@/components/TableWithPagination";
import { useRouter } from "next/navigation";

const ViewPage = () => {
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
    router.push("/upload");
  };

  useEffect(() => {
    // Verilerin çekilmesi ve sayfalama hesaplamaları
  }, [selectedTable, currentPage]);

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
          <Button variant="primary" onClick={refreshData}>
            Yenile
          </Button>
          <Button variant="success" onClick={handleUploadButtonClick}>
            Upload
          </Button>
        </Col>
      </Row>
      <TableWithPagination />
    </div>
  );
};

export default ViewPage;

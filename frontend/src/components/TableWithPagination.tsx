import React, { useState } from "react";
import { Table, Pagination, Form, Button } from "react-bootstrap";

const data = [
  { id: 1, name: "John Doe", age: 30 },
  { id: 2, name: "Jane Smith", age: 25 },
  { id: 3, name: "Mike Johnson", age: 40 },
  { id: 4, name: "John Doe", age: 30 },
  { id: 5, name: "Jane Smith", age: 25 },
  { id: 6, name: "Mike Johnson", age: 40 },
  { id: 7, name: "John Doe", age: 30 },
  { id: 8, name: "Jane Smith", age: 25 },
  { id: 9, name: "Mike Johnson", age: 40 },
  { id: 10, name: "John Doe", age: 30 },
  { id: 11, name: "Jane Smith", age: 25 },
  { id: 12, name: "Mike Johnson", age: 40 },
  { id: 13, name: "John Doe", age: 30 },
  { id: 14, name: "Jane Smith", age: 25 },
  { id: 15, name: "Mike Johnson", age: 40 },
  { id: 16, name: "John Doe", age: 30 },
  { id: 17, name: "Jane Smith", age: 25 },
  { id: 18, name: "Mike Johnson", age: 40 },
  { id: 19, name: "Jane Smith", age: 25 },
  { id: 20, name: "Mike Johnson", age: 40 },
  { id: 21, name: "John Doe", age: 30 },
  { id: 22, name: "Jane Smith", age: 25 },
  { id: 23, name: "Mike Johnson", age: 40 },
  { id: 24, name: "John Doe", age: 30 },
  { id: 25, name: "Jane Smith", age: 25 },
  { id: 26, name: "Mike Johnson", age: 40 },
  { id: 27, name: "John Doe", age: 30 },
  { id: 28, name: "Jane Smith", age: 25 },
  { id: 29, name: "Mike Johnson", age: 40 },
  { id: 30, name: "Jane Smith", age: 25 },
  { id: 31, name: "John Doe", age: 30 },
  { id: 32, name: "Jane Smith", age: 25 },
  { id: 33, name: "Mike Johnson", age: 40 },
  { id: 34, name: "John Doe", age: 30 },
  { id: 35, name: "Jane Smith", age: 25 },
  { id: 36, name: "Mike Johnson", age: 40 },
  { id: 37, name: "John Doe", age: 30 },
  { id: 38, name: "Jane Smith", age: 25 },
  { id: 39, name: "Mike Johnson", age: 40 },
  { id: 40, name: "Jane Smith", age: 25 },
  { id: 41, name: "John Doe", age: 30 },
  { id: 42, name: "Jane Smith", age: 25 },
  { id: 43, name: "Mike Johnson", age: 40 },
  { id: 44, name: "John Doe", age: 30 },
  { id: 45, name: "Jane Smith", age: 25 },
  { id: 46, name: "Mike Johnson", age: 40 },
  { id: 47, name: "John Doe", age: 30 },
  { id: 48, name: "Jane Smith", age: 25 },
  { id: 49, name: "Mike Johnson", age: 40 },
  { id: 50, name: "Jane Smith", age: 25 },
];

const pageSize = 19;

const SliderTableWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({ id: "", name: "", age: "" });

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: any) => setCurrentPage(page);

  const handleRowClick = (item: any) => {
    setSelectedItem(item);
    setFormData(item); // Seçili öğe form datanın içini dolduruyor
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    // Veri güncelleme işlemleri
    //console.log("Updated data:", formData);
    // Güncellenen veriyi API'ye gönderme gibi işlemler burada yapılabilir.
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <div style={{ width: "80%", height: "40vh", overflow: "auto" }}>
        <div style={{ overflowX: "auto" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.id} onClick={() => handleRowClick(item)}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <br />
      <Pagination>
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>

      {/* Veri güncelleme formu */}
      {
        <div style={{ marginTop: "20px", width: "50%" }}>
          <h4>Update or Create</h4>
          <h4>Yeni veri oluştururken id kısmını boş bırakın.</h4>
          <Form>
            <Form.Group controlId="formId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleUpdate}>
              Send
            </Button>
          </Form>
        </div>
      }
    </div>
  );
};

export default SliderTableWithPagination;

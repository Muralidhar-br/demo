
import React, { useState, useEffect } from "react";
import { Button, Dropdown, Modal,Table, Form, Container ,Row,Col} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Dashboard/CommonStyle.css";

function AccessTypeManagement() {
  const [accessTypes, setAccessTypes] = useState([]);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [currentAccessType, setCurrentAccessType] = useState({
    typeId: "",
    typeName: "",
    description: "",
    isActive: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [visibleColumns, setVisibleColumns] = useState({
    typeId: true,
    typeName: true,
    description: true,
    isActive: true,
    actions: true
  });

  useEffect(() => {
    const fetchAccessTypes = async () => {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/getAllAccessTypes`;
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("Authorization token is missing.");
        return;
      }

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAccessTypes(data);
      } catch (error) {
        console.error("Error fetching access types:", error);
      }
    };

    fetchAccessTypes();
  }, []);

  const toggleColumn = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    setCurrentAccessType(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      setAccessTypes(accessTypes.map(type =>
        type.typeId === currentAccessType.typeId ? currentAccessType : type
      ));
    } else {
      const newTypeId = `ID${accessTypes.length + 1}`;
      setAccessTypes([...accessTypes, { ...currentAccessType, typeId: newTypeId }]);
    }
    setShowAddEditModal(false);
  };

  const openModal = (type = { typeId: "", typeName: "", description: "", isActive: false }) => {
    setIsEditing(!!type.typeId);
    setCurrentAccessType(type);
    setShowAddEditModal(true);
  };

  const handleDelete = (typeId) => {
    setAccessTypes(accessTypes.filter(type => type.typeId !== typeId));
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="text-primary">Access Type</h2>
        <Button onClick={() => openModal()} className="btn btn-primary">
          <FontAwesomeIcon icon={faPlus} /> ADD
        </Button>
      </div>
        <div className="table-responsive">
          
      <Table striped bordered hover>
        <thead className="thead-light">
          <tr>
            {Object.entries(visibleColumns).map(([key, visible]) =>
              visible ? <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th> : null
            )}
          </tr>
        </thead>
        <tbody className="tbody">
          {accessTypes.slice(0, recordsPerPage).map((type, index) => (
            <tr key={index}>
              {Object.entries(visibleColumns).map(([key, visible]) =>
                visible ? (
                  <td key={key}>
                    {key === "actions" ? (
                      <div className="text-center">
                        <Button variant="light" size="sm" onClick={() => openModal(type)} className="me-2">
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button variant="light" size="sm" onClick={() => handleDelete(type.typeId)}>
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                      </div>
                    ) : (
                      type[key]
                    )}
                  </td>
                ) : null
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      
      </div>

       {/* Manage Columns & Records Per Page */}
       <Row className="mt-4">
        <Col md={6}>
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary">
              Manage Columns
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.keys(visibleColumns).map((column) => (
                <Dropdown.Item key={column} onClick={() => toggleColumn(column)}>
                  <Form.Check
                    type="checkbox"
                    label={column.charAt(0).toUpperCase() + column.slice(1).toLowerCase()}
                    checked={visibleColumns[column]}
                    readOnly
                  />
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={6} className="d-flex justify-content-end">
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary">
              Records Per Page
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {[5, 10, 20, 50].map((number) => (
                <Dropdown.Item key={number} onClick={() => handleRecordsPerPageChange(number)}>
                  {number}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
     {/* Add/Edit model */}
      <Modal show={showAddEditModal} onHide={() => setShowAddEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Access Type" : "Add Access Type"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTypeName">
              <Form.Label>Type Name</Form.Label>
              <Form.Control
                type="text"
                name="typeName"
                value={currentAccessType.typeName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={currentAccessType.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formActive">
              <Form.Check
                type="checkbox"
                label="Active?"
                name="isActive"
                checked={currentAccessType.isActive}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="primary" onClick={() => setShowAddEditModal(false)}>Close</Button>
              <Button variant="primary" type="submit">{isEditing ? "Update" : "Add"}</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default AccessTypeManagement;

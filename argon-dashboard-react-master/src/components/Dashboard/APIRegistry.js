
import React, { useState, useEffect } from "react";
import { Button, Dropdown, Modal, Table, Form ,Row,Col} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Dashboard/CommonStyle.css";

function APIRegistry() {
  const [apiEntries, setApiEntries] = useState([]);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [currentApiEntry, setCurrentApiEntry] = useState({
    id: "",
    tableName: "",
    createdAt: "",
    updatedAt: "",
    isActive: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    tableName: true,
    createdAt: true,
    updatedAt: true,
    isActive: true,
    actions: true
  });

  useEffect(() => {
    const fetchApiEntries = async () => {
      const apiUrl = `${process.env.REACT_APP_API_URL}/Api_registery_header/Api_registery_header`;
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
        setApiEntries(data);
      } catch (error) {
        console.error("Error fetching API entries:", error);
      }
    };

    fetchApiEntries();
  }, []);


  const toggleColumn = (column) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentApiEntry(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      setApiEntries(apiEntries.map(entry =>
        entry.id === currentApiEntry.id ? currentApiEntry : entry
      ));
    } else {
      const newId = `ID${apiEntries.length + 1}`;
      setApiEntries([...apiEntries, { ...currentApiEntry, id: newId }]);
    }
    setShowAddEditModal(false);
  };

  const openModal = (entry = { id: "", tableName: "", createdAt: "", updatedAt: "", isActive: false }) => {
    setIsEditing(!!entry.id);
    setCurrentApiEntry(entry);
    setShowAddEditModal(true);
  };

  const handleDelete = (id) => {
    setApiEntries(apiEntries.filter(entry => entry.id !== id));
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="text-primary">API Registry</h2>
        <Button onClick={() => openModal()} className="btn btn-primary">
          <FontAwesomeIcon icon={faPlus} /> ADD
        </Button>
      </div>
   <div className="table-responsive">
      <Table striped bordered hover>
        <thead className="thead-light">
          <tr>
            {Object.keys(visibleColumns).filter(key => visibleColumns[key]).map(key => (
              <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody className="tbody">
          {apiEntries.length > 0 ? (
            apiEntries.slice(0, recordsPerPage).map((entry, index) => (
              <tr key={index}>
                {Object.keys(visibleColumns).filter(key => visibleColumns[key]).map(key => (
                  <td key={key}>
                    {key === "actions" ? (
                      <div className="text-center">
                        <Button variant="light" size="sm" onClick={() => openModal(entry)} className="me-2">
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button variant="light" size="sm" onClick={() => handleDelete(entry.id)}>
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                      </div>
                    ) : (
                      entry[key]
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={Object.keys(visibleColumns).length} className="text-center">
                No API entries found. Please add new entries.
              </td>
            </tr>
          )}
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



      <Modal show={showAddEditModal} onHide={() => setShowAddEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit API Entry" : "Add API Entry"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTableName">
              <Form.Label>Table Name</Form.Label>
              <Form.Control
                type="text"
                name="tableName"
                value={currentApiEntry.tableName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCreatedAt">
              <Form.Label>Created At</Form.Label>
              <Form.Control
                type="text"
                name="createdAt"
                value={currentApiEntry.createdAt}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formUpdatedAt">
              <Form.Label>Updated At</Form.Label>
              <Form.Control
                type="text"
                name="updatedAt"
                value={currentApiEntry.updatedAt}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formActive">
              <Form.Check
                type="checkbox"
                label="Active?"
                name="isActive"
                checked={currentApiEntry.isActive}
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
    </div>
  );
}

export default APIRegistry;

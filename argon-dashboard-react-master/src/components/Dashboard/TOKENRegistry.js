import React, { useState, useEffect } from "react";
import { Button, Dropdown, Table, Modal, Form ,Row,Col} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Dashboard/CommonStyle.css";

function TOKENRegistry() {
  const initialTokens = JSON.parse(localStorage.getItem("tokens")) || [];
  const [tokens, setTokens] = useState(initialTokens);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [currentToken, setCurrentToken] = useState({
    tokenId: "",
    tokenName: "",
    tokenValue: "",
    isActive: true
  });
  const [isEditing, setIsEditing] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [visibleColumns, setVisibleColumns] = useState({
    tokenId: true,
    tokenName: true,
    tokenValue: true,
    isActive: true,
    actions: true
  });

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/apiregistery/getall`;
    const token = localStorage.getItem("authToken");

    const fetchTokens = async () => {
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
            setTokens(data);
            localStorage.setItem("tokens", JSON.stringify(data)); // Store tokens in local storage
        } catch (error) {
            console.error("Error fetching tokens:", error);
        }
    };

    fetchTokens();
}, []);

  const toggleColumn = (column) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setCurrentToken(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      setTokens(tokens.map(token =>
        token.tokenId === currentToken.tokenId ? currentToken : token
      ));
    } else {
      const newTokenId = `ID${tokens.length + 1}`;
      setTokens([...tokens, { ...currentToken, tokenId: newTokenId }]);
    }
    setShowAddEditModal(false);
    localStorage.setItem("tokens", JSON.stringify(tokens)); // Update local storage with new tokens
  };

  const openModal = (token = { tokenId: "", tokenName: "", tokenValue: "", isActive: false }) => {
    setIsEditing(!!token.tokenId);
    setCurrentToken(token);
    setShowAddEditModal(true);
  };

  const handleDelete = (tokenId) => {
    setTokens(tokens.filter(token => token.tokenId !== tokenId));
    localStorage.setItem("tokens", JSON.stringify(tokens.filter(token => token.tokenId !== tokenId))); // Update local storage after deletion
  };

  return (
    <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Token Registry</h2>
      <Button onClick={() => openModal()} className="btn btn-primary mb-2">
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
          {tokens.length > 0 ? tokens.slice(0, recordsPerPage).map((token, index) => (
            <tr key={index}>
              {Object.keys(visibleColumns).filter(key => visibleColumns[key]).map(key => (
                <td key={key}>
                  {key === "actions" ? (
                    <>
                      <Button variant="light" size="sm" onClick={() => openModal(token)} className="me-2">
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button variant="light" size="sm" onClick={() => handleDelete(token.tokenId)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </>
                  ) : token[key]}
                </td>
              ))}
            </tr>
          )) : (
            <tr>
              <td colSpan={Object.keys(visibleColumns).length} className="text-center">
                No tokens found. Please add new tokens.
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
          <Modal.Title>{isEditing ? "Edit Token" : "Add Token"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTokenName">
              <Form.Label>Token Name</Form.Label>
              <Form.Control
                type="text"
                name="tokenName"
                value={currentToken.tokenName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTokenValue">
              <Form.Label>Token Value</Form.Label>
              <Form.Control
                type="text"
                name="tokenValue"
                value={currentToken.tokenValue}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formActive">
              <Form.Check
                type="checkbox"
                label="Active?"
                name="isActive"
                checked={currentToken.isActive}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="primary" onClick={() => setShowAddEditModal(false)}>Close</Button>
              <Button variant="primary" type="submit">{isEditing ? "Update Token" : "Add Token"}</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default TOKENRegistry;

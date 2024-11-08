import React, { useState, useEffect } from "react";
import { Button, Dropdown, Modal, Table, Form, Container ,Row,Col} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Dashboard/CommonStyle.css";
function MenuAccessControl() {
  const [menuItems, setMenuItems] = useState([]);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [currentMenuItem, setCurrentMenuItem] = useState({
    menuId: "",
    menuName: "",
    accessLevel: "",
    isActive: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [visibleColumns, setVisibleColumns] = useState({
    menuId: true,
    menuName: true,
    accessLevel: true,
    isActive: true,
    actions: true
  });

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/getAllMenuItems`;
    const token = localStorage.getItem("authToken");

    const fetchMenuItems = async () => {
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
            setMenuItems(data);
        } catch (error) {
            console.error("Error fetching menu items:", error);
        }
    };

    fetchMenuItems();
}, []); 

  const toggleColumn = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    setCurrentMenuItem(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      setMenuItems(menuItems.map(item =>
        item.menuId === currentMenuItem.menuId ? currentMenuItem : item
      ));
    } else {
      const newMenuId = `ID${menuItems.length + 1}`;
      setMenuItems([...menuItems, { ...currentMenuItem, menuId: newMenuId }]);
    }
    setShowAddEditModal(false);
  };

  const openModal = (item = { menuId: "", menuName: "", accessLevel: "", isActive: false }) => {
    setIsEditing(!!item.menuId);
    setCurrentMenuItem(item);
    setShowAddEditModal(true);
  };

  const handleDelete = (menuId) => {
    setMenuItems(menuItems.filter(item => item.menuId !== menuId));
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-end mb-2">
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
          {menuItems.slice(0, recordsPerPage).map((item, index) => (
            <tr key={index}>
              {Object.entries(visibleColumns).map(([key, visible]) =>
                visible ? (
                  <td key={key}>
                    {key === "actions" ? (
                      <>
                        <Button variant="light" size="sm" onClick={() => openModal(item)} className="me-2">
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button variant="light" size="sm" onClick={() => handleDelete(item.menuId)}>
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                      </>
                    ) : (
                      item[key]
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

      {/* Add/Edit Model */}

      <Modal show={showAddEditModal} onHide={() => setShowAddEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Menu Access" : "Add Menu Access"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formMenuName">
              <Form.Label>Menu Name</Form.Label>
              <Form.Control
                type="text"
                name="menuName"
                value={currentMenuItem.menuName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAccessLevel">
              <Form.Label>Access Level</Form.Label>
              <Form.Control
                type="text"
                name="accessLevel"
                value={currentMenuItem.accessLevel}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formActive">
              <Form.Check
                type="checkbox"
                label="Active?"
                name="isActive"
                checked={currentMenuItem.isActive}
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

export default MenuAccessControl;

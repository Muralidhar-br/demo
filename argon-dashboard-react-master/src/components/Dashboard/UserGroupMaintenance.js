
import React, { useState, useEffect } from "react";
import { Button, Dropdown, Table, Modal, Form ,Row,Col} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Dashboard/CommonStyle.css";

function UserGroupMaintenance() {
  const [userGroups, setUserGroups] = useState([]);
  const [showAddItemPopup, setShowAddItemPopup] = useState(false);
  
  
  const [newGroupData, setNewGroupData] = useState({
    usrGrp: "",
    groupName: "",
    groupDesc: "",
    status: "",
    groupLevel: "",
  });
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [visibleColumns, setVisibleColumns] = useState({
    usrGrp: true,
    groupName: true,
    groupDesc: true,
    status: true,
    groupLevel: true,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/getAllUsrGrp`;
    const token = localStorage.getItem("authToken");

    const fetchUserGroups = async () => {
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
            setUserGroups(data);
        } catch (error) {
            console.error("Fetching error:", error);
        }
    };

    fetchUserGroups();
}, []); 

  const toggleColumn = (column) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  const handleAddItem = () => {
    setIsEditing(false);
    setNewGroupData({
      usrGrp: "",
      groupName: "",
      groupDesc: "",
      status: "",
      groupLevel: "",
    });
    setShowAddItemPopup(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewGroupData({ ...newGroupData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      setUserGroups(userGroups.map(group =>
        group.usrGrp === newGroupData.usrGrp ? newGroupData : group
      ));
    } else {
      const newId = userGroups.reduce((acc, curr) => Math.max(acc, Number(curr.usrGrp)), 0) + 1;
      setUserGroups([...userGroups, { ...newGroupData, usrGrp: `${newId}` }]);
    }
    setShowAddItemPopup(false);
  };

  const handleEdit = (usrGrp) => {
    const groupToEdit = userGroups.find(group => group.usrGrp === usrGrp);
    setIsEditing(true);
    setNewGroupData(groupToEdit);
    setShowAddItemPopup(true);
  };

  const handleDelete = (usrGrp) => {
    setUserGroups(userGroups.filter(group => group.usrGrp !== usrGrp));
  };

  const handleRecordsPerPageChange = (number) => {
    setRecordsPerPage(number);
  };

  return (
    <div className="container mt-5">
    
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">User Group Maintenance</h2>
        <button onClick={handleAddItem} className="btn btn-primary">
          <FontAwesomeIcon icon={faPlus} /> ADD
        </button>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover responsive>
        <thead className="thead-light">
          <tr>
            {Object.keys(visibleColumns).map(key => (
              <th key={key} style={{ display: visibleColumns[key] ? "" : "none" }}>
                {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {userGroups.map((group, index) => (
            <tr key={index}>
              {Object.keys(visibleColumns).map(key => visibleColumns[key] && (
                <td key={key}>{group[key]}</td>
              ))}
              <td>
                <button onClick={() => handleEdit(group.usrGrp)} className="btn btn-sm btn-light me-2">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDelete(group.usrGrp)} className="btn btn-sm btn-light">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
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
      <Modal show={showAddItemPopup} onHide={() => setShowAddItemPopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Group" : "Add New Group"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="groupName">
              <Form.Label>Group Name</Form.Label>
              <Form.Control type="text" name="groupName" value={newGroupData.groupName} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="groupDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="groupDesc" value={newGroupData.groupDesc} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" name="status" value={newGroupData.status} onChange={handleInputChange}>
                <option value="">Select Status</option>
                <option value="E">Enabled</option>
                <option value="D">Disabled</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="groupLevel">
              <Form.Label>Group Level</Form.Label>
              <Form.Control type="number" name="groupLevel" value={newGroupData.groupLevel} onChange={handleInputChange} />
            </Form.Group>
            <Modal.Footer>
              <Button variant="primary" onClick={() => setShowAddItemPopup(false)}>Close</Button>
              <Button type="submit" variant="primary">{isEditing ? "Update Group" : "Add Group"}</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserGroupMaintenance;

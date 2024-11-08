
// import React, { useState, useEffect } from "react";
// import { Button, Dropdown, Table, Modal, Form ,Row,Col} from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrashAlt, faPlus ,faBars} from "@fortawesome/free-solid-svg-icons";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../Dashboard/UserMaintainanceView.css";

// function UserMaintenanceView() {
//   const [appUsers, setAppUsers] = useState([]);
//   const [isSubMenu, setIsSubMenu] = useState(false);
//   const [showAddItemPopup, setShowAddItemPopup] = useState(false);
//   const [newItemData, setNewItemData] = useState({
//     userId: "",
//     username: "",
//     fullName: "",
//     email: "",
//     mobileNumber: "",
//     isActive: true,
//     userGroupId: "",
//   });
//   const [recordsPerPage, setRecordsPerPage] = useState(10);
//   const [visibleColumns, setVisibleColumns] = useState({
//     userId: true,
//     username: true,
//     fullName: true,
//     email: true,
//     mobileNumber: true,
//     isActive: true,
//     userGroupId: true,
//     actions: true,
    
//   });
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     const apiUrl = `${process.env.REACT_APP_API_URL}/api/getAllAppUser`;
//     const token = localStorage.getItem("authToken");

//     const fetchAppUsers = async () => {
//         try {
//             const response = await fetch(apiUrl, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             setAppUsers(data);
//         } catch (error) {
//             console.error("Fetching error:", error );
//         }
//     };

//     fetchAppUsers();
// }, []);
  
//   const toggleColumn = (column) => {
//     setVisibleColumns(prevColumns => ({
//       ...prevColumns,
//       [column]: !prevColumns[column]
//     }));
//   };
//   const handleAddItem = () => {
//     setIsEditing(false);
//     setNewItemData({
//       userId: "",
//       username: "",
//       fullName: "",
//       email: "",
//       mobileNumber: "",
//       isActive: true,
//       userGroupId: "",
//     });
//     setShowAddItemPopup(true);
//   };

//   const handleInputChange = (event) => {
//     const { name, value, type, checked } = event.target;
//     setNewItemData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (isEditing) {
//       setAppUsers(
//         appUsers.map((user) =>
//           user.userId === newItemData.userId ? newItemData : user
//         )
//       );
//     } else {
//       const newUserId = `ID${appUsers.length + 1}`;
//       setAppUsers([...appUsers, { ...newItemData, userId: newUserId }]);
//     }
//     setShowAddItemPopup(false);
//   };

//   const handleEdit = (userId) => {
//     const userToEdit = appUsers.find((user) => user.userId === userId);
//     setNewItemData(userToEdit);
//     setIsEditing(true);
//     setShowAddItemPopup(true);
//   };

//   const handleDelete = (userId) => {
//     setAppUsers(appUsers.filter((user) => user.userId !== userId));
//   };

//   return(
//     <div className="container mt-5">
       
//       <div className="d-flex justify-content-between align-items-center mb-4">
//       <h2 className="text-primary">User Maintenance</h2>
//         <div>
//           <Button onClick={handleAddItem} className="btn btn-primary">
//             <FontAwesomeIcon icon={faPlus} /> ADD
//           </Button>
//           {isSubMenu && (
//             <Button onClick={handleBackToMainMenu} className="btn btn-secondary">
//               Back to Main Menu
//             </Button>
//           )}
//         </div>
        
//       </div>

//       <div className="table-responsive">
//         <Table striped bordered hover responsive className="shadow-sm">
//           <thead className="thead-light">
//             <tr>
//               {Object.keys(visibleColumns).filter((key) => visibleColumns[key]).map((key) => (
//                 <th key={key}>
//                   {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
//                 </th>
              
//               ))}
//             </tr>
//           </thead>
//           <tbody className="tbody">
//             {appUsers.length > 0 ? (
//               appUsers.slice(0, recordsPerPage).map((user, index) => (
//                 <tr key={index}>
//                   {Object.keys(visibleColumns).filter((key) => visibleColumns[key]).map((key) => (
//                     <td key={key}>
//                       {key === "actions" ? (
//                         <div className="btn-group">
//                           <Button variant="light" size="sm" onClick={() => handleEdit(user.userId)}>
//                             <FontAwesomeIcon icon={faEdit} />
//                           </Button>
//                           <Button variant="light" size="sm" onClick={() => handleDelete(user.userId)}>
//                             <FontAwesomeIcon icon={faTrashAlt} />
//                           </Button>
//                         </div>
//                       ) : (
//                         user[key]
//                       )}
//                     </td>
//                   ))}

//                   {!isSubMenu && (
//                     <td className="text-center">
//                       <Button
//                         onClick={() => handleSubMenuClick(menuItem.menuItemId)}
//                         className="btn btn-sm btn-primary"
//                       >
//                         <FontAwesomeIcon icon={faBars} />
//                       </Button>
//                     </td>
//                   )}
//                 </tr>
//               ))
//             ) : (
              
//               <tr>
//                 <td colSpan={Object.keys(visibleColumns).length} className="text-center">
//                   No users found. Please add new users.
//                 </td>
//               </tr>
//               )
//             }
//           </tbody>
//         </Table>
//       </div>

//       {/* Manage Columns & Records Per Page */}
//       <Row className="mt-4">
//         <Col md={6}>
//           <Dropdown>
//             <Dropdown.Toggle variant="outline-primary">
//               Manage Columns
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               {Object.keys(visibleColumns).map((column) => (
//                 <Dropdown.Item key={column} onClick={() => toggleColumn(column)}>
//                   <Form.Check
//                     type="checkbox"
//                     label={column.charAt(0).toUpperCase() + column.slice(1).toLowerCase()}
//                     checked={visibleColumns[column]}
//                     readOnly
//                   />
//                 </Dropdown.Item>
//               ))}
//             </Dropdown.Menu>
//           </Dropdown>
//         </Col>
//         <Col md={6} className="d-flex justify-content-end">
//           <Dropdown>
//             <Dropdown.Toggle variant="outline-primary">
//               Records Per Page
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               {[5, 10, 20, 50].map((number) => (
//                 <Dropdown.Item key={number} onClick={() => handleRecordsPerPageChange(number)}>
//                   {number}
//                 </Dropdown.Item>
//               ))}
//             </Dropdown.Menu>
//           </Dropdown>
//         </Col>
//       </Row>
//       <Modal show={showAddItemPopup} onHide={() => setShowAddItemPopup(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>{isEditing ? "Edit User" : "Add New User"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="formUsername">
//               <Form.Label>Username</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="username"
//                 value={newItemData.username}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formFullName">
//               <Form.Label>Full Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="fullName"
//                 value={newItemData.fullName}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={newItemData.email}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formMobileNumber">
//               <Form.Label>Mobile Number</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="mobileNumber"
//                 value={newItemData.mobileNumber}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formActive">
//               <Form.Check
//                 type="checkbox"
//                 label="Active?"
//                 name="isActive"
//                 checked={newItemData.isActive}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formUserGroupId">
//               <Form.Label>User Group ID</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="userGroupId"
//                 value={newItemData.userGroupId}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Modal.Footer>
//               <Button variant="primary" onClick={() => setShowAddItemPopup(false)}>
//                 Close
//               </Button>
//               <Button variant="primary" type="submit">
//                 {isEditing ? "Update User" : "Add User"}
//               </Button>
//             </Modal.Footer>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default UserMaintenanceView;



import React, { useState, useEffect } from "react";
import { Button, Dropdown, Table, Modal, Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Dashboard/UserMaintainanceView.css";

function UserMaintenanceView() {
  const [appUsers, setAppUsers] = useState([]);

  const [showAddItemPopup, setShowAddItemPopup] = useState(false);
  const [newItemData, setNewItemData] = useState({
    userId: "",
    username: "",
    fullName: "",
    email: "",
    mobileNumber: "",
    isActive: true,
    userGroupId: "",
  });
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [visibleColumns, setVisibleColumns] = useState({
    userId: true,
    username: true,
    fullName: true,
    email: true,
    mobileNumber: true,
    isActive: true,
    userGroupId: true,
    actions: true,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/getAllAppUser`;
    const token = localStorage.getItem("authToken");

    const fetchAppUsers = async () => {
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
        setAppUsers(data);
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };

    fetchAppUsers();
  }, []);

  const toggleColumn = (column) => {
    setVisibleColumns((prevColumns) => ({
      ...prevColumns,
      [column]: !prevColumns[column],
    }));
  };

  const handleAddItem = () => {
    setIsEditing(false);
    setNewItemData({
      userId: "",
      username: "",
      fullName: "",
      email: "",
      mobileNumber: "",
      isActive: true,
      userGroupId: "",
    });
    setShowAddItemPopup(true);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNewItemData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      setAppUsers(
        appUsers.map((user) =>
          user.userId === newItemData.userId ? newItemData : user
        )
      );
    } else {
      const newUserId = `ID${appUsers.length + 1}`;
      setAppUsers([...appUsers, { ...newItemData, userId: newUserId }]);
    }
    setShowAddItemPopup(false);
  };

  const handleEdit = (userId) => {
    const userToEdit = appUsers.find((user) => user.userId === userId);
    setNewItemData(userToEdit);
    setIsEditing(true);
    setShowAddItemPopup(true);
  };

  const handleDelete = (userId) => {
    setAppUsers(appUsers.filter((user) => user.userId !== userId));
  };

  const handleRecordsPerPageChange = (number) => {
    setRecordsPerPage(number);
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">User Maintenance</h2>
        <div>
          <Button onClick={handleAddItem} className="btn btn-primary">
            <FontAwesomeIcon icon={faPlus} /> ADD
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="thead-light">
            <tr>
              {Object.keys(visibleColumns).map(
                (key) =>
                  visibleColumns[key] && (
                    <th key={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                    </th>
                  )
              )}
            </tr>
          </thead>
          <tbody className="tbody">
            {appUsers.slice(0, recordsPerPage).map((user, index) => (
              <tr key={index}>
                {Object.keys(visibleColumns).map(
                  (key) =>
                    visibleColumns[key] && (
                      <td className="text-center" key={key}>
                        {key === "actions" ? (
                          <div className="btn-group">
                            <Button
                              variant="light"
                              size="sm"
                              onClick={() => handleEdit(user.userId)}
                              className="me-2"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Button
                              variant="light"
                              size="sm"
                              onClick={() => handleDelete(user.userId)}
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </Button>
                          </div>
                        ) : (
                          user[key]
                        )}
                      </td>
                    )
                )}
              </tr>
            ))}
            {appUsers.length === 0 && (
              <tr>
                <td
                  colSpan={
                    Object.keys(visibleColumns).filter(
                      (key) => visibleColumns[key]
                    ).length
                  }
                  className="text-center"
                >
                  No users found. Please add new users.
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
                <Dropdown.Item
                  key={column}
                  onClick={() => toggleColumn(column)}
                >
                  <Form.Check
                    type="checkbox"
                    label={
                      column.charAt(0).toUpperCase() + column.slice(1).toLowerCase()
                    }
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

      {/* Add/Edit User Modal */}
      <Modal show={showAddItemPopup} onHide={() => setShowAddItemPopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit User" : "Add New User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={newItemData.username}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={newItemData.fullName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newItemData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMobileNumber">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="mobileNumber"
                value={newItemData.mobileNumber}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUserGroup">
              <Form.Label>User Group</Form.Label>
              <Form.Control
                type="text"
                name="userGroupId"
                value={newItemData.userGroupId}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicIsActive">
              <Form.Check
                type="checkbox"
                name="isActive"
                label="Active"
                checked={newItemData.isActive}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {isEditing ? "Save Changes" : "Add User"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserMaintenanceView;



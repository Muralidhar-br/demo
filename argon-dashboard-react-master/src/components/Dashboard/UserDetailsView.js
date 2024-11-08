// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
// import { Modal, Button, Form ,Row,Col,Dropdown} from "react-bootstrap";
// import * as XLSX from "xlsx";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../Dashboard/CSS/CSS/CommonStyle.css";

// function UserDetailsView() {
//   const [userDetails, setUserDetails] = useState([]);
//   const [viewMode, setViewMode] = useState("cards");
//   const [showModal, setShowModal] = useState(false);
//   const [editData, setEditData] = useState({});
//   const [reportBuilderView, setReportBuilderView] = useState(null);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [recordsPerPage, setRecordsPerPage] = useState(10);
//   const [newData, setNewData] = useState({
//     reportName: "",
//     description: "",
//     active: false,
//   });
//   const [visibleColumns, setVisibleColumns] = useState({
//     reportName: true,
//     description: true,
//     action: true,
//     status: true,
//   });

//   useEffect(() => {
//     const apiUrl = `${process.env.REACT_APP_API_URL}/Rpt_builder2/Rpt_builder2`;
//     const token = localStorage.getItem("authToken");

//     const fetchUserDetails = async () => {
//       try {
//         const response = await fetch(apiUrl, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setUserDetails(data);
//       } catch (error) {
//         console.error("Fetching user details error:", error);
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   const handleDelete = (index) => {
//     const filteredDetails = userDetails.filter((_, i) => i !== index);
//     setUserDetails(filteredDetails);
//   };

//   const handleEdit = (detail) => {
//     setEditData(detail);
//     setShowModal(true);
//   };
//   const toggleColumn = (column) => {
//     setVisibleColumns((prev) => ({
//       ...prev,
//       [column]: !prev[column],
//     }));
//   };

//   const handleRecordsPerPageChange = (number) => {
//     setRecordsPerPage(number);
//   };

//   const switchToReportBuilderURL = () => {
//     setReportBuilderView("URL");
//     setViewMode("table");
//   };

//   const switchToReportBuilderSQL = () => {
//     setReportBuilderView("SQL");
//     setViewMode("table");
//   };

//   const handleBack = () => {
//     setReportBuilderView(null);
//     setViewMode("cards");
//   };

//   const handleClose = () => {
//     setShowModal(false);
//   };

//   const handleAddClose = () => {
//     setShowAddModal(false);
//   };

//   const handleSubmit = () => {
//     const updatedDetails = userDetails.map((detail) =>
//       detail.reportName === editData.reportName ? editData : detail
//     );
//     setUserDetails(updatedDetails);
//     setShowModal(false);
//   };

//   const handleAddSubmit = () => {
//     setUserDetails([...userDetails, newData]);
//     setNewData({ reportName: "", description: "", active: false });
//     setShowAddModal(false);
//   };

//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(userDetails);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "UserDetails");
//     XLSX.writeFile(workbook, "UserDetails.xlsx");
//   };

//   const renderCards = () => (
//     <div className="row mt-4">
//       {userDetails.map((detail, index) => (
//         <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
//           <div className="card shadow-lg border-0">
//             <div className="card-body" style={{ textDecoration: "none" }}>
//               <h5 className="card-title" style={{ textDecoration: "none" }}>
//                 {detail.reportName}
//               </h5>
//               <p className="card-text" style={{ textDecoration: "none" }}>
//                 {detail.description || "No description available"}
//               </p>
//               <p className="card-text" style={{ textDecoration: "none" }}>
//                 Status: {detail.active ? "Active" : "Inactive"}
//               </p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   const renderTable = () => (
//     <div className="table-responsive">
//       <table className="table table-striped table-bordered">
//         <thead className="thead-light">
//           <tr>
//             <th>Report Name</th>
//             <th>Description</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody className="tbody">
//           {userDetails.map((detail, index) => (
//             <tr key={index}>
//               <td>{detail.reportName}</td>
//               <td>{detail.description || "No description available"}</td>
//               <td>{detail.active ? "Active" : "Inactive"}</td>
//               <td className="text-center">
//                 <Button
//                   variant="light"
//                   size="sm"
//                   onClick={() => handleEdit(detail)}
//                   className="mr-2 me-2 "
//                 >
//                   <FontAwesomeIcon icon={faEdit} color="black"/>
//                 </Button>
//                 <Button
//                   variant="light"
//                   size="sm"
//                   className="mr-2"
//                   onClick={() => handleDelete(index)}
//                 >
//                   <FontAwesomeIcon icon={faTrashAlt} color="black" />
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   return (
//     <div className="user-details-wrapper">
//        <div className="container mt-4 ">
//       <div className="d-flex justify-content-end">
//         {reportBuilderView === null ? (
//           <>
//             <Button
//               variant="primary"
//               size="lg"
//               onClick={switchToReportBuilderURL}
//               className="pr-2"
//             >
//               Report Builder URL
//             </Button>
//             <Button
//               variant="primary"
//               size="lg"
//               style={{ marginLeft: "20px" }}
//               onClick={switchToReportBuilderSQL}
//             >
//               Report Builder SQL
//             </Button>
//           </>
//         ) : (
//           <>
//             <Button
//               variant="primary"
//               onClick={handleBack}
//               style={{ margin: "20px" }}
//             >
//               Back to Report Cards
//             </Button>
//             {viewMode === "table" && (
//               <>
//                 <Button
//                   variant="primary"
//                   onClick={exportToExcel}
//                   style={{ margin: "20px" }}
//                 >
//                   Export to Excel
//                 </Button>
//                 <Button
//                   variant="primary"
//                   onClick={() => setShowAddModal(true)}
//                   style={{ margin: "20px" }}
//                 >
//                   Add
//                 </Button>
//               </>
//             )}
//           </>
//         )}
//       </div>
//       {viewMode === "cards" ? renderCards() : renderTable()}

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

//       {/* Edit form model */}
//       <Modal show={showModal} onHide={handleClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title className="text-primary">Edit User Detail</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formGroupName">
//               <Form.Label>Report Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={editData.reportName || ""}
//                 onChange={(e) =>
//                   setEditData({ ...editData, reportName: e.target.value })
//                 }
//               />
//             </Form.Group>
//             <Form.Group controlId="formGroupDescription">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={editData.description || ""}
//                 onChange={(e) =>
//                   setEditData({ ...editData, description: e.target.value })
//                 }
//               />
//             </Form.Group>
//             <Form.Group controlId="formGroupActive">
//               <Form.Check
//                 type="checkbox"
//                 label="Active"
//                 checked={editData.active}
//                 onChange={(e) =>
//                   setEditData({ ...editData, active: e.target.checked })
//                 }
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" onClick={handleSubmit}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       {/* Add form model */}
//       <Modal show={showAddModal} onHide={handleAddClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title className="text-primary">
//             Add New User Detail
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formGroupAddName" className="mb-3">
//               <Form.Label className="fw-bold">Report Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter report name"
//                 value={newData.reportName}
//                 onChange={(e) =>
//                   setNewData({ ...newData, reportName: e.target.value })
//                 }
//                 className="shadow-sm"
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="formGroupAddDescription" className="mb-3">
//               <Form.Label className="fw-bold">Description</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter description"
//                 value={newData.description}
//                 onChange={(e) =>
//                   setNewData({ ...newData, description: e.target.value })
//                 }
//                 className="shadow-sm"
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="formGroupAddActive" className="mb-3">
//               <Form.Check
//                 type="checkbox"
//                 label="Active"
//                 checked={newData.active}
//                 onChange={(e) =>
//                   setNewData({ ...newData, active: e.target.checked })
//                 }
//                 className="shadow-sm"
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer className="justify-content-between">
//           <Button variant="primary" onClick={handleAddClose} className="px-4">
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleAddSubmit} className="px-4">
//             Add User Detail
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//     </div>

//   );
// }

// export default UserDetailsView;

// import React, { useState ,useEffect} from "react";
// import {
//   Table,
//   Modal,
//   Button,
//   Form,
//   Pagination,
//   Tooltip,
//   OverlayTrigger,
//   InputGroup,
//   FormControl,

// } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faEdit,
//   faTrashAlt,
//   faSearch,
//   faFileExport,
//   faCopy,
//   faPrint,
//   faPlus,
// } from "@fortawesome/free-solid-svg-icons";
// import * as XLSX from "xlsx";

// function UserManagement() {
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "",
//   });
//   const [searchQuery, setSearchQuery] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const [userDetails, setUserDetails] = useState([]);
//   const [viewMode, setViewMode] = useState("cards");
//   const [showModal, setShowModal] = useState(false);
//   const [editData, setEditData] = useState({});
//   const [reportBuilderView, setReportBuilderView] = useState(null);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [recordsPerPage, setRecordsPerPage] = useState(10);
//   const [newData, setNewData] = useState({
//     reportName: "",
//     description: "",
//     active: false,
//   });
//   const [visibleColumns, setVisibleColumns] = useState({
//     reportName: true,
//     description: true,
//     action: true,
//     status: true,
//   });

//   const totalPages = Math.ceil(userDetails.length / recordsPerPage);
//   useEffect(() => {
//     const apiUrl = `${process.env.REACT_APP_API_URL}/Rpt_builder2/Rpt_builder2`;
//     const token = localStorage.getItem("authToken");

//     const fetchUserDetails = async () => {
//       try {
//         const response = await fetch(apiUrl, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setUserDetails(data);
//       } catch (error) {
//         console.error("Fetching user details error:", error);
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   const handleDelete = (index) => {
//     const filteredDetails = userDetails.filter((_, i) => i !== index);
//     setUserDetails(filteredDetails);
//   };

//   const handleEdit = (detail) => {
//     setEditData(detail);
//     setShowModal(true);
//   };
//   const toggleColumn = (column) => {
//     setVisibleColumns((prev) => ({
//       ...prev,
//       [column]: !prev[column],
//     }));
//   };

//   const handleRecordsPerPageChange = (number) => {
//     setRecordsPerPage(number);
//   };

//   const switchToReportBuilderURL = () => {
//     setReportBuilderView("URL");
//     setViewMode("table");
//   };

//   const switchToReportBuilderSQL = () => {
//     setReportBuilderView("SQL");
//     setViewMode("table");
//   };

//   const handleBack = () => {
//     setReportBuilderView(null);
//     setViewMode("cards");
//   };

//   const handleClose = () => {
//     setShowModal(false);
//   };

//   const handleAddClose = () => {
//     setShowAddModal(false);
//   };

//   const handleSubmit = () => {
//     const updatedDetails = userDetails.map((detail) =>
//       detail.reportName === editData.reportName ? editData : detail
//     );
//     setUserDetails(updatedDetails);
//     setShowModal(false);
//   };

//   const handleAddSubmit = () => {
//     setUserDetails([...userDetails, newData]);
//     setNewData({ reportName: "", description: "", active: false });
//     setShowAddModal(false);
//   };

//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(userDetails);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "UserDetails");
//     XLSX.writeFile(workbook, "UserDetails.xlsx");
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//     const renderCards = () => (
//     <div className="row mt-4">
//       {userDetails.map((detail, index) => (
//         <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
//           <div className="card shadow-lg border-0">
//             <div className="card-body" style={{ textDecoration: "none" }}>
//               <h5 className="card-title" style={{ textDecoration: "none" }}>
//                 {detail.reportName}
//               </h5>
//               <p className="card-text" style={{ textDecoration: "none" }}>
//                 {detail.description || "No description available"}
//               </p>
//               <p className="card-text" style={{ textDecoration: "none" }}>
//                 Status: {detail.active ? "Active" : "Inactive"}
//               </p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//     const renderTable = () => (
//     <div className="table-responsive">
//       <Table bordered hover>
//           <thead>
//             <tr>
//               <th>Report Name</th>
//               <th>Description</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userDetails
//               .slice(
//                 (currentPage - 1) * recordsPerPage,
//                 currentPage * recordsPerPage
//               )
//               .map((detail, index) => (
//                 <tr key={index}>
//                   <td>{detail.reportName}</td>
//                   <td>{detail.description || "No description available"}</td>
//                   <td>
//                     <span
//                       className={`badge ${
//                         detail.active ? "badge-success" : "badge-danger"
//                       }`}
//                     >
//                       {detail.active ? "Active" : "Inactive"}
//                     </span>
//                   </td>
//                   <td>
//                     <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
//                       <Button
//                         variant="success"
//                         size="sm"
//                         onClick={() => handleEdit(detail)}
//                         className="mr-2"
//                       >
//                         <FontAwesomeIcon icon={faEdit} />
//                       </Button>
//                     </OverlayTrigger>
//                     <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => handleDelete(index)}
//                       >
//                         <FontAwesomeIcon icon={faTrashAlt} />
//                       </Button>
//                     </OverlayTrigger>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </Table>
//     </div>
//   );

//   return (
//     <div className="user-details-wrapper" style={{ paddingTop: "15rem" }}>
//       <div className="container py-3">
//         {/* Snackbar */}
//         {snackbar.open && (
//           <div className={`alert alert-${snackbar.severity}`} role="alert">
//             {snackbar.message}
//             <button
//               type="button"
//               className="close"
//               onClick={() => setSnackbar({ ...snackbar, open: false })}
//             >
//               <span>&times;</span>
//             </button>
//           </div>
//         )}

//         {/* Top search bar and icons */}
//         <div className="d-flex justify-content-between align-items-center mb-2">
//           <div className="d-flex align-items-center">
//             <InputGroup style={{ width: "300px" }} className="mr-2">
//               <InputGroup.Prepend>
//                 <OverlayTrigger overlay={<Tooltip>Search</Tooltip>}>
//                   <InputGroup.Text>
//                     <FontAwesomeIcon icon={faSearch} />
//                   </InputGroup.Text>
//                 </OverlayTrigger>
//               </InputGroup.Prepend>
//               <FormControl
//                 placeholder="Search User Report"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </InputGroup>
//           </div>

//           <div className="d-flex">
//             <OverlayTrigger overlay={<Tooltip>Add User</Tooltip>}>
//               <Button
//                 variant="light"
//                 onClick={() => setShowAddModal(true)}
//                 className="mr-2"
//               >
//                 <FontAwesomeIcon icon={faPlus} />
//               </Button>
//             </OverlayTrigger>

//             <OverlayTrigger overlay={<Tooltip>Export to Excel</Tooltip>}>
//               <Button variant="light" className="mr-2">
//                 <FontAwesomeIcon icon={faFileExport} />
//               </Button>
//             </OverlayTrigger>

//             <OverlayTrigger overlay={<Tooltip>Copy</Tooltip>}>
//               <Button variant="light" className="mr-2">
//                 <FontAwesomeIcon icon={faCopy} />
//               </Button>
//             </OverlayTrigger>

//             <OverlayTrigger overlay={<Tooltip>Print</Tooltip>}>
//               <Button variant="light" className="mr-2">
//                 <FontAwesomeIcon icon={faPrint} />
//               </Button>
//             </OverlayTrigger>
//           </div>
//         </div>

//         {/* User Table */}
//         {viewMode === "cards" ? renderCards() : renderTable()}

//         {/* Pagination */}
//         <div className="d-flex justify-content-between align-items-center">
//           <Form.Group
//             controlId="recordsPerPage"
//             className="d-flex align-items-center"
//           >
//             <Form.Label className="mr-2">Records Per Page:</Form.Label>
//             <Form.Control
//               as="select"
//               value={recordsPerPage}
//               onChange={(e) => setRecordsPerPage(e.target.value)}
//             >
//               {[5, 10, 15, 20].map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>

//           <Pagination>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <Pagination.Item
//                 key={page}
//                 active={page === currentPage}
//                 onClick={() => handlePageChange(page)}
//               >
//                 {page}
//               </Pagination.Item>
//             ))}
//           </Pagination>
//         </div>

//         {/* Edit Modal */}
//         <Modal show={showModal} onHide={() => setShowModal(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit User Detail</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group>
//                 <Form.Label>Report Name</Form.Label>
//                 <Form.Control type="text" placeholder="Enter Report Name" />
//               </Form.Group>
//               <Form.Group>
//                 <Form.Label>Description</Form.Label>
//                 <Form.Control type="text" placeholder="Enter Description" />
//               </Form.Group>
//               <Form.Group controlId="activeCheckbox">
//                 <Form.Check type="checkbox" label="Active" />
//               </Form.Group>
//               <Button variant="secondary" onClick={() => setShowModal(false)}>
//                 Save Changes
//               </Button>
//             </Form>
//           </Modal.Body>
//         </Modal>

//         {/* Add Modal */}
//         <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>Add New User Detail</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group>
//                 <Form.Label>Report Name</Form.Label>
//                 <Form.Control type="text" placeholder="Enter Report Name" />
//               </Form.Group>
//               <Form.Group>
//                 <Form.Label>Description</Form.Label>
//                 <Form.Control type="text" placeholder="Enter Description" />
//               </Form.Group>
//               <Form.Group controlId="activeCheckbox">
//                 <Form.Check type="checkbox" label="Active" />
//               </Form.Group>
//               <Button
//                 variant="secondary"
//                 onClick={() => setShowAddModal(false)}
//               >
//                 Add User Detail
//               </Button>
//             </Form>
//           </Modal.Body>
//         </Modal>
//       </div>
//     </div>
//   );
// }

// export default UserManagement;

// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
// import {
//   Modal,
//   Button,
//   Form,
//   Row,
//   Col,
//   Dropdown,
//   InputGroup,
//   FormControl,
// } from "react-bootstrap";
// import * as XLSX from "xlsx";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../Dashboard/CSS/CSS/CommonStyle.css";

// import { FaSearch } from "react-icons/fa";

// function UserDetailsView() {
//   const [userDetails, setUserDetails] = useState([]);
//   const [viewMode, setViewMode] = useState("cards");
//   const [showModal, setShowModal] = useState(false);
//   const [editData, setEditData] = useState({});
//   const [reportBuilderView, setReportBuilderView] = useState(null);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [recordsPerPage, setRecordsPerPage] = useState(10);
//   const [newData, setNewData] = useState({
//     reportName: "",
//     description: "",
//     active: false,
//   });
//   const [visibleColumns, setVisibleColumns] = useState({
//     reportName: true,
//     description: true,
//     action: true,
//     status: true,
//   });

//   useEffect(() => {
//     const apiUrl = `${process.env.REACT_APP_API_URL}/Rpt_builder2/Rpt_builder2`;
//     const token = localStorage.getItem("authToken");

//     const fetchUserDetails = async () => {
//       try {
//         const response = await fetch(apiUrl, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setUserDetails(data);
//       } catch (error) {
//         console.error("Fetching user details error:", error);
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   const filteredData = userDetails.filter((item) =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

//   const handleDelete = (index) => {
//     const filteredDetails = userDetails.filter((_, i) => i !== index);
//     setUserDetails(filteredDetails);
//   };

//   const handleEdit = (detail) => {
//     setEditData(detail);
//     setShowModal(true);
//   };
//   const toggleColumn = (column) => {
//     setVisibleColumns((prev) => ({
//       ...prev,
//       [column]: !prev[column],
//     }));
//   };

//   const handleRecordsPerPageChange = (number) => {
//     setRecordsPerPage(number);
//   };

//   const switchToReportBuilderURL = () => {
//     setReportBuilderView("URL");
//     setViewMode("table");
//   };

//   const switchToReportBuilderSQL = () => {
//     setReportBuilderView("SQL");
//     setViewMode("table");
//   };

//   const handleBack = () => {
//     setReportBuilderView(null);
//     setViewMode("cards");
//   };

//   const handleClose = () => {
//     setShowModal(false);
//   };

//   const handleAddClose = () => {
//     setShowAddModal(false);
//   };

//   const handleSubmit = () => {
//     const updatedDetails = userDetails.map((detail) =>
//       detail.reportName === editData.reportName ? editData : detail
//     );
//     setUserDetails(updatedDetails);
//     setShowModal(false);
//   };

//   const handleAddSubmit = () => {
//     setUserDetails([...userDetails, newData]);
//     setNewData({ reportName: "", description: "", active: false });
//     setShowAddModal(false);
//   };

//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(userDetails);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "UserDetails");
//     XLSX.writeFile(workbook, "UserDetails.xlsx");
//   };

//   const renderCards = () => (
//     <div className="row mt-4">
//       {userDetails.map((detail, index) => (
//         <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
//           <div className="card shadow-lg border-0">
//             <div className="card-body" style={{ textDecoration: "none" }}>
//               <h5 className="card-title" style={{ textDecoration: "none" }}>
//                 {detail.reportName}
//               </h5>
//               <p className="card-text" style={{ textDecoration: "none" }}>
//                 {detail.description || "No description available"}
//               </p>
//               <p className="card-text" style={{ textDecoration: "none" }}>
//                 Status: {detail.active ? "Active" : "Inactive"}
//               </p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   const renderTable = () => (
//     <div className="table-responsive">
//       <table className="table table-striped table-bordered">
//         <thead className="thead-light">
//           <tr>
//             <th>Report Name</th>
//             <th>Description</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody className="tbody">
//           {userDetails.map((detail, index) => (
//             <tr key={index}>
//               <td>{detail.reportName}</td>
//               <td>{detail.description || "No description available"}</td>
//               <td>{detail.active ? "Active" : "Inactive"}</td>
//               <td className="text-center">
//                 <Button
//                   variant="light"
//                   size="sm"
//                   onClick={() => handleEdit(detail)}
//                   className="mr-2 me-2 "
//                 >
//                   <FontAwesomeIcon icon={faEdit} color="black" />
//                 </Button>
//                 <Button
//                   variant="light"
//                   size="sm"
//                   className="mr-2"
//                   onClick={() => handleDelete(index)}
//                 >
//                   <FontAwesomeIcon icon={faTrashAlt} color="black" />
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   return (
//     <div className="user-details-wrapper">
//       <div className="container mt-4 ">
//         <div className="d-flex justify-content-end">
//           {reportBuilderView === null ? (
//             <>
//

//               <Button
//                 variant="primary"
//                 size="lg"
//                 onClick={switchToReportBuilderURL}
//                 className="pr-2"
//               >
//                 Report Builder URL
//               </Button>
//               <Button
//                 variant="primary"
//                 size="lg"
//                 style={{ marginLeft: "20px" }}
//                 onClick={switchToReportBuilderSQL}
//               >
//                 Report Builder SQL
//               </Button>
//             </>
//           ) : (
//             <div style={{ padding: "20px" }}>
//   <Row className="align-items-center justify-content-between">
//     {/* Left side: Search bar */}
//     <Col xs={12} md={8} lg={6} className="d-flex justify-content-start ">
//       <InputGroup
//         style={{
//           width: "100%",
//           borderRadius: "30px",
//           boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//           backgroundColor: "#f8f9fa",
//           overflow: "hidden",
//           margin: "20px 0",
//         }}
//       >
//         <InputGroup.Text
//           style={{
//             backgroundColor: "#e9ecef",
//             border: "none",
//             padding: "10px 15px",
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           <FaSearch color="#6c757d" />
//         </InputGroup.Text>
//         <FormControl
//           placeholder="Search"
//           value={searchQuery}
//           onChange={(e) => handleSearch(e.target.value)}
//           style={{
//             border: "none",
//             boxShadow: "none",
//             padding: "10px 15px",
//             fontSize: "16px",
//           }}
//         />
//       </InputGroup>
//     </Col>

//     {/* Right side: Buttons */}
//     <Col xs={12} md={4} lg={6} className="d-flex justify-content-end offset-md-1">
//       <Button
//         variant="primary"
//         onClick={handleBack}
//         style={{ margin: "10px" }}
//       >
//         Back to Report Cards
//       </Button>
//       {viewMode === "table" && (
//         <>
//           <Button
//             variant="primary"
//             onClick={exportToExcel}
//             style={{ marginRight: "10px" }}
//           >
//             Export to Excel
//           </Button>
//           <Button variant="primary" onClick={() => setShowAddModal(true)}>
//             Add
//           </Button>
//         </>
//       )}
//     </Col>
//   </Row>
// </div>

//           )}
//         </div>
//         {viewMode === "cards" ? renderCards() : renderTable()}

//         {/* Manage Columns & Records Per Page */}
//         <Row className="mt-4">
//           <Col md={6}>
//             <Dropdown>
//               <Dropdown.Toggle variant="outline-primary">
//                 Manage Columns
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 {Object.keys(visibleColumns).map((column) => (
//                   <Dropdown.Item
//                     key={column}
//                     onClick={() => toggleColumn(column)}
//                   >
//                     <Form.Check
//                       type="checkbox"
//                       label={
//                         column.charAt(0).toUpperCase() +
//                         column.slice(1).toLowerCase()
//                       }
//                       checked={visibleColumns[column]}
//                       readOnly
//                     />
//                   </Dropdown.Item>
//                 ))}
//               </Dropdown.Menu>
//             </Dropdown>
//           </Col>
//           <Col md={6} className="d-flex justify-content-end">
//             <Dropdown>
//               <Dropdown.Toggle variant="outline-primary">
//                 Records Per Page
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 {[5, 10, 20, 50].map((number) => (
//                   <Dropdown.Item
//                     key={number}
//                     onClick={() => handleRecordsPerPageChange(number)}
//                   >
//                     {number}
//                   </Dropdown.Item>
//                 ))}
//               </Dropdown.Menu>
//             </Dropdown>
//           </Col>
//         </Row>

//         {/* Edit form model */}
//         <Modal show={showModal} onHide={handleClose} centered>
//           <Modal.Header closeButton>
//             <Modal.Title className="text-primary">Edit User Detail</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group controlId="formGroupName">
//                 <Form.Label>Report Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={editData.reportName || ""}
//                   onChange={(e) =>
//                     setEditData({ ...editData, reportName: e.target.value })
//                   }
//                 />
//               </Form.Group>
//               <Form.Group controlId="formGroupDescription">
//                 <Form.Label>Description</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={editData.description || ""}
//                   onChange={(e) =>
//                     setEditData({ ...editData, description: e.target.value })
//                   }
//                 />
//               </Form.Group>
//               <Form.Group controlId="formGroupActive">
//                 <Form.Check
//                   type="checkbox"
//                   label="Active"
//                   checked={editData.active}
//                   onChange={(e) =>
//                     setEditData({ ...editData, active: e.target.checked })
//                   }
//                 />
//               </Form.Group>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="primary" onClick={handleSubmit}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal>
//         {/* Add form model */}
//         <Modal show={showAddModal} onHide={handleAddClose} centered>
//           <Modal.Header closeButton>
//             <Modal.Title className="text-primary">
//               Add New User Detail
//             </Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group controlId="formGroupAddName" className="mb-3">
//                 <Form.Label className="fw-bold">Report Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter report name"
//                   value={newData.reportName}
//                   onChange={(e) =>
//                     setNewData({ ...newData, reportName: e.target.value })
//                   }
//                   className="shadow-sm"
//                   required
//                 />
//               </Form.Group>

//               <Form.Group controlId="formGroupAddDescription" className="mb-3">
//                 <Form.Label className="fw-bold">Description</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter description"
//                   value={newData.description}
//                   onChange={(e) =>
//                     setNewData({ ...newData, description: e.target.value })
//                   }
//                   className="shadow-sm"
//                   required
//                 />
//               </Form.Group>

//               <Form.Group controlId="formGroupAddActive" className="mb-3">
//                 <Form.Check
//                   type="checkbox"
//                   label="Active"
//                   checked={newData.active}
//                   onChange={(e) =>
//                     setNewData({ ...newData, active: e.target.checked })
//                   }
//                   className="shadow-sm"
//                 />
//               </Form.Group>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer className="justify-content-between">
//             <Button variant="primary" onClick={handleAddClose} className="px-4">
//               Cancel
//             </Button>
//             <Button
//               variant="primary"
//               onClick={handleAddSubmit}
//               className="px-4"
//             >
//               Add User Detail
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </div>
//   );
// }

// export default UserDetailsView;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import {
  faFileExcel,
  faPlus,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  Modal,
  Dropdown,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import * as XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Dashboard/CSS/CSS/CommonStyle.css";
function UserDetailsView() {
  const [userDetails, setUserDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("cards");
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [reportBuilderView, setReportBuilderView] = useState(null);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [newData, setNewData] = useState({
    reportName: "",
    description: "",
    active: false,
  });
  const [visibleColumns, setVisibleColumns] = useState({
    reportName: true,
    description: true,
    action: true,
    status: true,
  });

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/Rpt_builder2/Rpt_builder2`;
    const token = localStorage.getItem("authToken");

    const fetchUserDetails = async () => {
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
        setUserDetails(data);
      } catch (error) {
        console.error("Fetching user details error:", error);
      }
    };

    fetchUserDetails();
  }, []);

  //   const filteredData = userDetails.filter((item) =>
  //     item.name.toLowerCase().includes(searchQuery.toLowerCase())
  //   );

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleDelete = (index) => {
    const filteredDetails = userDetails.filter((_, i) => i !== index);
    setUserDetails(filteredDetails);
  };

  const handleEdit = (detail) => {
    setEditData(detail);
    setShowModal(true);
  };
  const toggleColumn = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const handleRecordsPerPageChange = (number) => {
    setRecordsPerPage(number);
  };

  const switchToReportBuilderURL = () => {
    setReportBuilderView("URL");
    setViewMode("table");
  };

  const switchToReportBuilderSQL = () => {
    setReportBuilderView("SQL");
    setViewMode("table");
  };

  const handleBack = () => {
    setReportBuilderView(null);
    setViewMode("cards");
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleAddClose = () => {
    setShowAddModal(false);
  };

  const handleSubmit = () => {
    const updatedDetails = userDetails.map((detail) =>
      detail.reportName === editData.reportName ? editData : detail
    );
    setUserDetails(updatedDetails);
    setShowModal(false);
  };

  const handleAddSubmit = () => {
    setUserDetails([...userDetails, newData]);
    setNewData({ reportName: "", description: "", active: false });
    setShowAddModal(false);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet([]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "UserDetails");
    XLSX.writeFile(workbook, "UserDetails.xlsx");
  };

  const renderCards = () => (
    <div className="row mt-4">
      {userDetails.map((detail, index) => (
        <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div className="card shadow-lg border-0">
            <div className="card-body" style={{ textDecoration: "none" }}>
              <h5 className="card-title" style={{ textDecoration: "none" }}>
                {detail.reportName}
              </h5>
              <p className="card-text" style={{ textDecoration: "none" }}>
                {detail.description || "No description available"}
              </p>
              <p className="card-text" style={{ textDecoration: "none" }}>
                Status: {detail.active ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTable = () => (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="thead-light">
          <tr>
            <th>Report Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {userDetails.map((detail, index) => (
            <tr key={index}>
              <td>{detail.reportName}</td>
              <td>{detail.description || "No description available"}</td>
              <td>{detail.active ? "Active" : "Inactive"}</td>
              <td className="text-center">
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => handleEdit(detail)}
                  className="mr-2 me-2 "
                >
                  <FontAwesomeIcon icon={faEdit} color="black" />
                </Button>
                <Button
                  variant="light"
                  size="sm"
                  className="mr-2"
                  onClick={() => handleDelete(index)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} color="black" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="user-details-wrapper">
      <div className="container mt-4">
        <div className="title_name">
            <h2>Report Card</h2>
        </div>
        {reportBuilderView === null ? (
          <>
            <Button
              variant="primary"
              size="lg"
              onClick={switchToReportBuilderURL}
              className="pr-2"
            >
              Report Builder URL
            </Button>
            <Button
              variant="primary"
              size="lg"
              style={{ marginLeft: "20px" }}
              onClick={switchToReportBuilderSQL}
            >
              Report Builder SQL
            </Button>
          </>
        ) : (
          <Row className="align-items-center my-3">
            {/* Left: Search Bar */}
            <Col
              xs={12}
              md={8}
              lg={6}
              className="d-flex justify-content-center my-3"
            >
              <InputGroup
                className="search-bar"
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  width: "100%",
                  maxWidth: "500px", // Set max-width to limit overall width
                  paddingRight: "-15px", // Increase padding on the right side
                }}
              >
                <InputGroup.Text
                  style={{
                    backgroundColor: "#0E6591",
                    color: "#fff",
                    padding: "10px 15px",
                  }}
                >
                  <FaSearch />
                </InputGroup.Text>
                <FormControl
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{
                    padding: "10px",
                    border: "none",
                    paddingRight: "5px", // More space on the right side of input field
                  }}
                />
              </InputGroup>
            </Col>

            {/* Right: Buttons */}
            <Col xs={12} md={4} lg={6} className="d-flex justify-content-end">
              <FontAwesomeIcon
                icon={faArrowLeft}
                onClick={handleBack}
                className="me-2"
                style={{
                  cursor: "pointer",
                  fontSize: "1.5rem",
                  color: "#747264",
                  marginRight: "20px"
                }} // Adjust size and color as needed
              />
              {viewMode === "table" && (
                <>
                  {/* Export to Excel Icon */}
                  <FontAwesomeIcon
                    icon={faFileExcel}
                    onClick={exportToExcel}
                    className="me-2"
                    style={{
                      cursor: "pointer",
                      fontSize: "1.5rem",
                      color: "#747264",
                      marginRight: "20px"
                    }}
                  />

                  {/* Add Icon */}
                  <FontAwesomeIcon
                    icon={faPlus}
                    onClick={() => setShowAddModal(true)}
                    style={{
                      cursor: "pointer",
                      fontSize: "1.5rem",
                      color: "#747264",
                    }}
                  />
                </>
              )}
            </Col>
          </Row>
        )}

        {/* Conditional rendering of content */}
        {viewMode === "cards" ? renderCards() : renderTable()}

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
                        column.charAt(0).toUpperCase() +
                        column.slice(1).toLowerCase()
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
                  <Dropdown.Item
                    key={number}
                    onClick={() => handleRecordsPerPageChange(number)}
                  >
                    {number}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        {/* Edit form model */}
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title className="text-primary">Edit User Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formGroupName">
                <Form.Label>Report Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editData.reportName || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, reportName: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formGroupDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={editData.description || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formGroupActive">
                <Form.Check
                  type="checkbox"
                  label="Active"
                  checked={editData.active}
                  onChange={(e) =>
                    setEditData({ ...editData, active: e.target.checked })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Add form model */}
        <Modal show={showAddModal} onHide={handleAddClose} centered>
          <Modal.Header closeButton>
            <Modal.Title className="text-primary">
              Add New User Detail
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formGroupAddName" className="mb-3">
                <Form.Label className="fw-bold">Report Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter report name"
                  value={newData.reportName}
                  onChange={(e) =>
                    setNewData({ ...newData, reportName: e.target.value })
                  }
                  className="shadow-sm"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGroupAddDescription" className="mb-3">
                <Form.Label className="fw-bold">Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  value={newData.description}
                  onChange={(e) =>
                    setNewData({ ...newData, description: e.target.value })
                  }
                  className="shadow-sm"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGroupAddActive" className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Active"
                  checked={newData.active}
                  onChange={(e) =>
                    setNewData({ ...newData, active: e.target.checked })
                  }
                  className="shadow-sm"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="justify-content-between">
            <Button variant="primary" onClick={handleAddClose} className="px-4">
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAddSubmit}
              className="px-4"
            >
              Add User Detail
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default UserDetailsView;

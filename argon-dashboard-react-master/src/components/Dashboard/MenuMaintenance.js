// import React, { useState, useEffect } from 'react';
// import { Button, Dropdown, Table, Modal, Form } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrashAlt, faPlus, faBars } from '@fortawesome/free-solid-svg-icons';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../Dashboard/MenuMaitenance.css';

// function MenuMaintenance() {
//   const [menuItems, setMenuItems] = useState([]);
//   const [subMenuItems, setSubMenuItems] = useState([]);
//   const [showAddEditPopup, setShowAddEditPopup] = useState(false);
//   const [currentMenuItem, setCurrentMenuItem] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [recordsPerPage, setRecordsPerPage] = useState(10);
//   const [visibleColumns, setVisibleColumns] = useState({
//     menuItemId: true,
//     menuItemDesc: true,
//     main_menu_action_name: true,
//     status: true
//   });
//   const [isSubMenu, setIsSubMenu] = useState(false);
//   const [parentMenuItemId, setParentMenuItemId] = useState(null);

//   useEffect(() => {
//     const apiUrl = `${process.env.REACT_APP_API_URL}/api1/submenu1`;
//     const token = localStorage.getItem("authToken");

//     const fetchMenuItems = async () => {
//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error(`Error: ${response.status}`);
//             }

//             const data = await response.json();
//             setMenuItems(data);
//         } catch (error) {
//             console.error('Fetching error:', error);
//         }
//     };

//     fetchMenuItems();
// }, []); 

//   const toggleColumn = (column) => {
//     setVisibleColumns(prev => ({
//       ...prev,
//       [column]: !prev[column]
//     }));
//   };

//   const openAddEditPopup = (menuItem = {}) => {
//     setIsEditing(!!menuItem.menuItemId);
//     setCurrentMenuItem(menuItem);
//     setShowAddEditPopup(true);
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setCurrentMenuItem(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (isEditing) {
//       if (isSubMenu) {
//         setSubMenuItems(subMenuItems.map(item =>
//           item.menuItemId === currentMenuItem.menuItemId ? currentMenuItem : item
//         ));
//       } else {
//         setMenuItems(menuItems.map(item =>
//           item.menuItemId === currentMenuItem.menuItemId ? currentMenuItem : item
//         ));
//       }
//     } else {
//       if (isSubMenu) {
//         setSubMenuItems([...subMenuItems, { ...currentMenuItem, menuItemId: `ID-${subMenuItems.length + 1}` }]);
//       } else {
//         setMenuItems([...menuItems, { ...currentMenuItem, menuItemId: `ID-${menuItems.length + 1}` }]);
//       }
//     }
//     setShowAddEditPopup(false);
//   };

//   const handleDelete = (menuItemId) => {
//     if (isSubMenu) {
//       setSubMenuItems(subMenuItems.filter(item => item.menuItemId !== menuItemId));
//     } else {
//       setMenuItems(menuItems.filter(item => item.menuItemId !== menuItemId));
//     }
//   };

//   const handleRecordsPerPageChange = (number) => {
//     setRecordsPerPage(number);
//   };

//   const handleSubMenuClick = async (menuItemId) => {
//     try {
//       const apiUrl = `http://localhost:9292/api1/submenu1/${menuItemId}`;
//       const response = await fetch(apiUrl, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzeXNhZG1pbiIsInNjb3BlcyI6IlJPTEVfQURNSU4sUk9MRV9EZXZlbG9wZXIiLCJpYXQiOjE3MTU1ODc1ODEsImV4cCI6MTcxODE3OTU4MX0.hJ9heWuagVZB0WRbPNcIiCvMuQ4ASmth2mdSkGrkGXs',
//         }
//       });
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }
//       const data = await response.json();
//       setSubMenuItems(data);
//       setParentMenuItemId(menuItemId);
//       setIsSubMenu(true);
//     } catch (error) {
//       console.error('Fetching sub-menu error:', error);
//     }
//   };

//   const handleBackToMainMenu = () => {
//     setIsSubMenu(false);
//     setSubMenuItems([]);
//     setParentMenuItemId(null);
//   };

//   return (
//     <div className="container mt-5">
//       <div className="d-flex justify-content-end mb-2">
//         <button onClick={() => openAddEditPopup()} className="btn btn-success">
//           <FontAwesomeIcon icon={faPlus} /> ADD
//         </button>
//         {isSubMenu && (
//           <button onClick={handleBackToMainMenu} className="btn btn-success ms-2">
//             Back to Main Menu
//           </button>
//         )}
//       </div>

//       <div className='table-responsive'>
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               {Object.keys(visibleColumns).map(key => visibleColumns[key] && (
//                 <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
//               ))}
//               <th>Actions</th>
//               {!isSubMenu && <th>Sub-Menu</th>} {/* Add sub-menu column for main menu */}
//             </tr>
//           </thead>
//           <tbody>
//             {(isSubMenu ? subMenuItems : menuItems).slice(0, recordsPerPage).map((menuItem, index) => (
//               <tr key={index}>
//                 {Object.keys(visibleColumns).map(key => visibleColumns[key] && (
//                   <td key={key}>{menuItem[key]}</td>
//                 ))}
//                 <td>
//                   <Button onClick={() => openAddEditPopup(menuItem)} className="btn btn-sm btn-success me-2">
//                     <FontAwesomeIcon icon={faEdit} />
//                   </Button>
//                   <Button onClick={() => handleDelete(menuItem.menuItemId)} className="btn btn-sm btn-danger">
//                     <FontAwesomeIcon icon={faTrashAlt} />
//                   </Button>
//                 </td>
//                 {!isSubMenu && (
//                   <td>
//                     <Button onClick={() => handleSubMenuClick(menuItem.menuItemId)} className="btn btn-sm btn-success">
//                       <FontAwesomeIcon icon={faBars} /> {/* Three-lines icon */}
//                     </Button>
//                   </td>
//                 )}
//               </tr>
//             ))}
//             {(isSubMenu ? subMenuItems : menuItems).length === 0 && (
//               <tr>
//                 <td colSpan={Object.keys(visibleColumns).filter(key => visibleColumns[key]).length + (isSubMenu ? 1 : 2)} className="text-center">
//                   No menu items found. Please add new items.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       </div>
//       <div className="d-flex justify-content-between">
//         <Dropdown className="mt-2">
//           <Dropdown.Toggle variant="btn btn-success btn-sm" id="dropdown-manage-columns">
//             Manage Columns
//           </Dropdown.Toggle>
//           <Dropdown.Menu>
//             {Object.keys(visibleColumns).map(column => (
//               <Dropdown.Item key={column} onClick={() => toggleColumn(column)}>
//                 <Form.Check
//                   type="checkbox"
//                   label={column.charAt(0).toUpperCase() + column.slice(1).toLowerCase()}
//                   checked={visibleColumns[column]}
//                   readOnly
//                 />
//               </Dropdown.Item>
//             ))}
//           </Dropdown.Menu>
//         </Dropdown>

//         <Dropdown className="mt-2">
//           <Dropdown.Toggle variant="btn btn-success btn-sm" id="dropdown-records-per-page">
//             Records Per Page
//           </Dropdown.Toggle>
//           <Dropdown.Menu>
//           {[5, 10, 20, 50].map(number => (
//               <Dropdown.Item key={number} onClick={() => handleRecordsPerPageChange(number)}>
//                 {number}
//               </Dropdown.Item>
//             ))}
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>

//       {showAddEditPopup && (
//         <Modal show={showAddEditPopup} onHide={() => setShowAddEditPopup(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>{isEditing ? 'Edit Menu Item' : 'Add New Menu Item'}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form onSubmit={handleSubmit}>
//               <Form.Group controlId="menuItemDesc">
//                 <Form.Label>Title</Form.Label>
//                 <Form.Control type="text" name="menuItemDesc" value={currentMenuItem.menuItemDesc || ''} onChange={handleInputChange} required />
//               </Form.Group>
//               <Form.Group controlId="main_menu_action_name">
//                 <Form.Label>Link</Form.Label>
//                 <Form.Control type="text" name="main_menu_action_name" value={currentMenuItem.main_menu_action_name || ''} onChange={handleInputChange} required />
//               </Form.Group>
//               <Form.Group controlId="status">
//                 <Form.Label>Status</Form.Label>
//                 <Form.Control as="select" name="status" value={currentMenuItem.status || ''} onChange={handleInputChange} required>
//                   <option value="">Select Status</option>
//                   <option value="Enable">Enable</option>
//                   <option value="Disable">Disable</option>
//                 </Form.Control>
//               </Form.Group>
//               <Modal.Footer>
//                 <Button variant="secondary" onClick={() => setShowAddEditPopup(false)}>Close</Button>
//                 <Button type="submit" variant="secondary">{isEditing ? 'Update Item' : 'Add Item'}</Button>
//               </Modal.Footer>
//             </Form>
//           </Modal.Body>
//         </Modal>
//       )}
//     </div>
//   );
// }

// export default MenuMaintenance;

import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Table, Modal, Form, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faBars } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Dashboard/MenuMaitenance.css';

function MenuMaintenance() {
  const [menuItems, setMenuItems] = useState([]);
  const [subMenuItems, setSubMenuItems] = useState([]);
  const [showAddEditPopup, setShowAddEditPopup] = useState(false);
  const [currentMenuItem, setCurrentMenuItem] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [visibleColumns, setVisibleColumns] = useState({
    menuItemId: true,
    menuItemDesc: true,
    main_menu_action_name: true,
    status: true,
  });
  const [isSubMenu, setIsSubMenu] = useState(false);
  const [parentMenuItemId, setParentMenuItemId] = useState(null);

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api1/submenu1`;
    const token = localStorage.getItem('authToken');

    const fetchMenuItems = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Fetching error:', error);
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

  const openAddEditPopup = (menuItem = {}) => {
    setIsEditing(!!menuItem.menuItemId);
    setCurrentMenuItem(menuItem);
    setShowAddEditPopup(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentMenuItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      if (isSubMenu) {
        setSubMenuItems(subMenuItems.map((item) =>
          item.menuItemId === currentMenuItem.menuItemId ? currentMenuItem : item
        ));
      } else {
        setMenuItems(menuItems.map((item) =>
          item.menuItemId === currentMenuItem.menuItemId ? currentMenuItem : item
        ));
      }
    } else {
      if (isSubMenu) {
        setSubMenuItems([...subMenuItems, { ...currentMenuItem, menuItemId: `ID-${subMenuItems.length + 1}` }]);
      } else {
        setMenuItems([...menuItems, { ...currentMenuItem, menuItemId: `ID-${menuItems.length + 1}` }]);
      }
    }
    setShowAddEditPopup(false);
  };

  const handleDelete = (menuItemId) => {
    if (isSubMenu) {
      setSubMenuItems(subMenuItems.filter((item) => item.menuItemId !== menuItemId));
    } else {
      setMenuItems(menuItems.filter((item) => item.menuItemId !== menuItemId));
    }
  };

  const handleRecordsPerPageChange = (number) => {
    setRecordsPerPage(number);
  };

  const handleSubMenuClick = async (menuItemId) => {
    try {
      const apiUrl = `http://localhost:9292/api1/submenu1/${menuItemId}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzeXNhZG1pbiIsInNjb3BlcyI6IlJPTEVfQURNSU4sUk9MRV9EZXZlbG9wZXIiLCJpYXQiOjE3MTU1ODc1ODEsImV4cCI6MTcxODE3OTU4MX0.hJ9heWuagVZB0WRbPNcIiCvMuQ4ASmth2mdSkGrkGXs',
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setSubMenuItems(data);
      setParentMenuItemId(menuItemId);
      setIsSubMenu(true);
    } catch (error) {
      console.error('Fetching sub-menu error:', error);
    }
  };

  const handleBackToMainMenu = () => {
    setIsSubMenu(false);
    setSubMenuItems([]);
    setParentMenuItemId(null);
  };

  return (
    <div className="container mt-5">
      {/* Header and Add Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Menu Maintenance</h2>
        <div>
          <Button onClick={() => openAddEditPopup()} className="btn btn-primary me-2">
            <FontAwesomeIcon icon={faPlus} /> ADD
          </Button>
          {isSubMenu && (
            <Button onClick={handleBackToMainMenu} className="btn btn-primary">
              Back to Main Menu
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <Table striped bordered hover className="shadow-sm">
          <thead className="thead-light">
            <tr>
              {Object.keys(visibleColumns).map(
                (key) => visibleColumns[key] && <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
              )}
              <th>Actions</th>
              {!isSubMenu && <th>Sub-Menu</th>}
            </tr>
          </thead>
          <tbody className='tbody'>
            {(isSubMenu ? subMenuItems : menuItems)
              .slice(0, recordsPerPage)
              .map((menuItem, index) => (
                <tr key={index}>
                  {Object.keys(visibleColumns).map(
                    (key) =>
                      visibleColumns[key] && <td key={key}>{menuItem[key]}</td>
                  )}
                  <td className="text-center">
                    <Button
                      onClick={() => openAddEditPopup(menuItem)}
                      className="btn btn-sm btn-light me-2"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                      onClick={() => handleDelete(menuItem.menuItemId)}
                      className="btn btn-sm btn-light"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  </td>
                  {!isSubMenu && (
                    <td className="text-center">
                      <Button
                        onClick={() => handleSubMenuClick(menuItem.menuItemId)}
                        className="btn btn-sm btn-primary"
                      >
                        <FontAwesomeIcon icon={faBars} />
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            {(isSubMenu ? subMenuItems : menuItems).length === 0 && (
              <tr>
                <td
                  colSpan={
                    Object.keys(visibleColumns).filter(
                      (key) => visibleColumns[key]
                    ).length + (isSubMenu ? 1 : 2)
                  }
                  className="text-center"
                >
                  No menu items found. Please add new items.
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

      {/* Add/Edit Modal */}
      {showAddEditPopup && (
        <Modal show={showAddEditPopup} onHide={() => setShowAddEditPopup(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? 'Edit Menu Item' : 'Add New Menu Item'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="menuItemDesc" className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="menuItemDesc"
                  value={currentMenuItem.menuItemDesc || ''}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="main_menu_action_name" className="mb-3">
                <Form.Label>Link</Form.Label>
                <Form.Control
                  type="text"
                  name="main_menu_action_name"
                  value={currentMenuItem.main_menu_action_name || ''}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="status" className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={currentMenuItem.status || ''}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Enable">Enable</option>
                  <option value="Disable">Disable</option>
                </Form.Select>
              </Form.Group>
              <Modal.Footer>
                <Button variant="primary" onClick={() => setShowAddEditPopup(false)}>
                  Close
                </Button>
                <Button type="submit" variant="primary">
                  {isEditing ? 'Update Item' : 'Add Item'}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default MenuMaintenance;

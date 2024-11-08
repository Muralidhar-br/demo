import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function DashboardView({onDashboardCharts}) { 

  const [showTable, setShowTable] = useState(false);
  const [dashboards, setDashboards] = useState([]);
  const [showAddItemPopup, setShowAddItemPopup] = useState(false);
  const [newItem, setNewItem] = useState({
    dashboardName: "",
    description: "",
    securityProfile: "",
    addToHome: "",
  });
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [columns, setColumns] = useState([
    { label: "Dashboard Name", key: "dashboardName", visible: true },
    { label: "Description", key: "description", visible: true },
    { label: "Security Profile", key: "securityProfile", visible: true },
    { label: "Add to Home", key: "addToHome", visible: true },
  ]);
  const [showManageColumnsModal, setShowManageColumnsModal] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(10); // Initial number of records per page
  const [error, setError] = useState(null); // To handle error state

  useEffect(() => {
    if (showTable) {
      fetchData();
    } else {
      fetchDashboardCardData();
    }
  }, [showTable]);

  const fetchData = async () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/getNotificationByUser`;
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("Authorization token is missing.");
      setError("Authorization token is missing.");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setDashboards(data);
    } catch (error) {
      console.error("Fetching error:", error);
      setError(error.toString());
    }
  };

  const fetchDashboardCardData = async () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/get_Dashboard_header`;
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("Authorization token is missing.");
      setError("Authorization token is missing.");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const testingDashboard = data.find(
        (dashboard) => dashboard.dashboard_name === "Testing Dashboard"
      );
      setDashboards(testingDashboard ? [testingDashboard] : []);
    } catch (error) {
      console.error("Fetching error:", error);
      setError(error.toString());
    }
  };

  const handleAddItemClick = () => {
    setShowAddItemPopup(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = () => {
    if (selectedItemIndex !== null) {
      const updatedDashboards = [...dashboards];
      updatedDashboards[selectedItemIndex] = newItem;
      setDashboards(updatedDashboards);
    } else {
      setDashboards([...dashboards, newItem]);
    }
    setNewItem({
      dashboardName: "",
      description: "",
      securityProfile: "",
      addToHome: "",
    });
    setSelectedItemIndex(null);
    setShowAddItemPopup(false);
  };

  const handleDeleteItem = (index) => {
    const updatedDashboards = [...dashboards];
    updatedDashboards.splice(index, 1);
    setDashboards(updatedDashboards);
  };

  const handleColumnVisibilityChange = (key) => {
    const updatedColumns = columns.map((col) => {
      if (col.key === key) {
        return { ...col, visible: !col.visible };
      }
      return col;
    });
    setColumns(updatedColumns);
  };

  const handleRecordsPerPageChange = (value) => {
    setRecordsPerPage(value);
  };

  return (
    <div className="container mt-5">
      <h4>Dashboard</h4>

      {/* Header Buttons */}
      <div className="text-end mb-3">
        {!showTable && (
          <Button
            variant="secondary"
            className="me-2"
            onClick={() => setShowTable(true)}
          >
            Dashboard Builder
          </Button>
        )}
        {showTable && (
          <div className="text-end mb-3">
            <Button
              variant="secondary"
              className="me-2"
              onClick={() => setShowTable(false)}
            >
              Back
            </Button>
            <Button
              variant="secondary"
              className="me-2"
              onClick={handleAddItemClick}
            >
              Add Item
            </Button>
          </div>
        )}
      </div>

      {/* Render the card component only if showTable is false */}
      {!showTable && dashboards.length > 0 && (
        <div className="card-container">
          <Card className="dashboard-card col-lg-4 col-md-6 col-sm-12 mb-4" onClick={onDashboardCharts}  >
            <Card.Body>
              <Card.Title>{dashboards[0].dashboard_name}</Card.Title>
              <Card.Text>{dashboards[0].description}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}

      {/* Table */}
      {showTable && (
        <div>
          <table className="table table-striped">
            {/* Table Header */}
            <thead>
              <tr>
                {columns
                  .filter((column) => column.visible)
                  .map((column, index) => (
                    <th key={index}>{column.label}</th>
                  ))}
                <th>Action</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {dashboards.map((dashboard, index) => (
                <tr key={index}>
                  {columns
                    .filter((column) => column.visible)
                    .map((column, columnIndex) => (
                      <td key={columnIndex}>{dashboard[column.key]}</td>
                    ))}
                  <td>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setShowAddItemPopup(true);
                        setNewItem(dashboard);
                        setSelectedItemIndex(index);
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDeleteItem(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between">
            {/* Manage Columns Button */}
            <div className="text-start mb-3">
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => setShowManageColumnsModal(true)}
              >
                Manage Columns
              </Button>
            </div>

            {/* Records per Page Dropdown */}
            <div className="text-end mb-3">
              <label htmlFor="recordsPerPage" className="">
                Records per Page
              </label>
              <select
                className="form-select"
                value={recordsPerPage}
                onChange={(e) => handleRecordsPerPageChange(e.target.value)}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      <Modal show={showAddItemPopup} onHide={() => setShowAddItemPopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedItemIndex !== null ? "Edit Item" : "Add Item"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="dashboardName" className="form-label">
                Dashboard Name
              </label>
              <input
                type="text"
                className="form-control"
                id="dashboardName"
                name="dashboardName"
                value={newItem.dashboardName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={newItem.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="securityProfile" className="form-label">
                Security Profile
              </label>
              <input
                type="text"
                className="form-control"
                id="securityProfile"
                name="securityProfile"
                value={newItem.securityProfile}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="addToHome" className="form-label">
                Add to Home
              </label>
              <input
                type="text"
                className="form-control"
                id="addToHome"
                name="addToHome"
                value={newItem.addToHome}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddItemPopup(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddItem}>
            {selectedItemIndex !== null ? "Save Changes" : "Add Item"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Manage Columns Modal */}
      <Modal
        show={showManageColumnsModal}
        onHide={() => setShowManageColumnsModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Manage Columns</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {columns.map((column, index) => (
              <div key={index} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={column.visible}
                  onChange={() => handleColumnVisibilityChange(column.key)}
                />
                <label className="form-check-label">{column.label}</label>
              </div>
            ))}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowManageColumnsModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DashboardView;

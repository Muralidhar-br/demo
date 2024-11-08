import React, { useEffect, useState, useRef } from "react";
import QRCode from "qrcode.react";
import Barcode from "react-barcode";
// import html2canvas from "html2canvas";
import Select from "react-select";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import {
  Modal,
  Button,
  Form,
  Pagination,
  Container,
  Row,
  Col,
  Image,
  ProgressBar,
  Table,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Reactnewd/Reactnewd.css";
import { getToken } from "../../../../utils/tokenService";
const FILE_API_URL = `${process.env.REACT_APP_API_URL}/FileUpload/Uploadeddocs`;
const API_URL = `${process.env.REACT_APP_API_URL}/Reactnewd/Reactnewd`;
const REACT_APP_API_TOKEN = localStorage.getItem("authToken");

const EntityTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [newEntity, setNewEntity] = useState({
    testingsd: "",
  });
  const [editEntity, setEditEntity] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteEntityId, setDeleteEntityId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust this value as needed
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showValulistModal, setShowValulistModal] = useState(false);
  const barcodeRef = useRef(null);
  const [serverData, setServerData] = useState([]);
  const recaptchaRef = useRef(null);
  const editBarcodeRef = useRef(null);
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, data]);
  const fetchData = async () => {
    try {
      const token = getToken();
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = getToken();
      await axios.delete(`${API_URL}/${deleteEntityId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
      toast.success("Successfully deleted!");
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const token = getToken();
      await axios.post(API_URL, newEntity, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
      setNewEntity({
        testingsd: "",
      });
      setShowAddModal(false);
      toast.success("Successfully added!");
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEntity({ ...newEntity, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEntity({ ...editEntity, [name]: value });
  };

  const handleEdit = (entity) => {
    setEditEntity(entity);

    setShowEditModal(true);
  };

  const formatCurrency = (value) => {
    if (value && !value.startsWith("₹")) {
      return `₹${value}`;
    }
    return value;
  };

  const handleUpdate = async () => {
    try {
      const token = getToken();
      await axios.put(`${API_URL}/${editEntity.id}`, editEntity, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
      setShowEditModal(false);
      toast.success("Successfully updated!");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleSearch = () => {
    const filtered = data.filter((entity) =>
      entity.testingsd.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const generateBarcodeImage = async (ref) => {
    if (ref.current) {
      const canvas = await html2canvas(ref.current);
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "barcode.png";
      link.click();
    }
  };

  // Calculate items for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="main_box container mt-2 pt-3 me-5">
      <ToastContainer />
      <h1 className="mb-4 main_title text-primary">Entity Table</h1>
      <div className="d-flex justify-content-between mb-3">
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          <i className="bi bi-plus-lg"></i> Add Entity
        </Button>

        <Form.Control
          type="text"
          className="w-25"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Table className="table table-striped table-table-bordered table-hover table-responsive table-light">
        <thead>
          <tr>
            <th>testingsd</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((entity) => (
            <tr key={entity.id}>
              <td>{entity.testingsd}</td>

              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(entity)}
                >
                  Update
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setDeleteEntityId(entity.id);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="d-flex justify-content-center mt-4">
        {Array.from(
          { length: Math.ceil(filteredData.length / itemsPerPage) },
          (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Entity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editEntity && (
            <Form className="bg-light p-3 text-light rounded">
              <div className="form-group">
                <label htmlFor="testingsd">testingsd</label>
                <input
                  type="text"
                  className="form-control"
                  id="testingsd"
                  name="testingsd"
                  value={editEntity.testingsd}
                  onChange={handleEditChange}
                  required
                />
              </div>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Add New Entity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="bg-light p-3 text-light rounded">
            <div className="form-group">
              <div className="container mt-4" style={{ width: "100%" }}>
                <div className="card p-4 shadow-sm rounded">
                  <label htmlFor="testingsd" className="form-label">
                    testingsd{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="testingsd"
                    name="testingsd"
                    value={newEntity.testingsd}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            {/* <div>
        <label htmlFor="second-name" className="form-label"> Name:</label>
          <input
            type="text"
            id="second-name"
            name="second-name"
            className="form-control"
            value={secondName}
            onChange={handleSecondNameChange}
            placeholder="Enter your second name"
          />
        </div> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add Entity
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this entity?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EntityTable;

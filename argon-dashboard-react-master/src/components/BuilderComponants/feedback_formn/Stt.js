import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Pagination } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "react-bootstrap/Table";
import { getToken } from '../../../../utils/tokenService';

const API_URL = `${process.env.REACT_APP_API_URL}/Stt/Stt`;

const EntityTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [newEntity, setNewEntity] = useState({
    name: "",

    description: "",

  });
  const [editEntity, setEditEntity] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteEntityId, setDeleteEntityId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust this value as needed
  const [searchQuery, setSearchQuery] = useState("");

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
    name: "",

    description: "",

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
    const filtered = data.filter(
      (entity) =>


        entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||




        entity.description.toLowerCase().includes(searchQuery.toLowerCase())     );
    setFilteredData(filtered);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate items for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h1 className="mb-4">Entity Table</h1>
      <div className="d-flex justify-content-between mb-3">
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          Add Entity
        </Button>
        <Form.Control
          type="text"
          className="w-25"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr>
  <th>name</th>

  <th>description</th>

          </tr>
        </thead>
        <tbody >
          {currentItems.map((entity) => (
            <tr key={entity.id}>

              <td>{entity.name}</td>



              <td>{entity.description}</td>


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
            <Form className="bg-dark p-3 text-light rounded">

 <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editEntity.name}
                onChange={handleEditChange}
                className="bg-secondary text-light"
              />
            </Form.Group>
             


 <Form.Group className="mb-3">
              <Form.Label>description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={editEntity.description}
                onChange={handleEditChange}
                className="bg-secondary text-light"
              />
            </Form.Group>
             

          </Form>
          
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Entity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className="bg-dark p-3 text-light rounded">
 <Form.Group className="mb-3">
    <Form.Label>Name</Form.Label>
    <Form.Control
      type="text"
      name="name"
      value={newEntity.name}
      onChange={handleChange}
      className="bg-secondary text-light"
    />
  </Form.Group>

 <Form.Group className="mb-3">
    <Form.Label>description</Form.Label>
    <Form.Control
      type="text"
      name="description"
      value={newEntity.description}
      onChange={handleChange}
      className="bg-secondary text-light"
    />
  </Form.Group>

</Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
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

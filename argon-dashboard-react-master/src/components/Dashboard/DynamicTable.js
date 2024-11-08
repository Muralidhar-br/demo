import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import AddIcon from '@mui/icons-material/Add';

const DynamicTable = () => {
    const [forms, setForms] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.formData) {
            setForms(prevForms => [...prevForms, location.state.formData]);
        } else {
            fetchForms();
        }
    }, [location.state]);

    const fetchForms = async () => {
        try {
            const apiUrl = `${process.env.REACT_APP_API_URL}/api/form_setup`;
            const token = localStorage.getItem("authToken");

            const response = await axios.get(apiUrl, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (Array.isArray(response.data)) {
                setForms(response.data);
            } else {
                console.error('Unexpected response format:', response.data);
                setForms([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setForms([]);
        }
    };

    const handleDelete = async (id) => {
        try {
            const apiUrl = `${process.env.REACT_APP_API_URL}/api/form_setup/${id}`;
            const token = localStorage.getItem("authToken");

            await axios.delete(apiUrl, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchForms();
        } catch (error) {
            console.error('Error deleting form:', error);
        }
    };

    const handleBuild = async (id) => {
        try {
            const apiUrl = `${process.env.REACT_APP_API_URL}/api/dynamic_form_build`;
            const token = localStorage.getItem("authToken");

            await axios.post(apiUrl, { id }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Error building form:', error);
        }
    };

    const handleAdd = () => {
        navigate('/form');
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>Dynamic Form</Typography>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAdd}
                sx={{ marginBottom: '20px' }}
            >
                Add
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Go To</TableCell>
                            <TableCell>Form Name</TableCell>
                            <TableCell>Form Description</TableCell>
                            <TableCell>Related To</TableCell>
                            <TableCell>Page Event</TableCell>
                            <TableCell>Button Caption</TableCell>
                            <TableCell>Go To Form</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {forms.map((form, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        startIcon={<BuildIcon />}
                                        onClick={() => handleBuild(form.id)}
                                    >
                                        Build
                                    </Button>
                                </TableCell>
                                <TableCell>{form.formName}</TableCell>
                                <TableCell>{form.formDescription}</TableCell>
                                <TableCell>{form.relatedTo}</TableCell>
                                <TableCell>{form.pageEvent}</TableCell>
                                <TableCell>{form.buttonCaption}</TableCell>
                                <TableCell>{form.goToForm}</TableCell>
                                <TableCell>
                                    <IconButton
                                        color="secondary"
                                        onClick={() => handleDelete(form.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default DynamicTable;

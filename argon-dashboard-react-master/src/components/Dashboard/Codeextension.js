// import React, { useState, useEffect, useRef } from 'react';
// import { Box, Button, Modal, TextField, Typography, FormControl, FormControlLabel, Checkbox, Radio, RadioGroup, Autocomplete } from '@mui/material';
// import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
// import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
// import { Link } from 'react-router-dom';
// import Extension from './Extension';

// function CustomToolbar({ handleModal }) {
//   return (
//     <GridToolbarContainer>
//       <Button onClick={handleModal}>+</Button>
//     </GridToolbarContainer>
//   );
// }

// function CodeExtension() {
//   const [menuItems, setMenuItems] = useState([]);
//   const [selectedMenuItem, setSelectedMenuItem] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     testing: '',
//     dataType: ''
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:9292/api/extension');
//         const data = await response.json();
//         setMenuItems(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleThreeDotsClick = (menuItemId) => {
//     setSelectedMenuItem(menuItemId === selectedMenuItem ? null : menuItemId);
//   };

//   const handleModalOpen = () => {
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     // Reset form data after closing modal
//     setFormData({
//       name: '',
//       email: '',
//       testing: '',
//       dataType: ''
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFormSubmit = (submittedDataType) => {
//     setFormData({ ...formData, dataType: submittedDataType });
//     handleModalOpen();
//   };

//   const columns = [
//     { field: 'goto', headerName: 'Goto', width: 200, headerClassName: 'custom-header', cellClassName: 'custom-cell' },
//     { field: 'field_name', headerName: 'Field Name', width: 250, headerClassName: 'custom-header', cellClassName: 'custom-cell' },
//     { field: 'mapping', headerName: 'Mapping', width: 200, headerClassName: 'custom-header', cellClassName: 'custom-cell' },
//     { field: 'data_type', headerName: 'Data Type', width: 200, headerClassName: 'custom-header', cellClassName: 'custom-cell' },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 150,
//       renderCell: ({ row }) => (
//         <div>
//           <div className="three-dots" onClick={() => handleThreeDotsClick(row.id)}>
//             <FontAwesomeIcon icon={faEllipsisV} />
//           </div>
//           {selectedMenuItem === row.id && (
//             <div className="popover">
//               {/* Implement your actions buttons here */}
//             </div>
//           )}
//         </div>
//       ),
//     },
//   ];

//   const renderInputField = () => {
//     switch (formData.dataType) {
//       case 'date':
//         return (
//           <TextField
//             label="Date"
//             name="date"
//             type="date"
//             value={formData.date}
//             onChange={handleChange}
//             fullWidth
//           />
//         );
//       case 'textfield':
//         return (
//           <TextField
//             label="Text Field"
//             name="textfield"
//             value={formData.textfield}
//             onChange={handleChange}
//             fullWidth
//           />
//         );
//       case 'longtext':
//         return (
//           <TextField
//             label="Long Text"
//             name="longtext"
//             value={formData.longtext}
//             onChange={handleChange}
//             multiline
//             rows={4}
//             fullWidth
//           />
//         );
//       case 'checkbox':
//         return (
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={formData.checkbox || false}
//                 onChange={(e) => setFormData({ ...formData, checkbox: e.target.checked })}
//               />
//             }
//             label="Checkbox"
//           />
//         );
//       case 'radiobutton':
//         return (
//           <FormControl component="fieldset">
//             <RadioGroup
//               name="radiobutton"
//               value={formData.radiobutton || ''}
//               onChange={(e) => setFormData({ ...formData, radiobutton: e.target.value })}
//             >
//               <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
//               <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
//             </RadioGroup>
//           </FormControl>
//         );
//       case 'autocomplete':
//         return (
//           <Autocomplete
//             options={['Option 1', 'Option 2', 'Option 3']}
//             renderInput={(params) => <TextField {...params} label="Autocomplete" />}
//             value={formData.autocomplete || ''}
//             onChange={(e, newValue) => setFormData({ ...formData, autocomplete: newValue })}
//             fullWidth
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1 }}>
//         {/* Your header content here */}
//       </Box>
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <Box sx={{ width: '80%', maxWidth: 1200, marginTop: '100px' }}>
//           <DataGrid
//             rows={menuItems}
//             columns={columns}
//             pageSize={10}
//             components={{
//               Toolbar: () => (
//                 <CustomToolbar
//                   handleModal={handleModalOpen}
//                 />
//               ),
//             }}
//           />
//           <Modal open={isModalOpen} onClose={handleModalClose} centered>
//             <Box sx={{ width: 400, bgcolor: 'background.paper', p: 4, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
//               <Extension onSubmit={handleFormSubmit} /> 
//               <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
//                 <Link to="/Extension"><AirplanemodeActiveIcon sx={{ mr: 1 }} /></Link> Add Item
//               </Typography>
//               <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(formData.dataType); }}>
//                 <div>
//                   <TextField
//                     label="Name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     fullWidth
//                   />
//                 </div>
//                 <div>
//                   <TextField
//                     label="Email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     fullWidth
//                   />
//                 </div>
//                 <div>
//                   <TextField
//                     label="Testing"
//                     name="testing"
//                     value={formData.testing}
//                     onChange={handleChange}
//                     fullWidth
//                   />
//                 </div>
//                 {renderInputField()}
//                 <Button type="submit" variant="contained" sx={{ mt: 2, mr: 1 }}>Submit</Button>
//                 <Button variant="outlined" onClick={handleModalClose} sx={{ mt: 2 }}>Cancel</Button>
//               </form>
//             </Box>
//           </Modal>
//         </Box>
//       </Box>
//     </>
//   );
// }

// export default CodeExtension;

import React, { useState } from 'react';
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, IconButton, Typography, FormControlLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

function DynamicForm() {
  const [components, setComponents] = useState([{ label: '', type: '', mapping: '', readonly: false, values: '' }]);
  const [formDetails, setFormDetails] = useState({
    formName: '',
    formDescription: '',
    relatedTo: '',
    pageEvent: '',
    buttonName: '',
  });
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleComponentChange = (index, field, value) => {
    const updatedComponents = components.map((component, i) => (i === index ? { ...component, [field]: value } : component));
    setComponents(updatedComponents);
  };

  const addComponent = () => {
    setComponents([...components, { label: '', type: '', mapping: '', readonly: false, values: '' }]);
  };

  const removeComponent = (index) => {
    setComponents(components.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { ...formDetails, components };
    navigate('/Dynamictable', { state: { formData } }); // Navigate to DynamicTable with formData
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Dynamic Form Setup</Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <TextField
            label="Form Name"
            name="formName"
            value={formDetails.formName}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            label="Form Description"
            name="formDescription"
            value={formDetails.formDescription}
            onChange={handleFormChange}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Related To</InputLabel>
            <Select
              name="relatedTo"
              value={formDetails.relatedTo}
              onChange={handleFormChange}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="Menu">Menu</MenuItem>
              <MenuItem value="Related to">Related to</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <FormControl fullWidth>
            <InputLabel>Page Event</InputLabel>
            <Select
              name="pageEvent"
              value={formDetails.pageEvent}
              onChange={handleFormChange}
            >
              <MenuItem value="Onclick">Onclick</MenuItem>
              <MenuItem value="Onblur">Onblur</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Button Name"
            name="buttonName"
            value={formDetails.buttonName}
            onChange={handleFormChange}
            fullWidth
          />
        </Box>
        <Typography variant="h6" gutterBottom>Component Details</Typography>
        {components.map((component, index) => (
          <Box key={index} sx={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
            <TextField
              label="Label"
              value={component.label}
              onChange={(e) => handleComponentChange(index, 'label', e.target.value)}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={component.type}
                onChange={(e) => handleComponentChange(index, 'type', e.target.value)}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="textfield">TextField</MenuItem>
                <MenuItem value="checkbox">Checkbox</MenuItem>
                <MenuItem value="select">Select</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Mapping"
              value={component.mapping}
              onChange={(e) => handleComponentChange(index, 'mapping', e.target.value)}
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={component.readonly}
                  onChange={(e) => handleComponentChange(index, 'readonly', e.target.checked)}
                />
              }
              label="Readonly"
            />
            <TextField
              label="Enter Values"
              value={component.values}
              onChange={(e) => handleComponentChange(index, 'values', e.target.value)}
              fullWidth
            />
            <IconButton onClick={() => removeComponent(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button onClick={addComponent} variant="contained" sx={{ marginBottom: '20px' }}>Add Component</Button>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    </Box>
  );
}

export default DynamicForm;
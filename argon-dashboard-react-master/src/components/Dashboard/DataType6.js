import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Dashboard/CommonStyle.css";

function DataType6() {
  const [firstName, setFirstName] = useState('');
  const [additionalEntries, setAdditionalEntries] = useState([]);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleAddFields = () => {
    setAdditionalEntries([...additionalEntries, { name: '', description: '' }]);
  };

  const handleNameChange = (index, e) => {
    const updatedEntries = [...additionalEntries];
    updatedEntries[index].name = e.target.value;
    setAdditionalEntries(updatedEntries);
  };

  const handleDescriptionChange = (index, e) => {
    const updatedEntries = [...additionalEntries];
    updatedEntries[index].description = e.target.value;
    setAdditionalEntries(updatedEntries);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      Name: firstName,
      test2: additionalEntries
    };
    console.log(JSON.stringify(formData));  
  };

  return (

      <div className="container mt-4" style={{ width: '50%' }}>
         <div className='card p-4 shadow-sm rounded'>
         <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first-name" className="form-label">Name:</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              className="form-control"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <h2 className="title_main mt-3 text-primary">Test 2</h2>
          {additionalEntries.map((entry, index) => (
            <div className="form_content" key={index}>
              <div className="form-group">
                <label htmlFor={`additional-name-${index}`} className="form-label">Name:</label>
                <input
                  type="text"
                  id={`additional-name-${index}`}
                  name={`additional-name-${index}`}
                  className="form-control"
                  value={entry.name}
                  onChange={(e) => handleNameChange(index, e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`additional-description-${index}`} className="form-label">Description:</label>
                <textarea
                  id={`additional-description-${index}`}
                  name={`additional-description-${index}`}
                  className="form-control"
                  rows="4"
                  value={entry.description}
                  onChange={(e) => handleDescriptionChange(index, e)}
                ></textarea>
              </div>
            </div>
          ))}
          <div className="btn-group mt-3">
            <button type="submit" className="btn btn-primary me-3">Submit</button>
            <button type="button" className="btn btn-primary" onClick={handleAddFields}>Add Test2</button>
          </div>
        </form>
         </div>
        
      </div>
    
  );
}

export default DataType6;

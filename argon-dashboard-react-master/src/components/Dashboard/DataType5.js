import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Dashboard/CommonStyle.css";

function DataType5() {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [description, setDescription] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleSecondNameChange = (e) => {
    setSecondName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      Name: firstName,
      test2 : {Name: secondName, description: description }
    };
    console.log(JSON.stringify(formData));  
  };

  return (
    <div className="container mt-4" style={{ width: '50%' }}>
     <div className='card p-4 shadow-sm rounded'>
     <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first-name" className="form-label"> Name:</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            className="form-control"
            value={firstName}
            onChange={handleFirstNameChange}
            placeholder="Enter your first name"
          />
        </div>
        <h2 className=" title_main mt-3 text-primary" >Test 2</h2>
        <div className="form_content">
        <div className="form-group">
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
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            rows="4"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Describe yourself"
          ></textarea>
        </div>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
     </div>
      
    </div>
  );
}

export default DataType5;

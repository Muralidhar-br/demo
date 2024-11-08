import React from 'react';
import '../Dashboard/CSS/CSS/SetupView.css'; // Assuming you have a CSS file for styling

function SetupView({ 
  onUserMaintenance, onMenuAccessControl, onUserGroupMaintenance, onSystemParameter, 
  onMenuMaintenance, onAccessType, onAPIregistry, onTokenregistry, onDataType1, 
  onDataType2, onDataType3, onDataType4, onDataType5, onDataType6, onDynamicTable, 
  oncodeExtension 
}) {
  return (
    <div className="usercards-container">
      <div className="usercards">
        <div className="usercard" onClick={onUserMaintenance}>
          <i className="fa fa-user-cog card-icon"></i>
          <h3>User Maintenance</h3>
          <p>Content for Card 1</p>
        </div>
        <div className="usercard" onClick={onMenuAccessControl}>
          <i className="fa-solid fa-lock"></i>
          <h3>Menu Access Control</h3>
          <p>Content for Card 2</p>
        </div>
        <div className="usercard" onClick={onUserGroupMaintenance}>
          <i className="fa-solid fa-users"></i>
          <h3>User Group Maintenance</h3>
          <p>Content for Card 3</p>
        </div>
        <div className="usercard" onClick={onSystemParameter}>
          <i className="fa-solid fa-gears"></i>
          <h3>System Parameter</h3>
          <p>Content for Card 4</p>
        </div>
        <div className="usercard" onClick={onMenuMaintenance}>
          <i className="fa-solid fa-utensils"></i>
          <h3>Menu Maintenance</h3>
          <p>Content for Card 5</p>
        </div>
        <div className="usercard" onClick={onAccessType}>
          <i className="fa-solid fa-key"></i>
          <h3>Access Type</h3>
          <p>Content for Card 6</p>
        </div>
        <div className="usercard" onClick={onAPIregistry}>
          <i className="fas fa-database"></i>
          <h3>API Registry</h3>
          <p>Content for Card 7</p>
        </div>
        <div className="usercard" onClick={onTokenregistry}>
          <i className="fas fa-key"></i>
          <h3>Token Registry</h3>
          <p>Content for Card 8</p>
        </div>
        <div className="usercard" onClick={onDataType1}>
          <i className="fa fa-file"></i>
          <h3>DATATYPE1</h3>
          <p>Content for Card 9</p>
        </div>
        <div className="usercard" onClick={onDataType2}>
          <i className="fa fa-file"></i>
          <h3>DATATYPE2</h3>
          <p>Content for Card 10</p>
        </div>
        <div className="usercard" onClick={onDataType3}>
          <i className="fa fa-file"></i>
          <h3>DATATYPE3</h3>
          <p>Content for Card 11</p>
        </div>
        <div className="usercard" onClick={onDataType4}>
          <i className="fa fa-file"></i>
          <h3>DATATYPE4</h3>
          <p>Content for Card 12</p>
        </div>
        <div className="usercard" onClick={onDataType5}>
          <i className="fa fa-file"></i>
          <h3>DATATYPE5</h3>
          <p>Content for Card 13</p>
        </div>
        <div className="usercard" onClick={onDataType6}>
          <i className="fa fa-file"></i>
          <h3>DATATYPE6</h3>
          <p>Content for Card 14</p>
        </div>
        <div className="usercard" onClick={onDynamicTable}>
          <i className="fa fa-file"></i>
          <h3>Dynamic Table</h3>
          <p>Content for Card 15</p>
        </div>
        <div className="usercard" onClick={oncodeExtension}>
          <i className="fa fa-file"></i>
          <h3>Code Extension</h3>
          <p>Content for Card 16</p>
        </div>
      </div>
    </div>
  );
}

export default SetupView;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function DataType3() {
    // State for the menu items and the selected menu item
    const [menuItems, setMenuItems] = useState([]);
    const [selectedMenuItem, setSelectedMenuItem] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:9292/fndMenu/menuloadbyuser', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzeXNhZG1pbiIsInNjb3BlcyI6IlJPTEVfRGV2ZWxvcGVyLFJPTEVfQURNSU4iLCJpYXQiOjE3MTYzNDkyNTEsImV4cCI6MTcxODk0MTI1MX0.fLW0-Uvb6X1fLQNzdiNiYeHO3lMYa1bsFAmOJkGCdRY'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setMenuItems(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSelectionChange = (event) => {
        setSelectedMenuItem(event.target.value);
    };

    // if (loading) return <div className="d-flex justify-content-center"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <div>
            <h5>Select a Menu Item</h5>
            <select value={selectedMenuItem} onChange={handleSelectionChange}>
                <option value="">Select an Option</option>
                {menuItems.map((item) => (
                    <option key={item.menuItemId.menuItemId} value={item.menuItemId.menuItemId}>
                        {item.menuItemDesc}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default DataType3;

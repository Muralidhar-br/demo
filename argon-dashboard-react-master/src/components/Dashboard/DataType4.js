// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function DataType4() {
//     const [paymentData, setPaymentData] = useState({
//         cardNumber: '',
//         cardHolder: '',
//         expiryDate: '',
//         cvv: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setPaymentData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         alert("Form submitted successfully!");
//         console.log("Form Data:", paymentData);
//     };

//     return (
//         <div className="container mt-3">
//             <h2>Payment Details</h2>
//             <form onSubmit={handleSubmit} className="row g-3">
//                 <div className="col-md-6">
//                     <label htmlFor="cardNumber" className="form-label">Card Number</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="cardNumber"
//                         name="cardNumber"
//                         value={paymentData.cardNumber}
//                         onChange={handleChange}
//                         pattern="\d{16}"
//                         title="Card number must be 16 digits"
//                         style={{ borderColor: "#343a40" }}
//                         required
//                     />
//                 </div>
//                 <div className="col-md-6">
//                     <label htmlFor="cardHolder" className="form-label">Card Holder's Name</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="cardHolder"
//                         name="cardHolder"
//                         value={paymentData.cardHolder}
//                         onChange={handleChange}
//                         style={{ borderColor: "#343a40" }}
//                         required
//                     />
//                 </div>
//                 <div className="col-md-6">
//                     <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
//                     <input
//                         type="month"
//                         className="form-control"
//                         id="expiryDate"
//                         name="expiryDate"
//                         value={paymentData.expiryDate}
//                         style={{ borderColor: "#343a40" }}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="col-md-6">
//                     <label htmlFor="cvv" className="form-label">CVV</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="cvv"
//                         name="cvv"
//                         value={paymentData.cvv}
//                         onChange={handleChange}
//                         style={{ borderColor: "#343a40" }}
//                         pattern="\d{3}"
//                         title="CVV must be 3 digits"
//                         required
//                     />
//                 </div>
//                 <div className="col-12">
//                     <button type="submit" size="sm" className="btn btn-primary">Submit Payment</button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default DataType4;

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCreditCard, FaUser, FaLock } from 'react-icons/fa';  // Import specific icons
import "../Dashboard/CommonStyle.css";
function DataType4() {
    const [paymentData, setPaymentData] = useState({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Form submitted successfully!");
        console.log("Form Data:", paymentData);
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-sm rounded">
                <h2 className=" payment_details text-center mb-4 text-primary">Payment Details</h2>
                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="cardNumber" className="form-label">Card Number</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaCreditCard /></span>
                            <input
                                type="text"
                                className="form-control"
                                id="cardNumber"
                                name="cardNumber"
                                value={paymentData.cardNumber}
                                onChange={handleChange}
                                placeholder="1234 5678 9123 4567"
                                pattern="\d{16}"
                                title="Card number must be 16 digits"
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="cardHolder" className="form-label">Card Holder's Name</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaUser /></span>
                            <input
                                type="text"
                                className="form-control"
                                id="cardHolder"
                                name="cardHolder"
                                value={paymentData.cardHolder}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                        <input
                            type="month"
                            className="form-control"
                            id="expiryDate"
                            name="expiryDate"
                            value={paymentData.expiryDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="cvv" className="form-label">CVV</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaLock /></span>
                            <input
                                type="text"
                                className="form-control"
                                id="cvv"
                                name="cvv"
                                value={paymentData.cvv}
                                onChange={handleChange}
                                placeholder="***"
                                pattern="\d{3}"
                                title="CVV must be 3 digits"
                                required
                            />
                        </div>
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-primary btn-lg">Submit Payment</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DataType4;



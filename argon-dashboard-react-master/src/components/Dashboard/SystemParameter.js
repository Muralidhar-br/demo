// import React, { useState } from "react";
// import { Button, Form, Container, Row, Col } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// const SystemParameterForm = () => {
//   const [formData, setFormData] = useState({
//     schedulerTimer: "",
//     leaseTaxCode: "",
//     vesselConfirmationProcessLimit: "",

//     rowToDisplay: "",
//     linkToDisplay: "",
//     rowToAdd: "",
//     lovRowToDisplay: "",
//     lovLinkToDisplay: "",
//     oldServerName: "",
//     oldBase: "",
//     oldAdminUser: "",
//     oldServerPort: "",
//     userDefaultGroup: "",
//     defaultDepartment: "",
//     defaultPosition: "",
//     singleCharge: "",
//     firstDayOfWeek: "",
//     hourPerShift: "",
//     cnBillingFrequency: "",
//     billingDepartmentCode: "",
//     basePriceList: "",
//     nonContainerServiceOrderAutoApprovalDeptCode: "",
//     ediMAESchedulerOnOff: "",
//     ediSchedulerOnOff: "",
//     logo: null,
//     companyDisplayName: "",
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (event) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       logo: event.target.files[0],
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     alert("Form submitted successfully!");
//     console.log("Form Data:", formData);
//   };

//   const handleClear = () => {
//     setFormData({
//       schedulerTimer: "",
//       leaseTaxCode: "",
//       vesselConfirmationProcessLimit: "",

//       rowToDisplay: "",
//       linkToDisplay: "",
//       rowToAdd: "",
//       lovRowToDisplay: "",
//       lovLinkToDisplay: "",
//       oldServerName: "",
//       oldBase: "",
//       oldAdminUser: "",
//       oldServerPort: "",
//       userDefaultGroup: "",
//       defaultDepartment: "",
//       defaultPosition: "",
//       singleCharge: "",
//       firstDayOfWeek: "",
//       hourPerShift: "",
//       cnBillingFrequency: "",
//       billingDepartmentCode: "",
//       basePriceList: "",
//       nonContainerServiceOrderAutoApprovalDeptCode: "",
//       ediMAESchedulerOnOff: "",
//       ediSchedulerOnOff: "",
//       logo: null,
//       companyDisplayName: "",
//     });
//   };

//   return (
//     <Container className="mt-5">
//       <Form onSubmit={handleSubmit}>
//         <Row className="mb-3">
//           <Col xs={6}>
//             <h5>Setup Code</h5>
//           </Col>
//           <Col xs={6}>
//             <h5>Value</h5>
//           </Col>
//         </Row>
//         {Object.keys(formData).map((key, index) =>
//           key !== "logo" ? (
//             <Row className="mb-3" key={index}>
//               <Col xs={6}>
//                 <Form.Label>
//                   {key
//                     .split(/(?=[A-Z])/)
//                     .join(" ")
//                     .replace(/\b\w/g, (l) => l.toUpperCase())}
//                 </Form.Label>
//               </Col>
//               <Col xs={6}>
//                 <Form.Control
//                    style={{ borderColor: '#343a40' }}
//                   type="text"
//                   name={key}
//                   value={formData[key]}
//                   onChange={handleInputChange}
//                 />
//               </Col>
//             </Row>
//           ) : (
//             <Row className="mb-3" key={index}>
//               <Col xs={6}>
//                 <Form.Label>Upload Logo</Form.Label>
//               </Col>
//               <Col xs={6}>
//                 <Form.Control style={{ borderColor: '#343a40' }} type="file" onChange={handleFileChange} />
//               </Col>
//             </Row>
//           )
//         )}
//         <div className="d-flex justify-content-end">
//           <Button variant="secondary" type="submit" className="me-2">
//             Save
//           </Button>
//           <Button variant="secondary" onClick={handleClear}>
//             Clear
//           </Button>
//         </div>
//       </Form>
//     </Container>
//   );
// };

// export default SystemParameterForm;


import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CommonStyle.css";

const SystemParameterForm = () => {
  const [formData, setFormData] = useState({
    schedulerTimer: "",
    leaseTaxCode: "",
    vesselConfirmationProcessLimit: "",

    rowToDisplay: "",
    linkToDisplay: "",
    rowToAdd: "",
    lovRowToDisplay: "",
    lovLinkToDisplay: "",
    oldServerName: "",
    oldBase: "",
    oldAdminUser: "",
    oldServerPort: "",
    userDefaultGroup: "",
    defaultDepartment: "",
    defaultPosition: "",
    singleCharge: "",
    firstDayOfWeek: "",
    hourPerShift: "",
    cnBillingFrequency: "",
    billingDepartmentCode: "",
    basePriceList: "",
    nonContainerServiceOrderAutoApprovalDeptCode: "",
    ediMAESchedulerOnOff: "",
    ediSchedulerOnOff: "",
    logo: null,
    companyDisplayName: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      logo: event.target.files[0],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Form submitted successfully!");
    console.log("Form Data:", formData);
  };

  const handleClear = () => {
    setFormData({
      schedulerTimer: "",
      leaseTaxCode: "",
      vesselConfirmationProcessLimit: "",

      rowToDisplay: "",
      linkToDisplay: "",
      rowToAdd: "",
      lovRowToDisplay: "",
      lovLinkToDisplay: "",
      oldServerName: "",
      oldBase: "",
      oldAdminUser: "",
      oldServerPort: "",
      userDefaultGroup: "",
      defaultDepartment: "",
      defaultPosition: "",
      singleCharge: "",
      firstDayOfWeek: "",
      hourPerShift: "",
      cnBillingFrequency: "",
      billingDepartmentCode: "",
      basePriceList: "",
      nonContainerServiceOrderAutoApprovalDeptCode: "",
      ediMAESchedulerOnOff: "",
      ediSchedulerOnOff: "",
      logo: null,
      companyDisplayName: "",
    });
  };

  return (
    <Container className="mt-5 p-4 bg-light shadow-sm rounded">
      <h3 className="title_main text-center text-primary mb-4">System Parameter Settings</h3>
      <Form onSubmit={handleSubmit}>
        <Row className="  mb-3">
          <Col xs={6}>
            <h6 className="heading_main text-secondary">Setup Code</h6>
          </Col>
          <Col xs={6}>
            <h6 className="heading_main text-secondary">Value</h6>
          </Col>
        </Row>

        {Object.keys(formData).map((key, index) =>
          key !== "logo" ? (
            <Row className="mb-3" key={index}>
              <Col xs={6} className="d-flex align-items-center">
                <Form.Label className="mb-0">
                  {key
                    .split(/(?=[A-Z])/)
                    .join(" ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </Form.Label>
              </Col>
              <Col xs={6}>
                <Form.Control
                  className="p-2"
                  style={{ borderColor: "#ced4da" }}
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
          ) : (
            <Row className="mb-3" key={index}>
              <Col xs={6} className="d-flex align-items-center">
                <Form.Label className="mb-0">Upload Logo</Form.Label>
              </Col>
              <Col xs={6}>
                <Form.Control
                  className="p-2 "
                  style={{ borderColor: "#ced4da" }}
                  type="file"
                  onChange={handleFileChange}
                />
              </Col>
            </Row>
          )
        )}

        <div className="d-flex justify-content-end mt-4">
          <Button
            variant="primary"
            type="submit"
            className="me-2 px-4 py-2"
          >
            Save
          </Button>
          <Button
            variant="outline-primary"
            onClick={handleClear}
            className="px-4 py-2"
          >
            Clear
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default SystemParameterForm;

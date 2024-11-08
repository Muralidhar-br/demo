import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReCAPTCHA from "react-google-recaptcha";
import Select from "react-select";
import { Button ,InputGroup,FormControl} from "react-bootstrap";
import {  FaUser, FaLock ,FaEnvelope,FaPhone} from 'react-icons/fa'; 

function DataType1() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    date: "",
    datetime: "",
    number: "",
    decimal: "",
    url: "",
    selectOption: "",
    multiSelectOption: [],
    percentage: "",
    textarea: "",
    radioOption: "",
    toggleSwitch: false,
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const onCaptchaChange = (value) => {
    console.log("Captcha value:", value);
    setCaptchaVerified(true);
  };

  const handleMultiSelectChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      multiSelectOption: selectedOptions,
    }));
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [id]: checked,
      }));
    } else if (type === "radio") {
      setFormData((prev) => ({
        ...prev,
        radioOption: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert("Please verify that you are not a robot.");
      return;
    }
    let missingFields = [];
    Object.entries(formData).forEach(([key, value]) => {
      if (
        !value &&
        key !== "radioOption" &&
        key !== "toggleSwitch" &&
        key !== "acceptTerms"
      ) {
        missingFields.push(
          key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")
        );
      }
    });
    if (missingFields.length > 0) {
      alert(
        `Please fill out the following fields: ${missingFields.join(", ")}`
      );
    } else {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm rounded">
        <h2 className="title_main text-center text-primary mb-4">Form</h2>
        <div className="row justify-content-center">
          <div className=" form_body col-12 col-lg-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label
                  htmlFor="username"
                  className="col-12 col-sm-4 col-form-label"
                >
                  Username
                </label>
                <div className="col-12 col-sm-8">
                  <InputGroup>
                    <InputGroup.Text>
                      <FaUser />
                    </InputGroup.Text>
                    <FormControl
                      type="text"
                      className="form-control"
                      id="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Enter your Username"
                      required
                      style={{ borderColor: "#343a40" }}
                    />
                  </InputGroup>
                </div>
              </div>

             < div className="mb-3 row">
                <label htmlFor="email" className="col-12 col-sm-4 col-form-label">
                  Email
                </label>
                <div className="col-12 col-sm-8">
                  <InputGroup>
                    <InputGroup.Text>
                      <FaEnvelope />
                    </InputGroup.Text>
                    <FormControl
                      type="email"
                      className="form-control"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your Email"
                      required
                      style={{ borderColor: "#343a40" }}
                    />
                  </InputGroup>
                </div>
              </div>

             {/* Password with Icon and Toggle */}
             <div className="mb-3 row">
                <label
                  htmlFor="password"
                  className="col-12 col-sm-4 col-form-label"
                >
                  Password
                </label>
                <div className="col-12 col-sm-8">
                  <InputGroup>
                    <InputGroup.Text>
                      <FaLock />
                    </InputGroup.Text>
                    <FormControl
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="****************"
                      required
                      style={{ borderColor: "#343a40" }}
                    />
                    <Button
                      variant="outline-primary"
                      size="md"
                      type="button"
                      style={{ borderColor: "#343a40" }}
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputGroup>
                </div>
              </div>
               {/* Phone with Icon */}
               <div className="mb-3 row">
                <label htmlFor="phone" className="col-12 col-sm-4 col-form-label">
                  Phone
                </label>
                <div className="col-12 col-sm-8">
                  <InputGroup>
                    <InputGroup.Text>
                      <FaPhone />
                    </InputGroup.Text>
                    <FormControl
                      type="tel"
                      className="form-control"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      style={{ borderColor: "#343a40" }}
                    />
                  </InputGroup>
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="date"
                  className="col-12 col-sm-4 col-form-label"
                >
                  Date
                </label>
                <div className="col-12 col-sm-8">
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    style={{ borderColor: "#343a40" }}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="datetime"
                  className="col-12 col-sm-4 col-form-label"
                >
                  Date and Time
                </label>
                <div className="col-12 col-sm-8">
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="datetime"
                    value={formData.datetime}
                    onChange={handleInputChange}
                    style={{ borderColor: "#343a40" }}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="number"
                  className="col-12 col-sm-4 col-form-label"
                >
                  Number
                </label>
                <div className="col-12 col-sm-8">
                  <input
                    type="number"
                    className="form-control"
                    id="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    style={{ borderColor: "#343a40" }}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="decimal"
                  className="col-12 col-sm-4 col-form-label"
                >
                  Decimal
                </label>
                <div className="col-12 col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="decimal"
                    value={formData.decimal}
                    onChange={handleInputChange}
                    placeholder="Enter any decimal number"
                    pattern="\d+(\.\d*)?"
                    title="Please enter a valid decimal number."
                    style={{ borderColor: "#343a40" }}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label htmlFor="url" className="col-12 col-sm-4 col-form-label">
                  URL
                </label>
                <div className="col-12 col-sm-8">
                  <input
                    type="url"
                    className="form-control"
                    id="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    placeholder="Enter a URL"
                    style={{ borderColor: "#343a40" }}
                    required
                  />
                </div>
              </div>

              {/* Static Dropdown */}
              <div className="mb-3 row">
                <label
                  htmlFor="selectOption"
                  className="col-12 col-sm-4 col-form-label"
                >
                  Static Dropdown
                </label>
                <div className="col-12 col-sm-8">
                  <select
                    id="selectOption"
                    className="form-control"
                    value={formData.selectOption}
                    onChange={handleInputChange}
                    style={{ borderColor: "#343a40" }}
                  >
                    <option value="">Select an option</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
              </div>

              {/* Multi-Select Dropdown */}
              <div className="mb-3 row">
                <label
                  htmlFor="multiSelectOption"
                  className="col-12 col-sm-4 col-form-label"
                >
                  Multi-Select Dropdown
                </label>

                <div className="col-12 col-sm-8">
                  <Select
                    id="multiSelectOption"
                    isMulti
                    options={[
                      { value: "option1", label: "Option 1" },
                      { value: "option2", label: "Option 2" },
                      { value: "option3", label: "Option 3" },
                    ]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    value={formData.multiSelectOption}
                    onChange={handleMultiSelectChange}
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderColor: "#343a40",
                      }),
                    }}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="percentage"
                  className="col-12 col-sm-4 col-form-label"
                >
                  Percentage
                </label>
                <div className="col-12 col-sm-8">
                  <input
                    type="number"
                    className="form-control"
                    id="percentage"
                    value={formData.percentage}
                    onChange={handleInputChange}
                    placeholder="Enter a percentage"
                    min="0"
                    style={{ borderColor: "#343a40" }}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="textarea"
                  className="col-12 col-sm-4 col-form-label"
                >
                  Textarea
                </label>
                <div className="col-12 col-sm-8">
                  <textarea
                    className="form-control"
                    id="textarea"
                    rows="3"
                    value={formData.textarea}
                    onChange={handleInputChange}
                    placeholder="Enter additional information"
                    style={{ borderColor: "#343a40" }}
                  ></textarea>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-12 col-sm-4 col-form-label">
                  Radio Options
                </label>
                <div className="col-12 col-sm-8">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="radioOption"
                      id="option1"
                      value="Option 1"
                      checked={formData.radioOption === "Option 1"}
                      onChange={handleInputChange}
                      style={{ borderColor: "#343a40" }}
                    />
                    <label className="form-check-label" htmlFor="option1">
                      Option 1
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="radioOption"
                      id="option2"
                      value="Option 2"
                      checked={formData.radioOption === "Option 2"}
                      onChange={handleInputChange}
                      style={{ borderColor: "#343a40" }}
                    />
                    <label className="form-check-label" htmlFor="option2">
                      Option 2
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-3 row">
                <div className="col-12 col-sm-4 col-form-label">
                  Toggle Switch
                </div>
                <div className="col-12 col-sm-8">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="toggleSwitch"
                      checked={formData.toggleSwitch}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="toggleSwitch">
                      {formData.toggleSwitch
                        ? "Disable Option"
                        : "Enable Option"}
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-3 row">
                <div className="col-12 col-sm-4 col-form-label">Checkbox</div>
                <div className="col-12 col-sm-8">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="acceptTerms">
                      I accept the terms and conditions
                    </label>
                  </div>
                </div>
              </div>

              <ReCAPTCHA
                sitekey="6LdzvMwpAAAAAHt6h_aZ6dPpT_qp0K3OjNWsY1A9"
                onChange={onCaptchaChange}
              />

              <div className="mt-4">
                <Button variant="primary" size="md" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataType1;

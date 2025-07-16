import React, { useState } from "react";
import "../App.css";

export default function Form() {
  const [formData, setFormData] = useState({
    firstName: "John",     
    lastName: "Doe",        
    email: "john.doe@example.com", 
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
    console.log("Submitted:", formData);
  };

  return (
    <div className="form-container">
      <h2>
        Once accessed with log in provided, there are fields already filled by default and non editable:<br />
        <span className="mandatory-note">* are mandatory fields</span>
      </h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} readOnly />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} readOnly />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} readOnly />
        </label>
        <label>
          Password: <span className="required">*</span>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <label>
          Confirm Password: <span className="required">*</span>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </label>
        <label>
          Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>
        <label>
          City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </label>
        <label>
          State:
          <input type="text" name="state" value={formData.state} onChange={handleChange} />
        </label>
        <label>
          Zip Code:
          <input type="text" name="zip" value={formData.zip} onChange={handleChange} />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

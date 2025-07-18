import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { getToken } from "../auth";

export default function Form({ onSubmit }) {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    companyName: "",
    fullName: "",
    timeInCompany: "",
    department: "",
    position: "",
    timeInPositionMonth: "",
    timeInPositionYear:"",
    subordinates: "",
    birthYear: "",
    educationLevel: "",
    children: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();



//    const param = {
//         fields: {Status: 'Active'}
//         }  
  
  
    // const endpoint = `https://api.airtable.com/v0/apprbTATge0ug6jk3/tbliz0F42HaYf3X7n/ param`; 
  
    // try {
    //   const response = await fetch(endpoint, {
    //     method: "PATCH",
    //     headers: {
    //       Authorization: `Bearer patsk91KQpyv7XFYJ.4ebc8f620e3d60c96b0d874ee9dd0f5ca39dc3e1a9618c271a12cf494d31d340`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData), 
    //   });
    //   console.log("response",response)
  
    //   if (!response.ok) {
    //     throw new Error(`Failed . Status: ${response.status}`);
    //   }
  
    //   const result = await response.json();
    //   console.log("API Response:", result);
  
      if (onSubmit) onSubmit(formData);
    console.log("onsublimit",onSubmit())
  
      navigate("/assessment");
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    // }
  };
  

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label className="header-label">
            {/* Once accessed with log in provided, there are fields already filled
            by default and non editable:
            <br />
            <span>
              <span className="required">*</span> are mandatory fields
            </span>
            <br /> */}
            {/* Company Name, Project Code (order number) and other proprietary data{" "}
            <br />
            <br /> */}
            Thank you for participating in this Corporate Dynamic Profiler 
            Assessment. <br/> <br/> Please confirm your full name (edit if necessary)
          </label>

          <div className="form-row">
            <label>
              <div style={{ flexDirection: "row" }}>
                Company: <span className="required">*</span>
              </div>
              <input
                type="text"
                style={{background:'#f0efef'}}
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                readOnly
              />
            </label>

            <label>
              <div style={{ flexDirection: "row" }}>
                Year Joined: <span className="required">*</span>
              </div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="form-row">
            {/* <label>
              <div style={{ flexDirection: "row" }}>
                Time in the company: <span className="required">*</span>
              </div>
              <input
                type="text"
                name="timeInCompany"
                value={formData.timeInCompany}
                onChange={handleChange}
                required
              />
            </label> */}

            <label>
              <div style={{ flexDirection: "row" }}>
                Department Name: <span className="required">*</span>
              </div>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Department --</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </label>

            <label>
              <div style={{ flexDirection: "row" }}>
                Current Position: <span className="required">*</span>
              </div>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Position --</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </label>

          </div>

          <div className="form-row" >
            {/* <label>
              <div style={{ flexDirection: "row" }}>
                Position: <span className="required">*</span>
              </div>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Position --</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </label> */}

            <label style={{width:'20px'}}>
              <div style={{ flexDirection: "row" }}>
                Time in the position: <span className="required">*</span>
              </div>
              <div style={{display:'flex', flexDirection:'row'}}>
              <select
                name="timeInPositionMonth"
                value={formData.timeInPositionMonth}
                onChange={handleChange}
                style={{width:'100px'}}
                required
              >
                <option value="">-- Month--</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>

              <select
                name="timeInPositionYear"
                value={formData.timeInPositionYear}
                onChange={handleChange}
                style={{width:'100px', marginLeft:'10px'}}
                required
              >
                <option value="">-- Year --</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
              </div>
            </label>


            <label>
              <div style={{ flexDirection: "row" }}>
                Number of direct subordinates:{" "}
                <span className="required">*</span>
              </div>
              <select
                name="subordinates"
                value={formData.subordinates}
                onChange={handleChange}
              >
                <option value="">-- Select Number --</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            {/* <label>
              <div style={{ flexDirection: "row" }}>
                Number of direct subordinates:{" "}
                <span className="required">*</span>
              </div>
              <select
                name="subordinates"
                value={formData.subordinates}
                onChange={handleChange}
              >
                <option value="">-- Select Number --</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </label> */}

            <label>
              <div style={{ flexDirection: "row" }}>
                Birth year: <span className="required">*</span>
              </div>
              <select
                name="birthYear"
                value={formData.birthYear}
                onChange={handleChange}
              >
                <option value="">-- Select Birth Year --</option>
                <option value="option1">option1</option>
                <option value="option2">option2</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>Optional with our gratitude:</label>
          </div>
          <div className="form-row">
            <label>
              Education level:
              <select
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
              >
                <option value="">-- Select Education Level --</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </label>

            <label>
              Number of Children:
              <input
                type="text"
                name="children"
                value={formData.children}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="btn-submit">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

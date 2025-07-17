import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Assessment from "./Assessment";



export default function Form({ onSubmit }) {

    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        onSubmit();
        navigate('/assessment');
        
    }


  return (
    <div className="form-container">
      <form>
        <label>
          Company Name: <span className="required">*</span>
          <input type="text" name="companyName" readOnly />
        </label>

        <label style={{ marginBottom: "5px" }}>
          Thank you for participating in this Corporate Dynamic Profiler
          Assessment. Please confirm your full name (edit if necessary)
        </label>

        <label>
          Company: <span className="required">*</span>
          <input type="text" name="fullName" required />
        </label>

        <label>
          Time in the company: <span className="required">*</span>
          <input type="text" name="fullName" required />
        </label>

        <label>
          Department Name: <span className="required">*</span>
          <select name="department" required>
            <option value="">-- Select Department --</option>
            <option value="">option 1</option>
            <option value="">option 2</option>
            <option value="">option3</option>
    
          </select>
        </label>


        <label>
          Position: <span className="required">*</span>
          <select name="position" required>
            <option value="">-- Select Position --</option>
            <option value="">option 1</option>
            <option value="">option 2</option>
            <option value="">option3</option>
          </select>
        </label>

  
        <label>
          Time in the Position: <span className="required">*</span>
          <select name="timeInPosition" required>
            <option value="">-- Select Time in Position --</option>
            <option value="">option 1</option>
            <option value="">option 2</option>
            <option value="">option3</option>
          </select>
        </label>

        <label>
          <label style={{ marginBottom: "0px" }}>Optional with our gratitude:</label>
          Number of direct subordinates: <span className="required">*</span>
          <select name="" className="input" required>
            <option value="">-- Select Number of direct subordinates --</option>
            <option value="Option1">Option 1</option>
            <option value="Option2">Option 2</option>
          </select>
        </label>

        <label>
          <label style={{ marginBottom: "0px" }}>Optional with our gratitude:</label>
          Birth year: <span className="required">*</span>
          <select name="" className="input" required>
            <option value="">-- Select Birth year --</option>
            <option value="Option1">Option 1</option>
            <option value="Option2">Option 2</option>
          </select>
        </label>

        <label>
          <label style={{ marginBottom: "0px" }}>Optional with our gratitude:</label>
          Education level: <span className="required">*</span>
          <select name="EducationLever" className="input" required>
            <option value="">-- Select Education Level --</option>
            <option value="Option1">Option 1</option>
            <option value="Option2">Option 2</option>
          </select>
        </label>

        <label>
          Number of Children:
          <input type="text" name="children" />
        </label>
        <div className="btn-submit">
         <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  );
}

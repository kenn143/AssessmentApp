import React, { useState ,useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { getToken,saveToken } from "../auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function Form({ onSubmit }) {
  const navigate = useNavigate();
  const id = getToken()?.UserId;
  const [companyId,setCompanyId] = useState("");
  const [statementId,SetStatementId] = useState("");


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
    children: "",
    yearJoined:""
  });
  const [departments, setDepartments] = useState([]);
  const [positions,setPositions] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [educational, setEducational] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  const record = getToken()?.recordId;
    try {
      const param = {
        fields: { 
          "FullName": formData.fullName,  
          "Position": formData.position,
          "Department": formData.department,
          "YearsJoined": Number(formData.yearJoined) || 0, 
          "TimeInThePosition": `${formData.timeInPositionMonth} month ${formData.timeInPositionYear} year`,
          "NumberOfDirectSub": Number(formData.subordinates) || 0,
          "BirthYear": Number(formData.birthYear) || 0,
          "NumberOfChildren": Number(formData.children) || 0,
          "EducationalLevel": formData.educationLevel
        }
      };
      
      const endpoint = `https://api.airtable.com/v0/apprbTATge0ug6jk3/tbl3hESo6R8sdUOZF/${id}`;
  
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer patsk91KQpyv7XFYJ.4ebc8f620e3d60c96b0d874ee9dd0f5ca39dc3e1a9618c271a12cf494d31d340`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
      });
  
      if (!response.ok) {
        throw new Error(`Failed. Status: ${response.status}`);
      }
    const data = await response.json();
  const detailUser = data.fields
      const FullName = detailUser['FullName'] || "";

const updatedToken1 = { ...getToken(), FullName };

localStorage.setItem('jwtToken', JSON.stringify(updatedToken1));

saveToken(updatedToken1);
     
      toast.success("Submitted Successfully!");
      const result = await response.json();
  
      const statusParam = {
        fields: {
          "Status": "Active"  
        }
      };
  
      const statusEndpoint = `https://api.airtable.com/v0/apprbTATge0ug6jk3/tbliz0F42HaYf3X7n/${record}`;
      const statusResponse = await fetch(statusEndpoint, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer patsk91KQpyv7XFYJ.4ebc8f620e3d60c96b0d874ee9dd0f5ca39dc3e1a9618c271a12cf494d31d340`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(statusParam),
      });
  
      if (!statusResponse.ok) {
        throw new Error(`Status update failed. Status: ${statusResponse.status}`);
      }
    
      const statusResult = await statusResponse.json();    

        const existingToken = JSON.parse(localStorage.getItem('jwtToken')) || {};

            const updatedToken = {
              ...existingToken,
              StatementId: statementId ,
              status: 'Active'
            };

        localStorage.setItem('jwtToken', JSON.stringify(updatedToken));
     
  
      if (onSubmit) onSubmit(formData);

      window.location.reload();
   

          setTimeout(() => {
           navigate("/assessment");
          }, 9000);
     
  
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
  

  useEffect(() => {
    if (!id) return;
  
    const fetchUser = async () => {
      try {
        const formula = `{id} = "${id}`;
        const url = `https://api.airtable.com/v0/apprbTATge0ug6jk3/tbl3hESo6R8sdUOZF/${id}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: "Bearer patsk91KQpyv7XFYJ.4ebc8f620e3d60c96b0d874ee9dd0f5ca39dc3e1a9618c271a12cf494d31d340",
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
         const user = data.fields;
         const compId = user.CompanyId?.[0] || "";
         const CompanyName = user['Company Name'];
         const StatementId = user['StatementSetId'];
         SetStatementId(user['StatementSetId'])


        //  const existingToken = JSON.parse(localStorage.getItem('jwtToken')) || {};

        //     const updatedToken = {
        //       ...existingToken,
        //       StatementId: StatementId ,
        //       status: 'Active'
        //     };

        // localStorage.setItem('jwtToken', JSON.stringify(updatedToken));

        setFormData((prevData) =>({
            ...prevData,
            companyName:CompanyName,
            fullName: user['FullName']
        }));
         setCompanyId(compId);
        await fetchDepartments(user.CompanyId[0]);
        await fetchPositions(user.CompanyId[0]);
        fetchEducationLevel();

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchUser();
  }, [id]);

  
  const fetchDepartments = async (companyId) => {
    try {
      const url = `https://api.airtable.com/v0/apprbTATge0ug6jk3/tblAVkHO8htk83jpD`;
      const response = await fetch(url, {
        headers: {
          Authorization: "Bearer patsk91KQpyv7XFYJ.4ebc8f620e3d60c96b0d874ee9dd0f5ca39dc3e1a9618c271a12cf494d31d340",
        },
      }); 
      const data = await response.json();
  
      const filteredDepartments = data.records
        .map((rec) => ({
          id: rec.id,
          name: rec.fields["Department Name"] || "Unnamed",
          company: rec.fields["Company"] || [],
          departmentId: rec.fields["DepartmentId"] || 0
        }))
        .filter((dept) => Array.isArray(dept.company) && dept.company.includes(companyId));
      
      setDepartments(filteredDepartments);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchPositions = async (companyId) => {
    try {
      const url = `https://api.airtable.com/v0/apprbTATge0ug6jk3/tblNFU6sqPbkzn1D9`;
      const response = await fetch(url, {
        headers: {
          Authorization: "Bearer patsk91KQpyv7XFYJ.4ebc8f620e3d60c96b0d874ee9dd0f5ca39dc3e1a9618c271a12cf494d31d340",
        },
      });
  
      const data = await response.json();

      const filteredPositions = data.records
        .map((rec) => ({
          id: rec.id,
          name: rec.fields["Position Name"] || "NoName",
          company: rec.fields["CompanyId"] || [],
          positionId: rec.fields["PositionId"] || 0
        }))
        .filter((position) => Array.isArray(position.company) && position.company.includes(companyId));
  
      setPositions(filteredPositions);
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };
  const fetchEducationLevel = async () => {
    try {
      const url = `https://api.airtable.com/v0/apprbTATge0ug6jk3/tbloZqjJ8P2ACwnuS`;
      const response = await fetch(url, {
        headers: {
          Authorization: "Bearer patsk91KQpyv7XFYJ.4ebc8f620e3d60c96b0d874ee9dd0f5ca39dc3e1a9618c271a12cf494d31d340",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      const filteredEducationLevel = data.records.map((rec) => ({
        id: rec.id,
        name: rec.fields["Educational Level"] || "NoName",
        educationalLevelId: rec.fields["Id"] || "NoId",
      }));
  
      setEducational(filteredEducationLevel);
    } catch (error) {
      console.error("Error fetching education levels:", error);
    }
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
                Full Name: <span className="required">*</span>
              </div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </label>


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

            {/* <label>
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
            </label> */}
          </div>

          <div className="form-row">
        <label>
              <div style={{ flexDirection: "row" }}>
                Year Joined: <span className="required">*</span>
              </div>
              <select
                name="yearJoined"
                value={formData.yearJoined}
                onChange={handleChange}
              >
                <option value="">-- Select Year --</option>
                {Array.from(
                  { length: new Date().getFullYear() - 1950 + 1 }, 
                  (_, i) => 1950 + i 
                )
                  .reverse() 
                  .map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
              </select>
            </label>

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
                {departments.map((dept) => (
                  <option key={dept.name} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </label>


            {/* <label>
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
            </label> */}

          </div>

          <div className="form-row" >
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
                <option value="">-- Select position --</option>
                {positions.map((position) => (
                  <option key={position.name} value={position.name}>
                    {position.name}
                  </option>
                ))}
              </select>
            </label>

            {/* <label style={{width:'20px'}}>
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
            </label> */}
            <label style={{ width: '20px' }}>
          <div style={{ flexDirection: "row" }}>
            Time in the position: <span className="required">*</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' ,gap:'7px'}}>

                   <select
                  name="timeInPositionYear"
                  value={formData.timeInPositionYear}
                  onChange={handleChange}
                  style={{ width: '90px', marginLeft: '10px' }}
                  required
                >
                      <option value=""> year(s) </option>
                        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                </select> <div style={{display:'flex',alignItems:'center',fontSize:'16px',marginRight:'10px',marginLeft:'-5px'}}>year(s)</div>
     
            <select
              name="timeInPositionMonth"
              value={formData.timeInPositionMonth}
              onChange={handleChange}
              style={{ width: '90px' }}
              required
            >
                <option value=""> month(s) </option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
            </select>

                <div style={{display:'flex',alignItems:'center',fontSize:'16px',marginLeft:'-5px'}}>month(s)</div>
         
              </div>
        </label>

          </div>

          <div className="form-row">
          <label>
          <div style={{ flexDirection: "row" }}>
            Number of direct subordinates: <span className="required">*</span>
          </div>
          <select
            name="subordinates"
            value={formData.subordinates}
            onChange={handleChange}
            
          >
            <option value="">-- Select Number --</option>
            {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>
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
                {Array.from(
                  { length: new Date().getFullYear() - 1950 + 1 }, 
                  (_, i) => 1950 + i 
                )
                  .reverse() 
                  .map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
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
                {educational.map((edu) => (
          <option key={edu.name} value={edu.name}>
            {edu.name}
          </option>
        ))}
              </select>
            </label>

            <label>
              Number of Children:
              <input
                type="number"
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
      <ToastContainer />
    </div>
  );
}

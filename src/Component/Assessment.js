import React, { useState,useEffect } from "react";
import '../App.css'
import { getToken, removeToken } from '../auth';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import ThankYouPage from "./Thankyou";

const columnScores = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

export default function Assessment() {
  const initialLeftBoxes = Array.from({ length: 25 }, (_, i) => `Box ${i + 1}`);
  const [leftBoxes, setLeftBoxes] = useState([]);
  const [rightBoxes, setRightBoxes] = useState(Array(25).fill(null));
  const [jsonOutput, setJsonOutput] = useState(null);
  const [boxOrigins, setBoxOrigins] = useState({});
  const user = getToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    window.location.reload();
  };

  

  const handleDragStart = (e, index, side) => {
    e.dataTransfer.setData("text/plain", `${side}-${index}`);
  };

  // const handleDropToPyramid = (e, rightIndex) => {
  //   const data = e.dataTransfer.getData("text/plain");
  //   const [side, idx] = data.split("-");
  //   const index = parseInt(idx, 10);
  
  //   if (side === "left") {
  //     const draggedBox = leftBoxes[index];
  //     if (draggedBox && !rightBoxes[rightIndex]) {
  //       const newLeft = [...leftBoxes];
  //       const newRight = [...rightBoxes];
  //       newLeft[index] = null;
  //       newRight[rightIndex] = draggedBox;
  
  //       setLeftBoxes(newLeft);
  //       setRightBoxes(newRight);
  //       setBoxOrigins((prev) => ({ ...prev, [draggedBox]: index }));
  //     }
  //   }
  // };

  const handleDropToPyramid = (e, dropIndex) => {
    const data = e.dataTransfer.getData("text/plain");
    const [side, idx] = data.split("-");
    const sourceIndex = parseInt(idx, 10);
  
    if (side === "left") {
      const draggedBox = leftBoxes[sourceIndex];
  
      if (!draggedBox) return;
  
      const newLeft = [...leftBoxes];
      const newRight = [...rightBoxes];
  

      let targetIndex = dropIndex;
      while (targetIndex < newRight.length && newRight[targetIndex]) {
        targetIndex++;
      }
  
      if (targetIndex < newRight.length) {
        // newLeft[sourceIndex] = null;
        const newLeft = leftBoxes.filter((_, i) => i !== sourceIndex); 
        newRight[targetIndex] = draggedBox;
  
        setLeftBoxes(newLeft);
        setRightBoxes(newRight);
        setBoxOrigins((prev) => ({ ...prev, [draggedBox]: sourceIndex }));
      } else {
        console.warn("No empty slot available on the right.");
      }
    }
  
    if (side === "right") {
      const draggedBox = rightBoxes[sourceIndex];
  
      if (!draggedBox) return;
  
      const newRight = [...rightBoxes];
  
      if (dropIndex === sourceIndex || newRight[dropIndex]) return;
  
      newRight[sourceIndex] = null;
      newRight[dropIndex] = draggedBox;
  
      setRightBoxes(newRight);
    }
  };
  
  

  const handleDropToLeft = (e) => {
    const data = e.dataTransfer.getData("text/plain");
    const [side, idx] = data.split("-");
    const index = parseInt(idx, 10);

    if (side === "right") {
      const draggedBox = rightBoxes[index];
      const newLeft = [...leftBoxes];
      const emptyIndex = newLeft.findIndex((x) => x === null);

      if (draggedBox && emptyIndex !== -1) {
        const newRight = [...rightBoxes];
        newRight[index] = null;
        newLeft[emptyIndex] = draggedBox;
        setRightBoxes(newRight);
        setLeftBoxes(newLeft);
      }
    }
  };

  const allowDrop = (e) => e.preventDefault();

  const rowPattern = [1, 3, 5, 7, 9];
  const createPyramidRows = (boxes) => {
    const rows = [];
    let index = 0;
    for (let count of rowPattern) {
      rows.push(boxes.slice(index, index + count));
      index += count;
    }
    return rows;
  };

  const pyramidRows = createPyramidRows(rightBoxes);

  const getColumnIndex = (rowIndex, boxIndex) => {
    const rowWidth = rowPattern[rowIndex];
    const offset = Math.floor((9 - rowWidth) / 2);
    return offset + boxIndex;
  };

  const generateJSON = async() => {
    const result = [];


    pyramidRows.forEach((row, rowIndex) => {
      row.forEach((box, boxIndex) => {
        if (box) {
          const columnIndex = getColumnIndex(rowIndex, boxIndex);
          const score = columnScores[columnIndex];
          result.push({
            box,
            column: columnIndex + 1,
            score,
          });
        }
      });
    });
    const json = {
      record:result
    }

  const response = await fetch('https://hook.us2.make.com/415jpaj3alwy9nceagf5rg7oprt8s6v6', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    });
    if(response.ok){
      // toast.success("Submitted Successfully!");
      navigate('/Thankyou');
     }else{
      toast.error('Error');
     }

   




    setJsonOutput(json);
  };
  // const handleBoxClick = (index) => {
  //   console.log("index",index)
  //   const box = rightBoxes[index];
  //   if (!box) return;
  
  //   const newRight = [...rightBoxes];
  //   const newLeft = [...leftBoxes];
  
  //   const originalIndex = boxOrigins[box];
  
  //   if (originalIndex !== undefined && newLeft[originalIndex] === null) {
  //     newLeft[originalIndex] = box;
  //     newRight[index] = null;
  
  //     setLeftBoxes(newLeft);
  //     setRightBoxes(newRight);
  //   }
  // };
  // const handleBoxClick = (index) => {
  //   const box = rightBoxes[index];
  //   if (!box) return;
  
  //   const newLeft = [...leftBoxes];
  //   const newRight = [...rightBoxes];
  //   const originalIndex = boxOrigins[box];
  
  //   if (originalIndex !== undefined && newLeft[originalIndex] === null) {
  
  //     newLeft[originalIndex] = box;
  //     newRight[index] = null;
  //   } else {

  //     const emptyIndex = newLeft.findIndex((item) => item === null);
  //     if (emptyIndex !== -1) {
  //       newLeft[emptyIndex] = box;
  //       newRight[index] = null;
  //     } else {
  //       console.warn("No space left in left column to return the box.");
  //       return;
  //     }
  //   }
  
  //   setLeftBoxes(newLeft);
  //   setRightBoxes(newRight);
  // };
  
  const handleBoxClick = (index) => {
    const box = rightBoxes[index];
    if (!box) return;
  
    const newLeft = [...leftBoxes, box]; 
    const newRight = [...rightBoxes];
    newRight[index] = null;
  
    setLeftBoxes(newLeft);
    setRightBoxes(newRight);
  };

  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        const response = await fetch(
          "https://api.airtable.com/v0/apprbTATge0ug6jk3/tbl4Q1XBZEuQtNCTG",
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer patsk91KQpyv7XFYJ.4ebc8f620e3d60c96b0d874ee9dd0f5ca39dc3e1a9618c271a12cf494d31d340",
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!response.ok) throw new Error("Fetch failed");
  
        const data = await response.json();
        console.log("Webhook result:", data);
  
        const record = data.records[0]; 
        const fields = record.fields;
        const boxes = Array.from({ length: 25 }, (_, i) => fields[`Statement${i + 1}`] || null);
  
        setLeftBoxes(boxes);
      } catch (error) {
        console.error("Error fetching boxes:", error);
      }
    };
  
    fetchBoxes();
  }, []);
  

  
  return (
  <div className="container">
  
      <div
        className="column left"
        onDrop={handleDropToLeft}
        onDragOver={allowDrop}
      >
        {leftBoxes.map((box, index) =>
          box ? (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, index, "left")}
              className="draggable-box"
            >
              {box}
            </div>
          ) : (
            <div key={index} className="empty-box" />
          )
        )}
      </div>

      <div className="center-divider"></div>

      <div className="column right" >

      <div
      style={{
        // borderBottom: "5px solid black",
        width: "100%",                 
        display: "flex",
        justifyContent: "flex-end",     
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",      
          alignItems: "flex-end",       
          gap: "5px",
        }}
      >
        {/* <div>{user?.email}</div> */}
        <button
          onClick={handleLogout}
          // style={{
          //   padding: "9px 15px",
          //   backgroundColor: "#f44336",
          //   color: "white",
          //   border: "none",
          //   borderRadius: "4px",
          //   cursor: "pointer",
          //   marginBottom:"23px",
          //   marginTop:"-11px"

          // }}
          className="logout-btn"
        >
          Logout
        </button>
      </div>
    </div>

    
        <div style={{ borderBottom: '2px solid black' }}>
        <div className="pyramid-rows" >
          {pyramidRows.map((row, rowIndex) => {
            const rowWidth = rowPattern[rowIndex];
            const offset = Math.floor((9 - rowWidth) / 2);
            const flatStart = pyramidRows
              .slice(0, rowIndex)
              .reduce((acc, r) => acc + r.length, 0);

            const cells = [];

            for (let i = 0; i < offset; i++) {
              cells.push(<div className="pyramid-box invisible" key={`el${i}`} />);
            }

            for (let i = 0; i < row.length; i++) {
              const flatIndex = flatStart + i;
              const box = row[i];

              cells.push(
                <div
                key={flatIndex}
                onDrop={(e) => handleDropToPyramid(e, flatIndex)}
                onDragOver={allowDrop}
                onClick={() => handleBoxClick(flatIndex)}
                draggable={!!box}
                onDragStart={(e) => handleDragStart(e, flatIndex, "right")}
                className={`pyramid-box ${box ? "filled" : ""}`}
              >
                {box || ""}
              </div>
              );
            }

            for (let i = 0; i < 9 - offset - row.length; i++) {
              cells.push(<div className="pyramid-box invisible" key={`er${i}`} />);
            }

              return (
                <div className="pyramid-grid" key={rowIndex}>
                  {cells}
                </div>
              );
            })}

            <div></div>
        </div>
        
        </div>
        <div className="pyramid-grid score-row ">
                  {columnScores.map((score, i) => (
                    <div key={i} className="score-cell">
                      {score}
                    </div>
                  ))}
            </div>
      <div className="submit">
        <button className="generate-btn" onClick={generateJSON}>
          Submit
        </button>
        </div>

      </div>
      <ToastContainer />
    </div>
  );
};


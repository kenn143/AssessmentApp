import React, { useState,useEffect } from "react";
import '../App.css'

const columnScores = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

export default function Assessment() {
  const initialLeftBoxes = Array.from({ length: 25 }, (_, i) => `Box ${i + 1}`);
  const [leftBoxes, setLeftBoxes] = useState([]);
  const [rightBoxes, setRightBoxes] = useState(Array(25).fill(null));
  const [jsonOutput, setJsonOutput] = useState(null);
  const [boxOrigins, setBoxOrigins] = useState({});

  

  const handleDragStart = (e, index, side) => {
    e.dataTransfer.setData("text/plain", `${side}-${index}`);
  };

  const handleDropToPyramid = (e, rightIndex) => {
    const data = e.dataTransfer.getData("text/plain");
    const [side, idx] = data.split("-");
    const index = parseInt(idx, 10);
  
    if (side === "left") {
      const draggedBox = leftBoxes[index];
      if (draggedBox && !rightBoxes[rightIndex]) {
        const newLeft = [...leftBoxes];
        const newRight = [...rightBoxes];
        newLeft[index] = null;
        newRight[rightIndex] = draggedBox;
  
        setLeftBoxes(newLeft);
        setRightBoxes(newRight);
        setBoxOrigins((prev) => ({ ...prev, [draggedBox]: index }));
      }
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

  const generateJSON = () => {
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
  const handleBoxClick = (index) => {
    const box = rightBoxes[index];
    if (!box) return;
  
    const newLeft = [...leftBoxes];
    const newRight = [...rightBoxes];
    const originalIndex = boxOrigins[box];
  
    if (originalIndex !== undefined && newLeft[originalIndex] === null) {
      // Return to original index
      newLeft[originalIndex] = box;
      newRight[index] = null;
    } else {
      // Or return to first empty slot
      const emptyIndex = newLeft.findIndex((item) => item === null);
      if (emptyIndex !== -1) {
        newLeft[emptyIndex] = box;
        newRight[index] = null;
      } else {
        console.warn("No space left in left column to return the box.");
        return;
      }
    }
  
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

        {jsonOutput && (
          <pre className="json-output">{JSON.stringify(jsonOutput, null, 2)}</pre>
        )}

      </div>
    </div>
  );
};


import React, { useState,useEffect } from "react";
import "./App.css";
import Assessment from "./Component/Assessment";

const columnScores = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

const App = () => {

  return(
  <div>
<Assessment/>
  </div>
  );
};

export default App;

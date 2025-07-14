import React, { useState,useEffect } from "react";
import "./App.css";
import Assessment from "./Component/Assessment";
import LoginPage from "./Component/LoginPage";
import { getToken } from "./auth";

const columnScores = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());

  return isLoggedIn ? (
    <Assessment />
  ) : (
    <LoginPage onLogin={() => setIsLoggedIn(true)} />
  );
};

export default App;

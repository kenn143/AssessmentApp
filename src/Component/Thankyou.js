import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { getToken ,removeToken} from "../auth"; 

export default function ThankYouPage() {
  const navigate = useNavigate();
  const [isLoggedIn,setIsLoggedIn] = useState(!!getToken());

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }else{
        removeToken();
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="thankyou-container">
      <div className="thankyou-box">
        <div className="checkmark">&#10004;</div>
        <h1>Thank You!</h1>
        <p>Your submission has been submitted successfully. We appreciate your response.</p>
        {/* <button onClick={() => navigate("/")}>Back</button> */}
      </div>
    </div>
  );
}











import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function ThankYouPage() {
  const navigate = useNavigate();

  return (
    <div className="thankyou-container">
      <div className="thankyou-box">
        <div className="checkmark">&#10004;</div>
        <h1>Thank You!</h1>
        <p>Your submission has been submitted successfully. We appreciate your response.</p>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    </div>
  );
}

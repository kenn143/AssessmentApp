import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Component/LoginPage";
import Form from "./Component/Form";
import Assessment from "./Component/Assessment";
import { getToken } from "./auth"; 
import ThankYouPage from "./Component/Thankyou";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
 const [isSubmit, setIsSubmit] = useState(false);
  return (
    <Router>
      <Routes>
        {!isLoggedIn && (
          <Route
            path="*"
            element={<LoginPage onLogin={() => setIsLoggedIn(true)} />}
          />
        )}

        {isLoggedIn && (
          <>
            <Route path="/" element={<Navigate to="/form" />} />
            <Route
              path="/form"
              element={<Form onSubmit={() => setIsFormSubmitted(true)} />}
            />
            <Route
              path="/assessment"
              element={
                isFormSubmitted ? (
                  <Assessment />
                ) : (
                  <Navigate to="/form" replace />
                )
              }
            />
            
          </>
        )}
        <Route path="/Thankyou" element={<ThankYouPage/>} />
      </Routes>
    </Router>
  );
};

export default App;

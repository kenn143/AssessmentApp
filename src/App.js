import { useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import LoginPage from "./Component/LoginPage";
import Form from "./Component/Form";
import Assessment from "./Component/Assessment";
import { getToken } from "./auth";
import ThankYouPage from "./Component/Thankyou";

const App = () => {
  const token = getToken();
  const isLoggedIn = !!token;
  const isActive = token?.status === "Active";

  const isFormSubmitted = useMemo(() => isActive, [isActive]);

  return (
    <Router>
      <Routes>
        {!isLoggedIn && (
          <Route
            path="*"
            element={<LoginPage onLogin={() => window.location.reload()} />}
          />
        )}

        {isLoggedIn && (
          <>
            <Route
              path="/"
              element={
                isActive ? (
                  <Navigate to="/assessment" replace />
                ) : (
                  <Navigate to="/form" replace />
                )
              }
            />

            <Route
              path="/form"
              element={
                isActive ? (
                  <Navigate to="/assessment" replace />
                ) : (
                  <Form
                    onSubmit={() => {
                   
                      window.location.href = "/assessment";
                    }}
                  />
                )
              }
            />
            <Route
              path="/assessment"
              element={
                isActive || isFormSubmitted ? (
                  <Assessment />
                ) : (
                  <Navigate to="/form" replace />
                )
              }
            />
          </>
        )}

        <Route path="/Thankyou" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
};

export default App;

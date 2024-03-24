import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

import HomeComponent from "./pages/HomeComponent";
import Sidebar from "./pages/Sidebar";
import Login from "./pages/Login";
import Analyze from "./pages/Analyze";
import AboutUsPage from "./pages/team";
import Settings from "./pages/settings";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { username, userRole } = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUsername(username);
      setUserRole(userRole);
    }
  }, []); // Empty dependency array to run only once when component mounts

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    setUserRole("admin"); // Assuming user role for demonstration purposes
    // Store user data in localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({ username, userRole: "admin" })
    );
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setUserRole("");
    // Remove user data from localStorage
    localStorage.removeItem("user");
  };

  return (
    <div className="min-h-screen flex bg-black">
      <Router>
        <div className="w-1/12 bg-gray-900">
          <Sidebar
            isLoggedIn={isLoggedIn}
            userRole={userRole}
            onLogout={handleLogout}
          />
        </div>
        <div className="w-11/12">
          <Routes>
            <Route
              exact
              path="/home"
              element={
                isLoggedIn ? <HomeComponent /> : <Navigate to="/login" />
              }
            />
            <Route
              exact
              path="/login"
              element={<Login isLoggedIn={isLoggedIn} onLogin={handleLogin} />}
            />
            <Route
              exact
              path="/analyze"
              element={
                <Analyze isLoggedIn={isLoggedIn} onLogin={handleLogin} />
              }
            />
            <Route exact path="/settings" element={<Settings />} />
            <Route exact path="/team" element={<AboutUsPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;

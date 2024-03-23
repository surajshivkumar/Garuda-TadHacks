import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import HomeComponent from './pages/HomeComponent';
import Sidebar from './pages/Sidebar';
import Login from './pages/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    setUserRole('admin'); // Assuming user role for demonstration purposes
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setUserRole('');
  };

  return (
    <div className="min-h-screen flex">
      <Router>
        <div className="w-1/12 bg-gray-900">
          <Sidebar isLoggedIn={isLoggedIn} userRole={userRole} onLogout={handleLogout} />
        </div>
        <div className="w-11/12">
          <Routes>
            <Route
              exact
              path="/home"
              element={isLoggedIn ? <HomeComponent /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/login"
              element={<Login isLoggedIn={isLoggedIn} onLogin={handleLogin} />}
            />
            {/* Add other routes here */}
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;

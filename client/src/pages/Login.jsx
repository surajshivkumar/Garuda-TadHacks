import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Login = ({ isLoggedIn, onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        // Hardcoded username and password
        const hardcodedUsername = 'admin';
        const hardcodedPassword = '123';
      
        // Check if the entered username and password match the hardcoded values
        if (username === hardcodedUsername && password === hardcodedPassword) {
          // If the credentials match, call the onLogin callback
          onLogin(username, password);
        } else {
          // If the credentials don't match, display an error message or handle it accordingly
          console.log('Invalid username or password');
          // You can also set an error state here to display a message to the user
        }
      };      
  
    if (isLoggedIn) {
      return <Navigate to="/home" />;
    }
  
    return (
        <div className="flex justify-center items-center h-screen">
        <div className="w-1/3 border border-gray-300 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4">Login Page</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Username:</label>
              <input type="text" value={username} onChange={handleUsernameChange} className="border border-gray-300 p-2 rounded-md w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password:</label>
              <input type="password" value={password} onChange={handlePasswordChange} className="border border-gray-300 p-2 rounded-md w-full" />
            </div>
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out">Login</button>
          </form>
        </div>
      </div>
    );
  };
  
export default Login;

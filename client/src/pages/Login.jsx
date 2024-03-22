import React, { useState } from 'react';
// import '../styles/Login.css'; // Import your CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // State variables for email/mobile number and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make API call to authenticate user
      const response = await axios.post('http://localhost:4000/api/user/login', { email, password });
      // Handle successful login (redirect, show success message, etc.)
      console.log(response.data);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      // If response is successful, redirect to the product listing page
      navigate('/')
    } catch (error) {
      // Handle login error (display error message, clear form fields, etc.)
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      {/* Logo */}
      <img src="logo.png" alt="Logo" className="logo" />

      {/* Sign in box */}
      <div className="sign-in-box">
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
          {/* Email or mobile input */}
          <div className="form-group">
            <label htmlFor="email">Enter your email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Password input */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Submit button */}
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

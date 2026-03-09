import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiMail, FiLock } from 'react-icons/fi';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      const response = await fetch("https://art-gallery-backend-2-oemw.onrender.com/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ 
          email: email.trim(), 
          password: password.trim() 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      navigate("/artgallery");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      console.error("Login error:", err);
    }
  };

  const handleSignUp = () => {
    navigate('/signUp');
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-form-wrapper">
      <div className="login-form-backdrop">
        <video autoPlay loop muted playsInline className="background-video">
          <source src="/background4.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="login-form-card">
        <form className="secure-login-form" onSubmit={handleSubmit} autoComplete="off">
          <header className="login-form-header">
            <h1 className="login-form-title">Login</h1>
          </header>
          <div className="form-input-group">
            <FiMail className="input-field-icon" />
            <input
              type="email"
              className="login-form-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-input-group">
            <FiLock className="input-field-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              className="login-form-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={toggleShowPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') toggleShowPassword();
              }}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {error && <div className="login-error-message">{error}</div>}
          <button type="submit" className="login-submit-btn">Login</button>
          <p className="signup-text">
            New User? <span className="signup-link" onClick={handleSignUp}>Create an account</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

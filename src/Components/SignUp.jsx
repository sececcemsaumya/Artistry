import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiMail, FiUser, FiLock } from 'react-icons/fi';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed");
      } else {
        setMessage("Account created! You can now login.");
        setUsername('');
        setEmail('');
        setPassword('');
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handlelogin = () => {
    navigate('/login');
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
        <form className="secure-login-form" onSubmit={handleSignup}>
          <header className="login-form-header">
            <h1 className="login-form-title">Sign Up</h1>
          </header>
          <div className="form-input-group">
            <FiUser className="input-field-icon" />
            <input
              type="text"
              className="login-form-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
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
          {message && <div className="login-success-message">{message}</div>}
          <button type="submit" className="login-submit-btn">Create Account</button>
          <p className="signup-text">
            Already have an account? <span className="signup-link" onClick={handlelogin}>Login here</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

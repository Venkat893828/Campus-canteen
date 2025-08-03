import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    console.log('Attempting registration with:', { username: formData.username, email: formData.email });

    try {
      console.log('Making registration request to:', 'http://localhost:5002/api/auth/register');
      const response = await axios.post('http://localhost:5002/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      console.log('Registration response:', response.data);
      
      // Auto-login after successful registration
      console.log('Attempting auto-login after registration');
      const loginResponse = await axios.post('http://localhost:5002/api/auth/login', {
        email: formData.email,
        password: formData.password
      });
      console.log('Auto-login response:', loginResponse.data);
      
      onRegister(loginResponse.data);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.response?.data?.message || 'Registration failed - check if backend is running');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>✨ Join Our Community</h2>
      {error && <div className="error">⚠️ {error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>👤 Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose a unique username"
            required
          />
        </div>
        
        <div className="form-group">
          <label>📧 Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </div>
        
        <div className="form-group">
          <label>🔒 Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a strong password"
            required
          />
        </div>
        
        <div className="form-group">
          <label>✅ Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              Creating Account...
            </>
          ) : (
            '🎉 Create Account'
          )}
        </button>
      </form>
      
      <p>
        Already have an account?{' '}
        <Link to="/login" className="link-button">
          Sign in here 🔐
        </Link>
      </p>
    </div>
  );
}

export default Register;

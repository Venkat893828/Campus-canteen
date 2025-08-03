import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    
    console.log('Attempting login with:', formData);

    try {
      console.log('Making request to:', 'http://localhost:5002/api/auth/login');
      const response = await axios.post('http://localhost:5002/api/auth/login', formData);
      console.log('Login response:', response.data);
      onLogin(response.data);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed - check if backend is running');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>🔐 Welcome Back</h2>
      {error && <div className="error">⚠️ {error}</div>}
      
      <form onSubmit={handleSubmit}>
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
            placeholder="Enter your password"
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              Signing In...
            </>
          ) : (
            '🚀 Sign In'
          )}
        </button>
      </form>
      
      <p>
        Don't have an account?{' '}
        <Link to="/register" className="link-button">
          Create one here ✨
        </Link>
      </p>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Order from './components/Order';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" replace />;
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="nav-icon">🍽️</span>
            <h1>Campus Canteen</h1>
            <span className="nav-subtitle">University Food Services</span>
          </div>
          
          {currentUser && (
            <div className="nav-menu">
              <div className="nav-user">
                <span className="user-avatar">👤</span>
                <div className="user-info">
                  <span className="user-name">Welcome, {currentUser.username}!</span>
                  <span className="user-role">Student</span>
                </div>
              </div>
              <div className="nav-actions">
                <button className="nav-btn" onClick={handleLogout}>
                  <span className="btn-icon">🚪</span>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      <main>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={
            currentUser ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
          } />
          <Route path="/register" element={
            currentUser ? <Navigate to="/" replace /> : <Register onRegister={handleLogin} />
          } />
          
          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/menu" element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
          <Route path="/order-form" element={
            <ProtectedRoute>
              <Order currentUser={currentUser} />
            </ProtectedRoute>
          } />
          
          {/* Default redirect */}
          <Route path="*" element={
            <Navigate to={currentUser ? "/" : "/login"} replace />
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;

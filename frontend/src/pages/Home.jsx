import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <h1>🍽️ Campus Canteen</h1>
      <p>Welcome to the University Campus Canteen ordering system! Order delicious meals, track your orders, and enjoy a seamless dining experience right from your campus.</p>
      
      <div className="navigation-buttons">
        <Link to="/menu" className="nav-button">
          📋 View Menu
          <span>Explore our delicious menu items</span>
        </Link>
        <Link to="/orders" className="nav-button">
          📦 View Orders
          <span>Track your current and past orders</span>
        </Link>
        <Link to="/order-form" className="nav-button">
          🛒 Place Order
          <span>Order your favorite meals</span>
        </Link>
      </div>

      <div className="campus-features">
        <h3>🏫 Campus Features</h3>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">⏰</div>
            <div className="feature-text">Quick Service</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🎓</div>
            <div className="feature-text">Student Discounts</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🍎</div>
            <div className="feature-text">Healthy Options</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📱</div>
            <div className="feature-text">Mobile Ordering</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🏃</div>
            <div className="feature-text">Fast Pickup</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💳</div>
            <div className="feature-text">Campus Card Payment</div>
          </div>
        </div>
      </div>

      <div className="campus-info">
        <h3>📍 Location & Hours</h3>
        <p><strong>📍 Location:</strong> Main Campus Building, Ground Floor</p>
        <p><strong>🕒 Hours:</strong> Monday - Friday: 8:00 AM - 8:00 PM | Saturday: 9:00 AM - 6:00 PM</p>
        <p><strong>📞 Contact:</strong> Campus Extension: 1234 | Email: canteen@university.edu</p>
      </div>
    </div>
  );
}

export default Home;

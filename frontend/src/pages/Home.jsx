import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>🍽️ Campus Canteen</h1>
        <p className="hero-subtitle">Where Every Bite Tells a Story</p>
        <p className="hero-description">
          Welcome to the University Campus Canteen ordering system! Order delicious meals, 
          track your orders, and enjoy a seamless dining experience right from your campus.
        </p>
      </div>

      <div className="quote-section">
        <div className="quote-card">
          <span className="quote-icon">💭</span>
          <blockquote>
            "Good food is the foundation of genuine happiness."
          </blockquote>
          <cite>- Auguste Escoffier</cite>
        </div>
      </div>
      
      <div className="navigation-buttons">
        <Link to="/menu" className="nav-button">
          <span className="button-icon">📋</span>
          <div className="button-content">
            <span className="button-title">View Menu</span>
            <span className="button-subtitle">Explore our delicious menu items</span>
          </div>
        </Link>
        <Link to="/orders" className="nav-button">
          <span className="button-icon">📦</span>
          <div className="button-content">
            <span className="button-title">View Orders</span>
            <span className="button-subtitle">Track your current and past orders</span>
          </div>
        </Link>
        <Link to="/order-form" className="nav-button">
          <span className="button-icon">🛒</span>
          <div className="button-content">
            <span className="button-title">Place Order</span>
            <span className="button-subtitle">Order your favorite meals</span>
          </div>
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

      <div className="food-quotes-section">
        <h3>🍽️ Food for Thought</h3>
        <div className="quotes-grid">
          <div className="quote-item">
            <span className="quote-text">"Cooking is all about people. Food is maybe the only universal thing."</span>
            <span className="quote-author">- Guy Fieri</span>
          </div>
          <div className="quote-item">
            <span className="quote-text">"The only time to eat diet food is while you're waiting for the steak to cook."</span>
            <span className="quote-author">- Julia Child</span>
          </div>
          <div className="quote-item">
            <span className="quote-text">"Food brings people together on many different levels."</span>
            <span className="quote-author">- Giada De Laurentiis</span>
          </div>
        </div>
      </div>

      <div className="campus-info">
        <h3>📍 Location & Hours</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-icon">📍</span>
            <div className="info-content">
              <strong>Location</strong>
              <span>Main Campus Building, Ground Floor</span>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">🕒</span>
            <div className="info-content">
              <strong>Hours</strong>
              <span>Mon-Fri: 8:00 AM - 8:00 PM<br/>Sat: 9:00 AM - 6:00 PM</span>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">📞</span>
            <div className="info-content">
              <strong>Contact</strong>
              <span>Campus Ext: 1234<br/>Email: canteen@university.edu</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

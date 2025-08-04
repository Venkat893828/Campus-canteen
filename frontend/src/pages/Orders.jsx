import React from 'react';
import { Link } from 'react-router-dom';

function Orders() {
  // Mock orders data with enhanced details
  const orders = [
    {
      id: 1,
      items: ['Veg Burger', 'French Fries', 'Coke'],
      total: 240,
      status: 'completed',
      date: '2024-01-15',
      time: '14:30',
      itemsWithImages: [
        { name: 'Veg Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=60&h=60&fit=crop' },
        { name: 'French Fries', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=60&h=60&fit=crop' },
        { name: 'Coke', image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=60&h=60&fit=crop' }
      ]
    },
    {
      id: 2,
      items: ['Chicken Pizza', 'Ice Cream'],
      total: 260,
      status: 'preparing',
      date: '2024-01-16',
      time: '16:45',
      itemsWithImages: [
        { name: 'Chicken Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=60&h=60&fit=crop' },
        { name: 'Ice Cream', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=60&h=60&fit=crop' }
      ]
    },
    {
      id: 3,
      items: ['Biryani', 'Tea'],
      total: 220,
      status: 'pending',
      date: '2024-01-17',
      time: '12:15',
      itemsWithImages: [
        { name: 'Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=60&h=60&fit=crop' },
        { name: 'Tea', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=60&h=60&fit=crop' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'preparing':
        return 'orange';
      case 'pending':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'preparing':
        return '👨‍🍳';
      case 'pending':
        return '⏳';
      default:
        return '📋';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="orders-container">
        <div className="orders-header">
          <h1>📦 My Orders</h1>
          <p>Track your current and past orders</p>
        </div>
        <div className="no-orders">
          <div className="empty-state">
            <span className="empty-icon">📦</span>
            <h3>No Orders Yet</h3>
            <p>Start your first order and enjoy delicious meals!</p>
            <Link to="/menu" className="browse-menu-btn">Browse Menu</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>📦 My Orders</h1>
        <p>Track your current and past orders</p>
      </div>
      
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-title">
                <h3>Order #{order.id}</h3>
                <span className="order-time">{order.time}</span>
              </div>
              <span className={`status ${getStatusColor(order.status)}`}>
                <span className="status-icon">{getStatusIcon(order.status)}</span>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            
            <div className="order-items">
              <div className="items-grid">
                {order.itemsWithImages.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} className="item-thumbnail" />
                    <span className="item-name">{item.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="order-details">
                <div className="detail-row">
                  <span className="detail-label">📅 Date:</span>
                  <span className="detail-value">{order.date}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">💰 Total:</span>
                  <span className="detail-value total-amount">₹{order.total}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="orders-summary">
        <div className="summary-card">
          <h3>📊 Order Summary</h3>
          <div className="summary-stats">
            <div className="stat">
              <span className="stat-number">{orders.length}</span>
              <span className="stat-label">Total Orders</span>
            </div>
            <div className="stat">
              <span className="stat-number">₹{orders.reduce((sum, order) => sum + order.total, 0)}</span>
              <span className="stat-label">Total Spent</span>
            </div>
          </div>
        </div>
      </div>

      <div className="navigation">
        <Link to="/" className="nav-button">🏠 Home</Link>
        <Link to="/menu" className="nav-button">📋 Menu</Link>
      </div>
    </div>
  );
}

export default Orders;

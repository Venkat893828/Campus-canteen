import React from 'react';
import { Link } from 'react-router-dom';

function Orders() {
  // Mock orders data
  const orders = [
    {
      id: 1,
      items: ['Veg Burger', 'French Fries', 'Coke'],
      total: 240,
      status: 'completed',
      date: '2024-01-15'
    },
    {
      id: 2,
      items: ['Chicken Pizza', 'Ice Cream'],
      total: 260,
      status: 'preparing',
      date: '2024-01-16'
    },
    {
      id: 3,
      items: ['Biryani', 'Tea'],
      total: 220,
      status: 'pending',
      date: '2024-01-17'
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

  if (orders.length === 0) {
    return (
      <div className="orders-container">
        <h1>📦 My Orders</h1>
        <div className="no-orders">
          <p>No orders found.</p>
          <Link to="/menu" className="nav-button">Browse Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1>📦 My Orders</h1>
      
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h3>Order #{order.id}</h3>
              <span className={`status ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="order-items">
              <p><strong>Items:</strong> {order.items.join(', ')}</p>
              <p><strong>Date:</strong> {order.date}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="navigation">
        <Link to="/" className="nav-button">🏠 Home</Link>
        <Link to="/menu" className="nav-button">📋 Menu</Link>
      </div>
    </div>
  );
}

export default Orders;

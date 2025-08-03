import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Order({ currentUser }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5002/api/orders');
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to fetch orders');
      setLoading(false);
    }
  };

  const placeOrder = async () => {
    try {
      const orderData = {
        items: ['Veg Burger', 'French Fries', 'Coke'],
        totalAmount: 240,
        status: 'pending',
        userId: currentUser?.id || 'user123'
      };

      const res = await axios.post('http://localhost:5002/api/orders', orderData);
      console.log('Order placed:', res.data);
      
      // Refresh orders list
      fetchOrders();
      
      // Show success message
      alert('Order placed successfully!');
    } catch (err) {
      console.error('Error placing order:', err);
      setError('Failed to place order');
    }
  };

  if (loading) {
    return (
      <div className="order-container">
        <div className="loading-spinner"></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-container">
        <div className="error">{error}</div>
        <button onClick={fetchOrders}>Retry</button>
      </div>
    );
  }

  return (
    <div className="order-container">
      <h1>🛒 Place Order</h1>
      
      <div className="order-form">
        <h3>Sample Order</h3>
        <p>This is a sample order for demonstration purposes.</p>
        
        <div className="order-items">
          <h4>Order Items:</h4>
          <ul>
            <li>Veg Burger - ₹120</li>
            <li>French Fries - ₹80</li>
            <li>Coke - ₹40</li>
          </ul>
          <p><strong>Total: ₹240</strong></p>
        </div>

        <button onClick={placeOrder} className="place-order-btn">
          Place Order
        </button>
      </div>

      {orders.length > 0 && (
        <div className="orders-section">
          <h3>Recent Orders</h3>
          {orders.map(order => (
            <div key={order._id} className="order-item">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Items:</strong> {order.items.join(', ')}</p>
              <p><strong>Status:</strong> <span className={`status-${order.status}`}>{order.status}</span></p>
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            </div>
          ))}
        </div>
      )}

      <div className="navigation">
        <Link to="/" className="nav-button">🏠 Home</Link>
        <Link to="/menu" className="nav-button">📋 Menu</Link>
        <Link to="/orders" className="nav-button">📦 Orders</Link>
      </div>
    </div>
  );
}

export default Order;

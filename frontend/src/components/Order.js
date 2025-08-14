import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Order() {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'cash'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Get items from location state (passed from Menu component)
  const selectedItems = location.state?.selectedItems || [];
  const totalPrice = selectedItems.reduce((total, item) => total + item.price, 0);

  const handleInputChange = (e) => {
    setOrderDetails({
      ...orderDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        items: selectedItems,
        totalPrice,
        customerDetails: orderDetails,
        orderDate: new Date().toISOString()
      };

      // Generate a simple order ID
      const orderId = 'ORD' + Date.now();

      // Send order to backend
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5002'}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        // Send email confirmation
        const emailResponse = await sendEmailConfirmation(orderDetails.email, orderData, orderId);
        
        if (emailResponse.success) {
          setOrderSuccess(true);
          setTimeout(() => {
            navigate('/orders');
          }, 3000);
        } else {
          // Order placed but email failed
          alert('Order placed successfully! Email confirmation failed.');
          setTimeout(() => {
            navigate('/orders');
          }, 2000);
        }
      } else {
        throw new Error('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendEmailConfirmation = async (email, orderData, orderId) => {
    try {
      const emailData = {
        to: email,
        subject: `Order Confirmation - Order #${orderId}`,
        orderId,
        items: orderData.items,
        totalPrice: orderData.totalPrice,
        customerDetails: orderData.customerDetails
      };

      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5002'}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Email sent successfully:', result);
        return { success: true, data: result };
      } else {
        throw new Error('Email sending failed');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  };

  if (selectedItems.length === 0) {
    return (
      <div className="order-container">
        <div className="auth-container">
          <h2>No Items Selected</h2>
          <p>Please go back to the menu and select items to order.</p>
          <button onClick={() => navigate('/menu')} className="nav-button">
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="order-container">
        <div className="order-success">
          <h2>✅ Order Placed Successfully!</h2>
          <p>Your order has been placed and a confirmation email has been sent to your email address.</p>
          <p>You will be redirected to your orders page shortly...</p>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-container">
      <div className="auth-container">
        <h2>📋 Place Your Order</h2>
        
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="order-items">
            {selectedItems.map(item => (
              <div key={item.id} className="order-item-summary">
                <img src={item.image} alt={item.name} className="order-item-image" />
                <div className="order-item-details">
                  <span className="order-item-name">{item.name}</span>
                  <span className="order-item-price">₹{item.price}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="order-total">
            <strong>Total: ₹{totalPrice}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="order-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={orderDetails.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={orderDetails.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={orderDetails.phone}
              onChange={handleInputChange}
              required
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Delivery Address *</label>
            <textarea
              id="address"
              name="address"
              value={orderDetails.address}
              onChange={handleInputChange}
              required
              placeholder="Enter your delivery address"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="paymentMethod">Payment Method *</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={orderDetails.paymentMethod}
              onChange={handleInputChange}
              required
            >
              <option value="cash">Cash on Delivery</option>
              <option value="card">Card Payment</option>
              <option value="upi">UPI Payment</option>
            </select>
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="loading-spinner"></span>
                Placing Order...
              </>
            ) : (
              'Place Order'
            )}
          </button>
        </form>

        <div className="navigation">
          <button onClick={() => navigate('/menu')} className="nav-button">
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
}

export default Order;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  const [selectedItems, setSelectedItems] = useState([]);

  const menuItems = [
    { id: 1, name: 'Veg Burger', price: 120, category: 'Main Course' },
    { id: 2, name: 'Chicken Pizza', price: 180, category: 'Main Course' },
    { id: 3, name: 'French Fries', price: 80, category: 'Sides' },
    { id: 4, name: 'Chicken Wings', price: 150, category: 'Appetizers' },
    { id: 5, name: 'Coke', price: 40, category: 'Beverages' },
    { id: 6, name: 'Coffee', price: 60, category: 'Beverages' },
    { id: 7, name: 'Fresh Salad', price: 100, category: 'Healthy' },
    { id: 8, name: 'Ice Cream', price: 80, category: 'Desserts' },
    { id: 9, name: 'Biryani', price: 200, category: 'Main Course' },
    { id: 10, name: 'Noodles', price: 120, category: 'Main Course' },
    { id: 11, name: 'Samosa', price: 30, category: 'Snacks' },
    { id: 12, name: 'Tea', price: 20, category: 'Beverages' }
  ];

  const toggleItem = (item) => {
    if (selectedItems.find(i => i.id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const getTotalPrice = () => {
    return selectedItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="menu-container">
      <h1>🍽️ Campus Canteen Menu</h1>
      
      <div className="menu-grid">
        {menuItems.map(item => (
          <div
            key={item.id}
            className={`menu-item ${selectedItems.find(i => i.id === item.id) ? 'selected' : ''}`}
            onClick={() => toggleItem(item)}
          >
            <h3>{item.name}</h3>
            <p className="category">{item.category}</p>
            <p className="price">₹{item.price}</p>
          </div>
        ))}
      </div>

      {selectedItems.length > 0 && (
        <div className="selected-items">
          <h3>Selected Items:</h3>
          <ul>
            {selectedItems.map(item => (
              <li key={item.id}>
                {item.name} - ₹{item.price}
              </li>
            ))}
          </ul>
          <p className="total">Total: ₹{getTotalPrice()}</p>
          <Link to="/order-form" className="nav-button">
            Place Order
          </Link>
        </div>
      )}

      <div className="navigation">
        <Link to="/" className="nav-button">🏠 Home</Link>
        <Link to="/orders" className="nav-button">📦 Orders</Link>
      </div>
    </div>
  );
}

export default Menu;

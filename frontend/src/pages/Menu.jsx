import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Menu() {
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const menuItems = [
    { 
      id: 1, 
      name: 'Veg Burger', 
      price: 120, 
      category: 'Main Course',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
      rating: 4.5,
      description: 'Fresh vegetable patty with lettuce, tomato, and special sauce'
    },
    { 
      id: 2, 
      name: 'Chicken Pizza', 
      price: 180, 
      category: 'Main Course',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
      rating: 4.8,
      description: 'Delicious pizza with tender chicken, melted cheese, and fresh herbs'
    },
    { 
      id: 3, 
      name: 'French Fries', 
      price: 80, 
      category: 'Sides',
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
      rating: 4.2,
      description: 'Crispy golden fries served with ketchup'
    },
    { 
      id: 4, 
      name: 'Chicken Wings', 
      price: 150, 
      category: 'Appetizers',
      image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop',
      rating: 4.6,
      description: 'Crispy golden fried chicken wings with fresh herbs and dipping sauce'
    },
    { 
      id: 5, 
      name: 'Coke', 
      price: 40, 
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop',
      rating: 4.0,
      description: 'Refreshing Coca-Cola served chilled'
    },
    { 
      id: 6, 
      name: 'Coffee', 
      price: 60, 
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
      rating: 4.3,
      description: 'Freshly brewed coffee with cream and sugar'
    },
    { 
      id: 7, 
      name: 'Fresh Salad', 
      price: 100, 
      category: 'Healthy',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
      rating: 4.7,
      description: 'Mixed greens with cherry tomatoes and balsamic dressing'
    },
    { 
      id: 8, 
      name: 'Ice Cream', 
      price: 80, 
      category: 'Desserts',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
      rating: 4.4,
      description: 'Vanilla ice cream with chocolate sauce'
    },
    { 
      id: 9, 
      name: 'Biryani', 
      price: 200, 
      category: 'Main Course',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
      rating: 4.9,
      description: 'Aromatic rice with tender chicken and spices'
    },
    { 
      id: 10, 
      name: 'Noodles', 
      price: 120, 
      category: 'Main Course',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
      rating: 4.1,
      description: 'Stir-fried noodles with vegetables and soy sauce'
    },
    { 
      id: 11, 
      name: 'Samosa', 
      price: 30, 
      category: 'Snacks',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
      rating: 4.5,
      description: 'Crispy pastry filled with spiced potatoes and peas'
    },
    { 
      id: 12, 
      name: 'Tea', 
      price: 20, 
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
      rating: 4.2,
      description: 'Hot masala chai with milk and spices'
    }
  ];

  const toggleItem = (item) => {
    // Navigate directly to order form with the selected item
    navigate('/order-form', { 
      state: { 
        selectedItems: [item] 
      } 
    });
  };

  const handleMultipleItems = () => {
    if (selectedItems.length > 0) {
      navigate('/order-form', { 
        state: { 
          selectedItems: selectedItems 
        } 
      });
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">⭐</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">⭐</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }
    
    return stars;
  };

  return (
    <div className="menu-container">
      <h1>🍽️ Campus Canteen Menu</h1>
      
      <div className="menu-grid">
        {menuItems.map(item => (
          <div
            key={item.id}
            className="menu-item"
            onClick={() => toggleItem(item)}
          >
            <div className="item-image">
              <img src={item.image} alt={item.name} />
              <div className="item-overlay">
                <div className="rating">
                  {renderStars(item.rating)}
                  <span className="rating-text">({item.rating})</span>
                </div>
              </div>
            </div>
            <div className="item-content">
              <h3>{item.name}</h3>
              <p className="description">{item.description}</p>
              <p className="category">{item.category}</p>
              <p className="price">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="menu-instructions">
        <h3>🍽️ How to Order</h3>
        <p>Click on any menu item to order it directly!</p>
        <p>Each item will take you to the order form where you can provide your details and complete the purchase.</p>
      </div>

      <div className="navigation">
        <Link to="/" className="nav-button">🏠 Home</Link>
        <Link to="/orders" className="nav-button">📦 Orders</Link>
      </div>
    </div>
  );
}

export default Menu;

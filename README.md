# Campus Canteen Application

A full-stack web application for a campus canteen ordering system built with React, Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Register and login functionality
- **Menu Display**: Interactive menu with item selection
- **Order Management**: Place orders and track their status
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Order status tracking

## Project Structure

```
campus-canteen/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── order.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Order.js
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Menu.jsx
│   │   │   └── Orders.jsx
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start MongoDB service (make sure MongoDB is running on your system)

4. Start the backend server:
   ```bash
   npm start
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Orders
- `POST /api/orders` - Place a new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/user/:userId` - Get orders by user
- `PUT /api/orders/:orderId` - Update order status

## Issues Fixed

1. **Missing Dependencies**: Added `react-router-dom` to frontend dependencies
2. **Duplicate Files**: Removed duplicate files in the project structure
3. **Empty Components**: Created proper implementations for Home, Menu, and Orders components
4. **Routing Issues**: Implemented proper React Router setup with protected routes
5. **Navigation**: Added consistent navigation between pages
6. **Styling**: Enhanced CSS for better user experience
7. **Backend Structure**: Removed duplicate server file from routes directory

## Technologies Used

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **Styling**: CSS3 with modern design patterns

## Usage

1. Start both backend and frontend servers
2. Register a new account or login with existing credentials
3. Navigate through the application:
   - View the menu and select items
   - Place orders
   - Track order status
   - View order history

## Contributing

Feel free to submit issues and enhancement requests! 
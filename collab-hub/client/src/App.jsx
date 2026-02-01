import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { initSocket } from './api/socket';
import { useAuth } from './hooks/useAuth';

// Components
import Navbar from './components/layout/Navbar';
import ToastContainer from './components/common/Toast';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import Cart from './pages/Cart';
import DesignDetails from './pages/DesignDetails';

function AppContent() {
  const { user, logout } = useAuth();
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Initialize socket connection
      initSocket();
    }
  }, []);

  const handleLogout = () => {
    logout();
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} unreadNotifications={0} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/upload" element={user ? <Upload /> : <Navigate to="/login" />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/design/:id" element={<DesignDetails />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

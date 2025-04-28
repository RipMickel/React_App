import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate checking authentication (replace with actual auth logic)
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Protected Route for HomePage */}
        <Route
          path="/home"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />
        
        {/* Login and Register Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import TurfDetails from './pages/TurfDetails';
import Bookings from './pages/Bookings';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  const [bookings, setBookings] = useState([]);
  const [role, setRole] = useState(localStorage.getItem('role') || 'user');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const navigate = useNavigate();

  const turfs = [
    { id: 1, name: 'Green Field', location: 'City Center', price: 50 },
    { id: 2, name: 'Blue Turf', location: 'Downtown', price: 40 },
    { id: 3, name: 'Sunny Ground', location: 'Uptown', price: 60 },
    { id: 4, name: 'Red Arena', location: 'East Side', price: 55 },
    { id: 5, name: 'Golden Turf', location: 'West End', price: 45 },
    { id: 6, name: 'Crystal Field', location: 'North Park', price: 70 },
  ];

  const handleBooking = (booking) => {
    setBookings([...bookings, booking]);
  };

  // Fetch bookings from the backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:3000/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  // Protect routes for authenticated users
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated && window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="app-container">
      {isAuthenticated && <Navbar />} {/* Show Navbar only if authenticated */}
      <main className="content">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login setRole={setRole} setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/turf/:id"
            element={
              <ProtectedRoute>
                <TurfDetails turfs={turfs} onBook={handleBooking} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Bookings bookings={bookings} role={role} />
              </ProtectedRoute>
            }
          />

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to={isAuthenticated ? '/home' : '/login'} />} />
        </Routes>
      </main>
      {isAuthenticated && <Footer />} {/* Show Footer only if authenticated */}
    </div>
  );
};

export default App;
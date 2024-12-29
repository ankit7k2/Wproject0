import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserManagement from './components/UserManagement';
import RoomList from './components/RoomList';
import RoomDetails from './components/RoomDetails';
import Header from './components/Header';
import Footer from './components/Footer';
import RoomCard from './components/RoomCard';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Student from './components/Student';
import Staff from './components/Staff';
import Admin from './components/Admin';
import StudentManagement from './components/StudentManagement'; // Import StudentManagement
import StaffManagement from './components/StaffManagement'; // Import StaffManagement
import AdminManagement from './components/AdminManagement'; // Import AdminManagement
import FeesManagement from './components/FeesManagement'; // Import FeesManagement
import MaintenanceManagement from './components/MaintenanceManagement'; // Import MaintenanceManagement
import InventoryManagement from './components/InventoryManagement'; // Import InventoryManagement
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  const getRole = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const { role } = JSON.parse(atob(token.split('.')[1]));
      return role;
    }
    return null;
  };

  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/rooms')
      .then(response => response.json())
      .then(data => setRooms(data));
  }, []);

  const handleCardClick = (roomId) => {
    fetch(`http://localhost:5000/api/rooms/${roomId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setSelectedRoom(data))
      .catch(err => {
        console.error("Error fetching room details: ", err);
        toast.error('Failed to fetch room details', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <Navbar />
        <main className="container mx-auto p-4">
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<RoomList rooms={rooms} onCardClick={handleCardClick} />} />
            <Route path="/room/:id" element={<RoomDetails room={selectedRoom} />} />
            <Route
              path="/dashboard"
              element={
                isAuthenticated() ? (
                  <Dashboard role={getRole()} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/student" element={<Student />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/student-management" element={<StudentManagement />} /> {/* Add route for StudentManagement */}
            <Route path="/staff-management" element={<StaffManagement />} /> {/* Add route for StaffManagement */}
            <Route path="/admin-management" element={<AdminManagement />} /> {/* Add route for AdminManagement */}
            <Route path="/fees-management" element={<FeesManagement />} /> {/* Add route for FeesManagement */}
            <Route path="/maintenance-management" element={<MaintenanceManagement />} /> {/* Add route for MaintenanceManagement */}
            <Route path="/inventory-management" element={<InventoryManagement />} /> {/* Add route for InventoryManagement */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

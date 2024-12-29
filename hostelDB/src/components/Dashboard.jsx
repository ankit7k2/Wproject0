import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    console.log('Retrieved role:', userRole); // Debugging step
    setRole(userRole);
  }, []);

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          className="bg-blue-100 p-4 rounded shadow-md cursor-pointer"
          onClick={() => handleCardClick('/student-management')}
        >
          <h2 className="text-xl font-bold mb-2">Student</h2>
          <p>Welcome, Student!</p>
          <ul className="list-disc list-inside mt-4">
            <li>View Courses</li>
            <li>Check Attendance</li>
            <li>Submit Assignments</li>
          </ul>
        </div>
        <div
          className="bg-green-100 p-4 rounded shadow-md cursor-pointer"
          onClick={() => handleCardClick('/staff-management')}
        >
          <h2 className="text-xl font-bold mb-2">Staff</h2>
          <p>Welcome, Staff!</p>
          <ul className="list-disc list-inside mt-4">
            <li>Manage Students</li>
            <li>View Attendance</li>
            <li>Submit Reports</li>
          </ul>
        </div>
        <div
          className="bg-red-100 p-4 rounded shadow-md cursor-pointer"
          onClick={() => handleCardClick('/admin-management')}
        >
          <h2 className="text-xl font-bold mb-2">Admin</h2>
          <p>Welcome, Admin!</p>
          <ul className="list-disc list-inside mt-4">
            <li>Manage Users</li>
            <li>View Reports</li>
            <li>Configure Settings</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

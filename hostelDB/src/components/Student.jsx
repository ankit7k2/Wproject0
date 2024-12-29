import React, { useState } from 'react';
import axios from 'axios';

const Student = () => {
  const [profile, setProfile] = useState({
    name: '',
    course: '',
    year: '',
    email: '',
    phone: '',
    roomNumber: '',
    hostelName: '',
  });

  const [hostelFee, setHostelFee] = useState({
    amount: 5000,
    dueDate: '2024-12-31',
    status: 'Pending',
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFeePayment = async () => {
    setHostelFee({ ...hostelFee, status: 'Paid' });
    alert('Hostel fee paid successfully');

    // Save profile data to the backend
    try {
      await axios.post('http://localhost:5000/api/students', profile);
      alert('Profile data saved successfully');
    } catch (error) {
      alert('Error saving profile data');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Student Dashboard</h1>
      
      <div className="bg-blue-100 p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">Student Information</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Course</label>
            <input
              type="text"
              name="course"
              value={profile.course}
              onChange={handleProfileChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="text"
              name="year"
              value={profile.year}
              onChange={handleProfileChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Room Number</label>
            <input
              type="text"
              name="roomNumber"
              value={profile.roomNumber}
              onChange={handleProfileChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Hostel Name</label>
            <input
              type="text"
              name="hostelName"
              value={profile.hostelName}
              onChange={handleProfileChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
        </form>
      </div>
      
      <div className="bg-blue-100 p-4 rounded shadow-md mt-4">
        <h2 className="text-xl font-bold mb-2">Hostel Fee Payment</h2>
        <p>Amount: ₹{hostelFee.amount}</p>
        <p>Due Date: {hostelFee.dueDate}</p>
        <p>Status: {hostelFee.status}</p>
        {hostelFee.status === 'Pending' && (
          <button
            onClick={handleFeePayment}
            className="mt-4 p-2 bg-green-600 text-white rounded"
          >
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
};

export default Student;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: '',
    contactInfo: '',
    shift: '',
    performance: '',
  });

  useEffect(() => {
    // Fetch staff from the backend
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/staff');
        setStaff(response.data);
      } catch (error) {
        console.error('Error fetching staff:', error);
      }
    };

    fetchStaff();
  }, []);

  const handleInputChange = (e) => {
    setNewStaff({ ...newStaff, [e.target.name]: e.target.value });
  };

  const handleAddStaff = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/staff', newStaff);
      setStaff([...staff, response.data]);
      setNewStaff({
        name: '',
        role: '',
        contactInfo: '',
        shift: '',
        performance: '',
      });
    } catch (error) {
      console.error('Error adding staff:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Staff Management</h1>
      
      <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
        <h2 className="text-xl font-bold mb-2">Add New Staff</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={newStaff.name}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              name="role"
              value={newStaff.role}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Info</label>
            <input
              type="text"
              name="contactInfo"
              value={newStaff.contactInfo}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Shift</label>
            <input
              type="text"
              name="shift"
              value={newStaff.shift}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Performance</label>
            <input
              type="text"
              name="performance"
              value={newStaff.performance}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
        </form>
        <button
          onClick={handleAddStaff}
          className="mt-4 p-2 bg-blue-600 text-white rounded"
        >
          Add Staff
        </button>
      </div>
      
      <div className="bg-gray-100 p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">Staff List</h2>
        <ul className="list-disc list-inside mt-4">
          {staff.map(member => (
            <li key={member._id} className="mt-2">
              {member.name} - {member.role} - {member.shift} - {member.performance}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StaffManagement;

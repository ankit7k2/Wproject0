import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    role: '',
    contactInfo: '',
    responsibilities: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch admins from the backend
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin');
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    fetchAdmins();
  }, []);

  const handleInputChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const handleAddAdmin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/admin', newAdmin);
      setAdmins([...admins, response.data]);
      setNewAdmin({
        name: '',
        role: '',
        contactInfo: '',
        responsibilities: '',
      });
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  const handleStudentManagementClick = () => {
    navigate('/student-management');
  };

  const handleStaffManagementClick = () => {
    navigate('/staff-management');
  };

  const handleFeesManagementClick = () => {
    navigate('/fees-management');
  };

  const handleMaintenanceManagementClick = () => {
    navigate('/maintenance-management');
  };

  const handleInventoryManagementClick = () => {
    navigate('/inventory-management');
  };

  return (
    <>
      <nav className="bg-zinc-500 p-4">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-white text-2xl font-bold">Welcome to Admin page..</h1>
          <div>
            <button 
              className="mr-2 bg-white text-blue-600 px-4 py-2 rounded" 
              onClick={handleStudentManagementClick}
            >
              Student Management
            </button>
            <button 
              className="mr-2 bg-white text-blue-600 px-4 py-2 rounded" 
              onClick={handleStaffManagementClick}
            >
              Staff Management
            </button>
            <button 
              className="mr-2 bg-white text-blue-600 px-4 py-2 rounded" 
              onClick={handleFeesManagementClick}
            >
              Fees Management
            </button>
            <button 
              className="mr-2 bg-white text-blue-600 px-4 py-2 rounded" 
              onClick={handleMaintenanceManagementClick}
            >
              Maintenance Management
            </button>
            <button 
              className="bg-white text-blue-600 px-4 py-2 rounded" 
              onClick={handleInventoryManagementClick}
            >
              Inventory Management
            </button>
          </div>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Management</h1>
        
        <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
          <h2 className="text-xl font-bold mb-2">Add New Admin</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={newAdmin.name}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                name="role"
                value={newAdmin.role}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Info</label>
              <input
                type="text"
                name="contactInfo"
                value={newAdmin.contactInfo}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Responsibilities</label>
              <input
                type="text"
                name="responsibilities"
                value={newAdmin.responsibilities}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
          </form>
          <button
            onClick={handleAddAdmin}
            className="mt-4 p-2 bg-blue-600 text-white rounded"
          >
            Add Admin
          </button>
        </div>
        
        <div className="bg-gray-100 p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Admin List</h2>
          <ul className="list-disc list-inside mt-4">
            {admins.map(admin => (
              <li key={admin._id} className="mt-2">
                {admin.name} - {admin.role} - {admin.responsibilities}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminManagement;

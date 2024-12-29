import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [profile, setProfile] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
  });

  const [tasks, setTasks] = useState([
    { id: 1, task: 'Manage Users', completed: false },
    { id: 2, task: 'View Reports', completed: false },
    { id: 3, task: 'Configure Settings', completed: false },
  ]);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  const handleProfileSave = async () => {
    // Save profile data to the backend
    try {
      await axios.post('http://localhost:5000/api/admin', profile);
      alert('Profile data saved successfully');
    } catch (error) {
      alert('Error saving profile data');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h1>
      
      <div className="bg-red-100 p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">Admin Information</h2>
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
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              name="role"
              value={profile.role}
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
        </form>
        <button
          onClick={handleProfileSave}
          className="mt-4 p-2 bg-blue-600 text-white rounded"
        >
          Save Profile
        </button>
      </div>
      
      <div className="bg-red-100 p-4 rounded shadow-md mt-4">
        <h2 className="text-xl font-bold mb-2">Tasks</h2>
        <ul className="list-disc list-inside mt-4">
          {tasks.map(task => (
            <li key={task.id} className={`mt-2 ${task.completed ? 'line-through' : ''}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTaskCompletion(task.id)}
                className="mr-2"
              />
              {task.task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;

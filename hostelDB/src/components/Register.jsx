import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '', role: 'student' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', form);
      alert('User registered successfully');
    } catch (error) {
      alert('Error registering user');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="w-full p-2 mb-4 border rounded" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 mb-4 border rounded" />
      <select name="role" onChange={handleChange} className="w-full p-2 mb-4 border rounded">
        <option value="student">Student</option>
        <option value="staff">Staff</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Register</button>
    </form>
  );
};

export default Register;

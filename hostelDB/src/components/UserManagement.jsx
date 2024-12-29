import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegister, setShowRegister] = useState(true);
  const [registerForm, setRegisterForm] = useState({ username: '', password: '', role: 'student' });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const registered = localStorage.getItem('isRegistered');
    if (registered) {
      setIsRegistered(true);
      setShowRegister(false);
    }
  }, []);

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', registerForm);
      localStorage.setItem('isRegistered', 'true');
      setIsRegistered(true);
      setShowRegister(false);
      alert('User registered successfully');
    } catch (error) {
      alert('Error registering user');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', loginForm);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role); // Store role in localStorage
      console.log('Stored role:', data.role); // Debugging step
      alert('Login successful');
      navigate('/dashboard'); // Redirect to Dashboard
    } catch (error) {
      alert('Error logging in');
    }
  };

  const flipForm = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div className="flex flex-col items-center">
      {showRegister ? (
        <form onSubmit={handleRegisterSubmit} className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded">
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleRegisterChange}
            required
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleRegisterChange}
            required
            className="w-full p-2 mb-4 border rounded"
          />
          <select name="role" onChange={handleRegisterChange} className="w-full p-2 mb-4 border rounded">
            <option value="student">Student</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Register</button>
          <button type="button" onClick={flipForm} className="w-full p-2 mt-4 bg-gray-600 text-white rounded">Already registered? Login</button>
        </form>
      ) : (
        <form onSubmit={handleLoginSubmit} className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleLoginChange}
            required
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleLoginChange}
            required
            className="w-full p-2 mb-4 border rounded"
          />
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Login</button>
          <button type="button" onClick={flipForm} className="w-full p-2 mt-4 bg-gray-600 text-white rounded">New user? Register</button>
        </form>
      )}
    </div>
  );
};

export default UserManagement;

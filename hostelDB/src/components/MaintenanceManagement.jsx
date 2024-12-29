import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MaintenanceManagement = () => {
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({
    description: '',
    status: 'Pending',
    email: '',
  });

  useEffect(() => {
    // Fetch maintenance requests from the backend
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/maintenance');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching maintenance requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleInputChange = (e) => {
    setNewRequest({ ...newRequest, [e.target.name]: e.target.value });
  };

  const handleAddRequest = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/maintenance', newRequest);
      setRequests([...requests, response.data]);
      setNewRequest({
        description: '',
        status: 'Pending',
        email: '',
      });
    } catch (error) {
      console.error('Error adding maintenance request:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/maintenance/${id}`, { status });
      setRequests(requests.map(request => (request._id === id ? response.data : request)));
    } catch (error) {
      console.error('Error updating maintenance request status:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Maintenance Management</h1>
      
      <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
        <h2 className="text-xl font-bold mb-2">Log New Maintenance Request</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={newRequest.description}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={newRequest.email}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
        </form>
        <button
          onClick={handleAddRequest}
          className="mt-4 p-2 bg-blue-600 text-white rounded"
        >
          Log Request
        </button>
      </div>
      
      <div className="bg-gray-100 p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">Maintenance Requests</h2>
        <ul className="list-disc list-inside mt-4">
          {requests.map(request => (
            <li key={request._id} className="mt-2">
              {request.description} - Status: {request.status}
              <button
                onClick={() => handleStatusChange(request._id, 'Completed')}
                className="ml-4 p-2 bg-green-600 text-white rounded"
              >
                Mark as Completed
              </button>
              <button
                onClick={() => handleStatusChange(request._id, 'Pending')}
                className="ml-4 p-2 bg-red-600 text-white rounded"
              >
                Mark as Pending
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MaintenanceManagement;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeesManagement = () => {
  const [fees, setFees] = useState([]);
  const [newFee, setNewFee] = useState({
    roomType: '',
    amount: '',
    dueDate: '',
    status: 'Pending',
    email: '',
  });

  useEffect(() => {
    // Fetch fees from the backend
    const fetchFees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fees');
        setFees(response.data);
      } catch (error) {
        console.error('Error fetching fees:', error);
      }
    };

    fetchFees();
  }, []);

  const handleInputChange = (e) => {
    setNewFee({ ...newFee, [e.target.name]: e.target.value });
  };

  const handleAddFee = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/fees', newFee);
      setFees([...fees, response.data]);
      setNewFee({
        roomType: '',
        amount: '',
        dueDate: '',
        status: 'Pending',
        email: '',
      });
    } catch (error) {
      console.error('Error adding fee:', error);
    }
  };

  const handlePaymentStatusChange = async (id, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/fees/${id}`, { status });
      setFees(fees.map(fee => (fee._id === id ? response.data : fee)));
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Fees Management</h1>
      
      <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
        <h2 className="text-xl font-bold mb-2">Add New Fee</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Room Type</label>
            <input
              type="text"
              name="roomType"
              value={newFee.roomType}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={newFee.amount}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={newFee.dueDate}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={newFee.email}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
        </form>
        <button
          onClick={handleAddFee}
          className="mt-4 p-2 bg-blue-600 text-white rounded"
        >
          Add Fee
        </button>
      </div>
      
      <div className="bg-gray-100 p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">Fees List</h2>
        <ul className="list-disc list-inside mt-4">
          {fees.map(fee => (
            <li key={fee._id} className="mt-2">
              {fee.roomType} - ₹{fee.amount} - Due: {fee.dueDate} - Status: {fee.status}
              <button
                onClick={() => handlePaymentStatusChange(fee._id, 'Paid')}
                className="ml-4 p-2 bg-green-600 text-white rounded"
              >
                Mark as Paid
              </button>
              <button
                onClick={() => handlePaymentStatusChange(fee._id, 'Overdue')}
                className="ml-4 p-2 bg-red-600 text-white rounded"
              >
                Mark as Overdue
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeesManagement;

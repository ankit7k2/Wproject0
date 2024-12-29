import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    number: '',
    type: 'standard',
    occupancy: 'single',
    status: 'vacant',
  });

  useEffect(() => {
    // Fetch rooms from the backend
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleInputChange = (e) => {
    setNewRoom({ ...newRoom, [e.target.name]: e.target.value });
  };

  const handleAddRoom = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/rooms', newRoom);
      setRooms([...rooms, response.data]);
      setNewRoom({ number: '', type: 'standard', occupancy: 'single', status: 'vacant' });
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Room Management</h1>
      
      <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
        <h2 className="text-xl font-bold mb-2">Add New Room</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Room Number</label>
            <input
              type="text"
              name="number"
              value={newRoom.number}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Room Type</label>
            <select
              name="type"
              value={newRoom.type}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Occupancy</label>
            <select
              name="occupancy"
              value={newRoom.occupancy}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="single">Single</option>
              <option value="shared">Shared</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={newRoom.status}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="vacant">Vacant</option>
              <option value="occupied">Occupied</option>
              <option value="under maintenance">Under Maintenance</option>
            </select>
          </div>
        </form>
        <button
          onClick={handleAddRoom}
          className="mt-4 p-2 bg-blue-600 text-white rounded"
        >
          Add Room
        </button>
      </div>
      
      <div className="bg-gray-100 p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">Room List</h2>
        <ul className="list-disc list-inside mt-4">
          {rooms.map(room => (
            <li key={room._id} className="mt-2">
              Room {room.number} - {room.type} - {room.occupancy} - {room.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RoomManagement;

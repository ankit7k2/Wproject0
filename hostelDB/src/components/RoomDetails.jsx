import React from 'react';

const RoomDetails = ({ room }) => {
  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">{room.name}</h2>
      <p className="text-gray-700 mb-2">Type: {room.type}</p>
      <p className="text-gray-700 mb-2">Status: {room.status}</p>
      <p className="text-gray-700 mb-2">Capacity: {room.capacity}</p>
      <p className="text-gray-700 mb-2">Occupants: {room.occupants.length}</p>
    </div>
  );
};

export default RoomDetails;

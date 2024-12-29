import React from 'react';

const RoomCard = ({ room, onCardClick }) => {
  return (
    <div 
      className="bg-white shadow-lg rounded-lg p-4 m-2 cursor-pointer transition-transform transform hover:scale-105 w-64" 
      onClick={() => onCardClick(room._id)}
    >
      <h3 className="text-xl font-bold text-blue-600">{room.name}</h3>
      <p className="text-gray-700 mt-2">{room.description}</p>
      <p className="text-gray-500 mt-2">Price: {room.price}</p>
      <button 
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        View Details
      </button>
    </div>
  );
};

export default RoomCard;

import React from 'react';
import RoomCard from './RoomCard';

const RoomList = ({ rooms, onCardClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map(room => (
        <RoomCard key={room._id} room={room} onCardClick={onCardClick} />
      ))}
    </div>
  );
};

export default RoomList;

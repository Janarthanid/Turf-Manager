import React from 'react';
import { Link } from 'react-router-dom';

const TurfCard = ({ turf }) => {
  return (
    <div className="card bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-bold">{turf.name}</h2>
      <p>{turf.location}</p>
      <p>${turf.price}/hour</p>
      <Link to={`/turf/${turf.id}`} className="text-blue-500 mt-2 inline-block">View Details</Link>
    </div>
  );
};

export default TurfCard;
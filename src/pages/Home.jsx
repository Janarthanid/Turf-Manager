import React from 'react';
import TurfCard from '../components/TurfCard';

const Home = () => {
  const turfs = [
    { id: 1, name: 'Green Field', location: 'City Center', price: 50 },
    { id: 2, name: 'Blue Turf', location: 'Downtown', price: 40 },
    { id: 3, name: 'Sunny Ground', location: 'Uptown', price: 60 },
    { id: 4, name: 'Red Arena', location: 'East Side', price: 55 },
    { id: 5, name: 'Golden Turf', location: 'West End', price: 45 },
    { id: 6, name: 'Crystal Field', location: 'North Park', price: 70 }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Turfs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {turfs.map((turf) => (
          <TurfCard key={turf.id} turf={turf} />
        ))}
      </div>
    </div>
  );
};

export default Home;
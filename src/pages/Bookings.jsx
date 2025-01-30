import React from 'react';

const Bookings = ({ bookings, role }) => {
  return (
    <div style={{ margin: '20px' }}>
      <h2>{role === 'admin' ? 'All Bookings' : 'My Bookings'}</h2>
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Turf Name</th>
              <th>Location</th>
              <th>Price</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.turfName}</td>
                <td>{booking.location}</td>
                <td>{booking.price}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Bookings;
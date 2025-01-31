import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ turf, onBook }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();
    if (date && time) {
      const bookingData = {
        turfName: turf.name,
        location: turf.location,
        price: turf.price,
        date,
        time,
      };

      try {
        
        const token = localStorage.getItem('authToken');

        
        const response = await axios.post('https://turf-backend-1.onrender.com/bookings', bookingData, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        if (response.status === 201) {
          onBook(bookingData); 
          setDate('');
          setTime('');
          alert('Booking created successfully!');
        }
      } catch (error) {
        console.error('Error creating booking:', error);
        alert('Failed to create booking.');
      }
    }
  };

  return (
    <form onSubmit={handleBooking} style={{ margin: '20px 0' }}>
      <h3>Book Turf: {turf.name}</h3>
      <div>
        <label>Date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Time: </label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <button type="submit">Book Now</button>
    </form>
  );
};

export default BookingForm;
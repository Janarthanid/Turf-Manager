import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm';

const TurfDetails = ({ turfs, onBook }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const turf = turfs.find((t) => t.id === parseInt(id));

  if (!turf) {
    return (
      <div style={{ margin: '20px' }}>
        <h2>Turf not found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ margin: '20px' }}>
      <h2>{turf.name}</h2>
      <p>Location: {turf.location}</p>
      <p>Price: {turf.price}/hour</p>
      <BookingForm turf={turf} onBook={onBook} />
      <button onClick={() => navigate(-1)} style={{ marginTop: '10px' }}>Go Back</button>
    </div>
  );
};

export default TurfDetails;
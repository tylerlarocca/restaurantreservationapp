import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ReservationForm from '../../Forms/ReservationForm';

const ReservationCtr = () => {
  const { reservation_id } = useParams();
  const [title, setTitle] = useState('New');

  useEffect(() => {
    reservation_id ? setTitle('Edit') : setTitle('New');
  }, [reservation_id]);

  return (
    <div>
      <h1 className="m-3">{title} Reservation</h1>
      <ReservationForm />
    </div>
  );
};

export default ReservationCtr;
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { today, formatAsTime } from '../utils/date-time';
import {
  createReservation,
  getReservation,
  updateReservation,
  deleteReservation,
} from '../utils/api';
import ErrorAlert from '../ErrorHandlers/ErrorAlert';

const ReservationForm = () => {
  const { reservation_id } = useParams();
  const history = useHistory();

  const initialForm = {
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: today(),
    reservation_time: formatAsTime(new Date().toTimeString()),
    people: 1,
  };

  const [formData, setFormData] = useState({ ...initialForm });
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (reservation_id) {
      const abortController = new AbortController();
      setFormError(null);
      getReservation(reservation_id, abortController.signal)
        .then((data) => {
          let updatedData = { ...data };
          updatedData.reservation_time = formatAsTime(
            updatedData.reservation_time
          );
          setFormData(updatedData);
        })
        .catch(setFormError);
      return () => abortController.abort();
    }
  }, [reservation_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);
    // if new reservation, call createReservation. if edit, need updateReservation
    reservation_id ? submitEdit() : submitNew();
  };

  const submitNew = () => {
    const abortController = new AbortController();
    createReservation(formData, abortController.signal)
      .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
      .catch(setFormError);
    return () => abortController.abort();
  };

  const submitEdit = () => {
    const abortController = new AbortController();

    const editReservation = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      people: formData.people,
      mobile_number: formData.mobile_number,
      reservation_date: formData.reservation_date,
      reservation_time: formData.reservation_time,
      status: 'booked',
      reservation_id: reservation_id,
    };
    updateReservation(reservation_id, editReservation, abortController.signal)
      .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
      .catch(setFormError);
    return () => abortController.abort();
  };

  const handleChange = ({ target }) => {
    let { value, name } = target;
    if (name === 'people' && typeof value === 'string') {
      value = +value;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setFormError(null);
    deleteReservation(reservation_id)
      .then(() => {
        history.push('/dashboard');
      })
      .catch(setFormError);
  };

  const deleteBtn = (
    <button type="button" className="btn btn-danger m-3" onClick={handleDelete}>
      Delete
    </button>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group col-md-4">
        <label htmlFor="first_name">First Name:</label>
        <input
          id="first_name"
          name="first_name"
          type="text"
          className="form-control"
          placeholder="First Name"
          onChange={handleChange}
          value={formData.first_name}
          required={true}
        />
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="last_name">Last Name:</label>
        <input
          id="last_name"
          name="last_name"
          type="text"
          className="form-control"
          placeholder="Last Name"
          onChange={handleChange}
          value={formData.last_name}
          required={true}
        />
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="mobile_number">
          Mobile Number (no dashes required):
        </label>
        <input
          type="tel"
          className="form-control"
          id="mobile_number"
          name="mobile_number"
          onChange={handleChange}
          placeholder="XXXXXXXXXX"
          value={formData.mobile_number}
          required={true}
        />
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="reservation_date">Reservation Date:</label>
        <input
          id="reservation_date"
          name="reservation_date"
          type="date"
          className="form-control"
          onChange={handleChange}
          value={formData.reservation_date}
          required={true}
        />
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="reservation_time">Reservation Time:</label>
        <input
          id="reservation_time"
          type="time"
          name="reservation_time"
          className="form-control"
          onChange={handleChange}
          placeholder="HH:MM"
          value={formData.reservation_time}
          required={true}
        />
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="people">Party Size:</label>
        <input
          id="people"
          type="number"
          name="people"
          className="form-control"
          onChange={handleChange}
          required={true}
          min="1"
          value={formData.people}
        />
      </div>
      <div className="btn-toolbar col-md-6">
        <button
          type="button"
          className="btn btn-secondary m-3"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary m-3">
          Submit
        </button>
        {reservation_id && deleteBtn}
      </div>
      <ErrorAlert error={formError} />
    </form>
  );
};

export default ReservationForm;
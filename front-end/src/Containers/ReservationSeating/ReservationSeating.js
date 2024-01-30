import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { listTables, assignToTable, getReservation } from '../../utils/api';
import ErrorAlert from '../../ErrorHandlers/ErrorAlert';

const ReservationSeating = () => {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [tableError, setTableError] = useState(null);

  const [tableList, setTableList] = useState([]);
  const [tableListError, setTableListError] = useState(null);

  const [tableId, setTableId] = useState(null);

  const [reservation, setReservation] = useState([]);
  const [reservationError, setReservationError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setTableListError(null);
    listTables(abortController.signal)
      .then(setTableList)
      .catch(setTableListError);

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    setReservationError(null);

    getReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setReservationError);
    return () => abortController.abort();
  }, [reservation_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    setTableError(null);
    if (!tableId) {
      alert('Please select a table for your reservation part.');
    } else {
      assignToTable(reservation_id, tableId, abortController.signal)
        .then(() => history.push('/dashboard'))
        .catch(setTableError);
    }
    return () => abortController.abort();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const handleChange = (e) => {
    setTableId(e.target.value);
  };

  return (
    <div>
      <h1>
        Reservation for {reservation.first_name} {reservation.last_name}, party
        of {reservation.people} &nbsp;
      </h1>
      <ErrorAlert error={reservationError} />
      <ErrorAlert error={tableListError} />

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="table_id" className={'sr-only'}>
            Pick Table: &nbsp;
          </label>
          <select
            name="table_id"
            onChange={handleChange}
            required
            style={{ minWidth: '200px' }}
          >
            <option defaultValue>Table: # - Capacity: # </option>
            {tableList.map(({ table_name, table_id, capacity }) => (
              <option key={table_id} value={table_id}>
                {table_name} - {capacity}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-sm btn-success px-2 mr-1 mt-2">
          <span className="oi oi-check p-1">&nbsp;Submit</span>
        </button>
        <button
          type="button"
          value="Cancel"
          className="btn btn-sm btn-danger px-2 ml-1 mt-2"
          onClick={handleCancel}
        >
          <span className="oi oi-action-undo p-1">&nbsp;Cancel</span>
        </button>
      </form>

      <ErrorAlert error={tableError} />
    </div>
  );
};

export default ReservationSeating;
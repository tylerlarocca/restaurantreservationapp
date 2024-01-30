import React from 'react';

const ReservationButtons = ({ onCancel, id }) => (
  <div className="btn-toolbar-vertical" role="toolbar">
    <div className="btn-group">
      <a className="btn btn-success shadow" href={`/reservations/${id}/edit`}>
        <span className="oi oi-pencil mr-2 p-1">&nbsp;Edit</span>
      </a>
      <a className="btn btn-info shadow" href={`/reservations/${id}/seat`}>
        <span className="oi oi-check p-1">&nbsp;Seat</span>
      </a>

      <button
        className="btn btn-danger shadow"
        onClick={onCancel}
        data-reservation-id-cancel={id}
      >
        <span className="oi oi-ban mr-2 p-1">&nbsp; Cancel</span>
      </button>
    </div>
  </div>
);

export default ReservationButtons;
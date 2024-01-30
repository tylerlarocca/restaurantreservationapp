import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { updateStatus } from '../../utils/api';
import { printableTime } from '../../utils/date-time';
import ReservationButtons from '../ReservationButtons/ReservationButtons';
import ErrorAlert from '../../ErrorHandlers/ErrorAlert';

const ReservationItem = ({ reservation }) => {
  const {
    first_name,
    last_name,
    mobile_number,
    people,
    reservation_time,
    reservation_id,
    status,
  } = reservation;

  const history = useHistory();
  const [cancelError, setCancelError] = useState(null);

  const handleCancel = () => {
    if (window.confirm('Do you want to cancel this reservation?')) {
      const abortController = new AbortController();
      setCancelError(null);

      updateStatus(reservation_id, 'cancelled', abortController.signal)
        .then(() => history.go(0))
        .catch(setCancelError);
      return () => abortController.abort();
    }
  };

  let resStatus = null;

  resStatus =
    status === 'cancelled' ? (
      <p className="p-0 mx-0 my-2">
        Status:
        <span
          className="text-danger"
          data-reservation-id-status={reservation_id}
        >
          &nbsp;CANCELLED
        </span>
      </p>
    ) : status === 'booked' ? (
      <p className="p-0 mx-0 my-2">
        Status:
        <span
          className="text-success p-0 mx-0 my-2"
          data-reservation-id-status={reservation_id}
        >
          &nbsp;BOOKED
        </span>
      </p>
    ) : status === 'seated' ? (
      <p className="p-0 mx-0 my-2">
        Status:
        <span
          className="text-success p-0 mx-0 my-2"
          data-reservation-id-status={reservation_id}
        >
          &nbsp;SEATED
        </span>
      </p>
    ) : null;

  let buttons =
    status === 'booked' ? (
      <ReservationButtons onCancel={handleCancel} id={reservation_id} />
    ) : null;

  return (
    <li
      className="card m-1 "
      key={reservation_id}
      style={{ minWidth: '250px', maxWidth: '350px' }}
    >
      <div className="card-header d-flex flex-column">
        <h4 className="font-weight-bold">
          {first_name} {last_name}
        </h4>

        <h5 className="font-weight-bold">
          <span className="oi oi-phone" />
          &nbsp; {mobile_number}
        </h5>
      </div>
      <div className="card-body container-fluid text-center">
        <div className="row d-flex justify-content-center">
          <p className="m-0 p-0">Reservation Time:</p>
          <p className="font-weight-bold m-0 p-0">
            &nbsp; {printableTime(reservation_time)}
          </p>
        </div>
        <div className="row d-flex justify-content-center">
          <p className="p-0 m-0"> Size: </p>
          <p className="font-weight-bold m-0 p-0">&nbsp; {people}</p>
        </div>
        <div className="row d-flex justify-content-center">{resStatus}</div>
        <div className="row d-flex justify-content-center">{buttons}</div>
        <ErrorAlert error={cancelError} />
      </div>
    </li>
  );
};

export default ReservationItem;
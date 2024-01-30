import React, { useState, useEffect } from 'react';
import DatePicker from '../../Components/DatePicker/DatePicker';
import TableList from '../TableList/TableList';
import useQuery from '../../utils/useQuery';
import { listReservations, listTables } from '../../utils/api';
import ReservationList from '../ReservationList/ReservationList';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import ErrorAlert from '../../ErrorHandlers/ErrorAlert';

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

const Dashboard = ({ date }) => {
  const [loadingRes, setLoadingRes] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tableLoading, setTableLoading] = useState(true);

  const dateUrl = useQuery().get('date');
  if (dateUrl) {
    date = dateUrl;
  }

  const loadReservations = () => {
    const abortController = new AbortController();
    setReservationsError(null);
    setLoadingRes(true);

    listReservations({ date }, abortController.signal)
      .then((data) => {
        setReservations(data);
        setLoadingRes(false);
      })
      .catch(setReservationsError);

    return () => abortController.abort();
  };

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  const loadTables = () => {
    const abortController = new AbortController();
    setTablesError(null);
    setTableLoading(true);

    listTables(abortController.signal)
      .then((data) => {
        setTables(data);
        setTableLoading(false);
      })
      .catch(setTablesError);
  };

  useEffect(loadReservations, [date]);
  useEffect(loadTables, []);

  return (
    <main>
      <div className="d-md-flex flex-column mb-3">
        <DatePicker date={date} />
        <h3 className="mb-0">Reservations for date</h3>
        {loadingRes ? (
          <LoadingSpinner />
        ) : (
          <div>
            <ReservationList
              reservations={reservations}
              error={reservationsError}
              searchType="date"
            />
            <ErrorAlert error={reservationsError} />
          </div>
        )}
        <h3 className="mb-0">Table List</h3>
        {tableLoading ? (
          <LoadingSpinner />
        ) : (
          <div>
            <TableList tables={tables} />
            <ErrorAlert error={tablesError} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
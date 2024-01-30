import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { finishTable } from '../../utils/api';
import ErrorAlert from '../../ErrorHandlers/ErrorAlert';

import './Table.css';

const Table = ({ table }) => {
  const { table_name, capacity, table_id, reservation_id } = table;
  const [tableError, setTableError] = useState(null);
  const history = useHistory();

  let status = reservation_id ? 'occupied' : 'free';
  let tableShape = capacity <= 2 ? 'double' : capacity <= 4 ? 'quad' : 'great';

  const handleFinish = () => {
    if (
      window.confirm(
        'Is this table ready to seat new guests? This cannot be undone.'
      )
    ) {
      const abortController = new AbortController();
      setTableError(null);

      finishTable(table_id, abortController.signal)
        .then(() => history.go(0))
        .catch(setTableError);
      return () => abortController.abort();
    }
  };

  let editBtn = reservation_id ? null : (
    <Link to={`/tables/${table_id}/edit`}>
      <span className="oi oi-cog" />
    </Link>
  );

  let finishBtn = null;
  if (reservation_id) {
    finishBtn = (
      <button
        className="btn btn-info shadow mb-2"
        onClick={handleFinish}
        data-table-id-finish={`${table_id}`}
      >
        <span>Finish</span>
      </button>
    );
  }

  return (
    <div
      className="card tableCard m-2"
      style={{ minWidth: '250px', maxWidth: '350px' }}
      key={table_id}
    >
      <div className="card-header d-flex justify-content-between align-content-center">
        <h5 className="m-0">{table_name}</h5>
        {editBtn}
      </div>
      <div className="d-flex justify-content-center tableShape">
        <div className={`${tableShape}`} />
      </div>
      <div>
        Status:&nbsp;
        <span
          className={
            status === 'free'
              ? 'text-success font-weight-bold text-uppercase'
              : 'text-danger font-weight-bold text-uppercase'
          }
          data-table-id-status={`${table_id}`}
        >
          {status}
        </span>
      </div>
      <h5>Capacity: {capacity}</h5>
      <div className="d-flex justify-content-center">{finishBtn}</div>
      <ErrorAlert error={tableError} />
    </div>
  );
};

export default Table;
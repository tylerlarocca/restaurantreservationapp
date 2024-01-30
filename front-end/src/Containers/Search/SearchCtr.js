import React, { useState } from 'react';
import SearchForm from '../../Forms/SearchForm';
import ReservationList from '../ReservationList/ReservationList';

const SearchCtr = () => {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [searched, setSearched] = useState(false);

  return (
    <div>
      <div className="ml-5">
        <h1 className="d-md-flex text-center mt-3">Search</h1>
        <SearchForm
          setSearch={setSearched}
          setReservations={setReservations}
          setErrors={setReservationsError}
        />
      </div>
      <div className="ml-5">
        {searched ? (
          <ReservationList
            reservations={reservations}
            error={reservationsError}
            searchType="mobile number"
          />
        ) : (
          <div>
            <p>Awaiting search....</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCtr;
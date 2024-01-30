/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from './format-reservation-date';
import formatReservationTime from './format-reservation-date';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append('Content-Type', 'application/json');

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

//  Reservations

export const listReservations = async (params, signal) => {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
};

export const listReservationsByNumber = async (mobile_number, signal) => {
  const url = new URL(
    `${API_BASE_URL}/reservations?mobile_number=${mobile_number}`
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
};

export const createReservation = async (formDetails, signal) => {
  const url = new URL(`${API_BASE_URL}/reservations`);
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({ data: formDetails }),
    signal,
  };
  return await fetchJson(url, options);
};

export const getReservation = async (id, signal) => {
  const url = new URL(`${API_BASE_URL}/reservations/${id}`);
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
};

export const updateReservation = async (id, updatedInformation, signal) => {
  const url = new URL(`${API_BASE_URL}/reservations/${id}`);
  const options = {
    method: 'PUT',
    headers,
    body: JSON.stringify({ data: updatedInformation }),
    signal,
  };
  return await fetchJson(url, options);
};

export const updateStatus = async (reservation_id, newStatus, signal) => {
  const url = new URL(`${API_BASE_URL}/reservations/${reservation_id}/status`);
  const options = {
    method: 'PUT',
    headers,
    body: JSON.stringify({ data: { status: newStatus } }),
    signal,
  };
  return await fetchJson(url, options);
};

export const deleteReservation = async (id, signal) => {
  const url = new URL(`${API_BASE_URL}/reservations/${id}`);
  const options = {
    method: 'DELETE',
    headers,
    signal,
  };
  return await fetchJson(url, options);
};

// Tables

export const listTables = async (signal) => {
  const url = new URL(`${API_BASE_URL}/tables`);
  return await fetchJson(url, { headers, signal }, []);
};

export const getTable = async (tableId, signal) => {
  const url = new URL(`${API_BASE_URL}/tables/${tableId}/edit`);
  return await fetchJson(url, { headers, signal }, []);
};

export const postTable = async (tableDetails, signal) => {
  const url = new URL(`${API_BASE_URL}/tables`);
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({ data: tableDetails }),
    signal,
  };
  return await fetchJson(url, options);
};

export const updateTable = async (id, updatedInformation, signal) => {
  const url = new URL(`${API_BASE_URL}/tables/${id}/edit`);
  const options = {
    method: 'PUT',
    headers,
    body: JSON.stringify({ data: { updated: updatedInformation } }),
    signal,
  };

  return await fetchJson(url, options);
};

export const deleteTable = async (tableId, signal) => {
  const url = new URL(`${API_BASE_URL}/tables/${tableId}/edit`);
  const options = {
    method: 'DELETE',
    headers,
    signal,
  };
  return await fetchJson(url, options);
};

export const assignToTable = async (reservation_id, table_id, signal) => {
  const url = new URL(`${API_BASE_URL}/tables/${table_id}/seat`);
  const options = {
    method: 'PUT',
    headers,
    body: JSON.stringify({ data: { reservation_id } }),
    signal,
  };
  return await fetchJson(url, options);
};

export const finishTable = async (table_id, signal) => {
  const url = new URL(`${API_BASE_URL}/tables/${table_id}/seat`);
  const options = {
    method: 'DELETE',
    headers,
    signal,
  };
  return await fetchJson(url, options);
};
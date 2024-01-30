const service = require('./tables.service');
const reservationService = require('../reservations/reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

const list = async (req, res) => {
  const tables = await service.list();
  res.locals.data = tables;
  const { data } = res.locals;
  res.json({ data: data });
};

const duplicateNameCheck = async (req, res, next) => {
  const { table_name } = req.body.data;
  const tables = await service.list();
  const tableNames = tables.map((table) => table.table_name);
  if (!tableNames.includes(table_name)) {
    return next();
  }
  next({
    status: 404,
    message: 'There is already a table with this name',
  });
};

const tableNameIsValid = (tableName = '') => {
  return tableName.length > 1;
};

const capacityIsValid = (capacity) => {
  return Number.isInteger(capacity) && capacity > 0;
};

const VALID_PROPERTIES = ['table_name', 'capacity', 'reservation_id'];

const hasValidProperties = (req, res, next) => {
  const { data = {} } = req.body;
  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(', ')}`,
    });
  }
  next();
};

function hasProperties(...properties) {
  return function (req, res, next) {
    const { data = {} } = req.body;

    try {
      properties.forEach((property) => {
        if (!data[property]) {
          const error = new Error(`A '${property}' property is required.`);
          error.status = 400;
          throw error;
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

const hasRequiredProperties = hasProperties(...['table_name', 'capacity']);

const validValues = (req, res, next) => {
  const { table_name, capacity } = req.body.data;
  if (!capacityIsValid(capacity)) {
    return next({
      status: 400,
      message: 'capacity must be a whole number greater than or equal to 1',
    });
  }
  if (!tableNameIsValid(table_name)) {
    return next({
      status: 400,
      message: 'table_name must be more than one character',
    });
  }
  next();
};

const isTableValidForDeletion = (req, res, next) => {
  const { table_id } = res.locals.table;
  if (table_id < 5) {
    return next({
      status: 400,
      message: 'This is a default table and is unable to be deleted',
    });
  }
  next();
};

// CRUDL

const create = async (req, res) => {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
};

const read = async (req, res) => {
  const { table } = res.locals;
  res.json({ data: table });
};

const update = async (req, res) => {
  const { table, resId, resStatus } = res.locals;
  const updatedTable = { ...table };
  const data = await service.update(updatedTable, resId, resStatus);
  res.json({ data });
};

const updateNewTable = async (req, res) => {
  const { updated } = req.body.data;

  let data = await service.updateTable(updated);
  res.json({ data });
};

// Need to make sure the destroy function is not called if table_id is less than 5

const destroy = async (req, res, next) => {
  const { table_id } = res.locals.table;
  service
    .delete(table_id)
    .then(() => res.sendStatus(204))
    .catch(next);
};

// assigning res

const hasResId = (req, res, next) => {
  if (req.body?.data?.reservation_id) {
    res.locals.resId = req.body.data.reservation_id;
    return next();
  }
  next({
    status: 400,
    message: `reservation_id is missing from request`,
  });
};

const reservationExists = async (req, res, next) => {
  const { resId } = res.locals;
  const reservation = await reservationService.read(resId);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${resId} does not exist`,
  });
};

const reservationBooked = async (req, res, next) => {
  const { reservation } = res.locals;
  if (reservation.status !== 'seated') {
    return next();
  }
  next({
    status: 400,
    message: `Reservation ${reservation.reservation_id} is already seated`,
  });
};

const tableExist = async (req, res, next) => {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({ status: 404, message: `Table with id: ${table_id} was not found` });
};

const tableSize = (req, res, next) => {
  const { table, reservation } = res.locals;
  if (table.capacity >= reservation.people) {
    return next();
  }
  next({
    status: 400,
    message: `Table ${table.table_name} does not have the capacity for ${reservation.people} people`,
  });
};

const tableFree = (req, res, next) => {
  const { table } = res.locals;
  if (!table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `Table ${table.table_name} is already occupied`,
  });
};

const occupyTable = (req, res, next) => {
  const { table, resId } = res.locals;
  table.reservation_id = resId;
  res.locals.resStatus = 'seated';
  if (table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `Reservation ${reservation_id} could not be assigned a table`,
  });
};

const tableOccupied = (req, res, next) => {
  const { table } = res.locals;
  if (table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `Table ${table.table_name} is not occupied`,
  });
};

const removeFromTable = (req, res, next) => {
  const { table } = res.locals;
  res.locals.resId = table.reservation_id;
  table.reservation_id = null;
  res.locals.resStatus = 'finished';
  if (!table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `Table with id ${table.table_id} could not remove reservation with id ${table.reservation_id}`,
  });
};

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasValidProperties,
    hasRequiredProperties,
    validValues,
    asyncErrorBoundary(duplicateNameCheck),
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(tableExist), asyncErrorBoundary(read)],
  updateTable: [
    asyncErrorBoundary(tableExist),
    asyncErrorBoundary(updateNewTable),
  ],
  assignReservation: [
    hasResId,
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(reservationBooked),
    asyncErrorBoundary(tableExist),
    tableSize,
    tableFree,
    occupyTable,
    asyncErrorBoundary(update),
  ],
  deleteReservationId: [
    asyncErrorBoundary(tableExist),
    tableOccupied,
    removeFromTable,
    asyncErrorBoundary(update),
  ],
  delete: [
    asyncErrorBoundary(tableExist),
    isTableValidForDeletion,
    asyncErrorBoundary(destroy),
  ],
};
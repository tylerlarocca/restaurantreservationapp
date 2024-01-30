const knex = require('../db/connection');

const list = () => {
  return knex('tables').select('*').orderBy('table_name');
};

const create = (table) => {
  return knex('tables')
    .insert(table)
    .returning('*')
    .then((newTables) => newTables[0]);
};

const read = (id) => {
  return knex('tables')
    .select('*')
    .where({ table_id: id })
    .then((result) => result[0]);
};

const update = async (updatedTable, resId, updatedStatus) => {
  try {
    await knex.transaction(async (trx) => {
      const returnedTable = await trx('tables')
        .where({ table_id: updatedTable.table_id })
        .update(updatedTable, '*')
        .then((updatedTable) => updatedTable[0]);

      const returnedReservation = await trx('reservations')
        .where({ reservation_id: resId })
        .update({ status: updatedStatus }, '*')
        .then((updatedReservations) => updatedReservations[0]);
    });
  } catch (error) {
    console.error(error);
  }
};

const updateTable = (updatedTable) => {
  return knex('tables')
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, '*')
    .then((table) => table[0]);
};

const destroy = (tableId) => {
  return knex('tables').where({ table_id: tableId }).del();
};

module.exports = {
  list,
  create,
  read,
  update,
  updateTable,
  delete: destroy,
};
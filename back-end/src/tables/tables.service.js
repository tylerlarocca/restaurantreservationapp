const knex = require("../db/connection");

// list all tables - sorted by table_name
function list() {
    return knex("tables")
        .select("*")
        .orderBy("table_name");
}

// post a new table
function create(table) {
    return knex("tables")
        .insert(table)
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
}

// read a table by table_id - exists for validation purposes only
function read(table_id) {
    return knex("tables")
        .select("*")
        .where({ table_id: table_id })
        .then((readTables) => readTables[0]);
}

// seat a reservation at a table
function seat(reservation_id, table_id) {
    return knex("tables")
          .where({ table_id })
          .update({ reservation_id })
          .returning("*")
}

// finish a table
function finish(reservation_id, table_id) {
    return knex.transaction(trx => {
        return knex("reservations")
        .transacting(trx)
        .where({ reservation_id: reservation_id })
        .returning("*")
        .then(() => {
            return knex("tables")
            .where({ table_id: table_id })
            .update({ reservation_id: null })
            .returning("*");
        })
        .then(trx.commit)
        .catch(trx.rollback);
    });
}


module.exports = {
    list,
    create,
    read,
    seat,
    finish,
}
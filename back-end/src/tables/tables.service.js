const knex = require("../db/connection");

const tableName = "tables";

function list() {
  return knex(tableName).select().orderBy("table_name");
}

function create(table) {
  return knex(tableName)
    .insert(table)
    .returning("*")
    .then((createdTable) => createdTable[0]);
}

function read(table_id) {
  return knex(tableName)
    .where({ table_id })
    .returning("*")
    .then((createdTable) => createdTable[0]);
}

function readReservation(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .first();
}

function update(updatedTable) {
  return knex(tableName)
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*");
}

function clear(table_id) {
  return knex("tables")
    .where("table_id", table_id)
    .update({ reservation_id: null, occupied: false })
    .returning("*");
}

module.exports = {
  list,
  create,
  read,
  update,
  clear,
};

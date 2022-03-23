const knex = require("../db/connection");
const tableName = "reservations";

function list(date) {
  if (date) {
    return knex(tableName)
      .select()
      .where({ reservation_date: date })
      .whereNot({ status: "finished" })
      .orderBy("reservation_time");
  }
  return knex(tableName).select().orderBy("reservation_time");
}

function read(reservation_id) {
  return knex(tableName).where({ reservation_id }).first();
}

function create(reservation) {
  return knex(tableName)
    .insert(reservation)
    .returning("*")
    .then((newRes) => newRes[0]);
}

function search(mobile_number) {
  return knex(tableName)
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

function updateReservation(reservation) {
  return knex(tableName)
    .where({ reservation_id: reservation.reservation_id })
    .update(reservation, "*")
    .then((reservations) => reservations[0]);
}

function updateStatus(reservation) {
  return knex(tableName)
    .where({ reservation_id: reservation.reservation_id })
    .update({ status: reservation.status }, "*")
    .then((reservations) => reservations[0]);
}

module.exports = {
  create,
  list,
  read,
  updateReservation,
  updateStatus,
  search,
};

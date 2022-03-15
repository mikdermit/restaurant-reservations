const knex = require("../db/connection");

const tableName = "reservations";

const list = (date) => {
  if (date) {
    return knex(tableName)
      .select()
      .where({ reservation_date: date })
      .orderBy("reservation_time");
  } else {
    return knex(tableName).select().orderBy("reservation_time");
  }
};

function create(reservation) {
  return knex(tableName)
    .insert(reservation, "*")
    .then(reservations => reservations[0]);
}

const read = (reservation_id) => {
  return knex(tableName)
  .select()
  .where({ reservation_id })
  .first()
}

function phoneLookup(mobile_number) {
  return knex(tableName)
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

function updateReservation(reservation_id, updateData) {
  return knex(tableName)
    .where({ reservation_id })
    .update(updateData, "*")
}

function updateStatus(reservation_id, status) {
    return knex(tableName)
      .where({ reservation_id })
      .update({ status }, "*")
      .then(reservations => reservations[0]);
  }

module.exports = {
  list,
  create,
  read,
  phoneLookup,
  updateReservation,
  updateStatus,
};

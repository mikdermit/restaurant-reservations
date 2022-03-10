const knex = require("../../db/connection");

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

const read = (reservation_id) => {
  return knex(tableName)
  .select()
  .where({ reservation_id })
  .first()
}

const create = (newReservation) => {
  return knex(tableName).insert(newReservation, "*").then(reservations => reservations[0])
}

const updateReservation = (updatedReservation, reservation_id) => {
  return knex(tableName)
    .where({ reservation_id })
    .update(updatedReservation, "*")
}

const updateStatus = (updatedStatus, reservation_id) => {
  return knex(tableName)
        .where({ reservation_id })
        .update(updatedStatus, "*")
}

module.exports = {
  list,
  read,
  create,
  updateReservation,
  updateStatus
};

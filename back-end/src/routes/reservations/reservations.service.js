const knex = require("../../db/connection");

const tableName = "reservations";

const list = (date) => {
  if (date) {
    return knex(tableName)
      .select()
      .where({ reservation_date: date })
      .orderBy("reservation_time");
  } else {
    return knex(tableName).select().orderBy("reservation_date");
  }
};

const read = (reservationId) => {
  return knex(tableName)
  .select()
  .where({ reservationId })
}

const create = (newReservation) => {
  return knex(tableName).insert(newReservation).then(reservations => reservations[0]);
}

module.exports = {
  list,
  create
};

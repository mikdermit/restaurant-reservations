const service = require("./reservations.service")
/**
 * List handler for reservation resources
 */

 async function reservationExists(req, res, next) {
  const { reservationId } = req.params;
  const reservation = await service.read(reservationId)
  if (reservation) {
      res.locals.reservation = reservation;
      return next();
  }
  return next({ status: 404, message: "Reservation cannot be found." });
}

async function list(req, res) {
  const { date }  = req.query
  const data = await service.list(date)
  res.json({ data });
}

async function read(req, res) {
  res.json({ data: res.locals.reservation })
}

async function create(req, res) {
  const newReservation = req.body.data
  const data = await service.create(newReservation)
  res.status(201).json({ data: data[0] })
}
module.exports = {
  list,
  read: [reservationExists, read],
  create
};

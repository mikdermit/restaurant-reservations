const service = require("./reservations.service")
/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date }  = req.query
  const data = await service.list(date)
  res.json({ data });
}

async function read(req, res) {
  const { reservationId } = req.params
  const data = await service.read(reservationId)
  res.json({ data })
}

async function create(req, res) {
  const newReservation = req.body
  const data = await service.create(newReservation)
  res.status(201).json({ data })
}
module.exports = {
  list,
  create
};

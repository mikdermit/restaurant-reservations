const service = require("./reservations.service")
/**
 * List handler for reservation resources
 */

function hasRequiredFields(req, res, next) {
  const reservation = req.body.data
  
  const requiredFields = [
    'first_name',
    'last_name',
    'mobile_number',
    'reservation_date',
    'reservation_time',
    'people'
  ]
  
  if (!reservation) return next({ status: 400, message: "Request must have data."})
  
  requiredFields.forEach(field => {
    if (!reservation[field]) return next({ status: 400, message: `${field} is required.`})
  })

  next()
}

function validatePeople(req, res, next) {
  const people = req.body.data.people
  if (typeof people !== "number" || people < 1) {
    return next({ status: 400, message: "'people' must be a number greater than 0."})
  }
  next()
}

function validateDateAndTime(req, res, next) {
  const reservation = req.body.data
  const reservationDate = new Date(`${reservation.reservation_date} ${reservation.reservation_time}`)
  const todayDate = new Date()
  const hours = reservationDate.getUTCHours()
  const minutes = reservationDate.getUTCMinutes()
  const dateFormat = Date.parse(reservation.reservation_date)
  
  if (isNaN(dateFormat)) return next({ status: 400, message: "'reservation_date' is not valid."})
  if (!reservationDate.getTime()) return next({ status: 400, message: "'reservation_time' is not valid."})
  if (reservationDate.getUTCDay() === 'Tuesday') return next({ status: 400, message: "'reservation_date' cannot be on a Tuesday."})
  if (reservationDate < todayDate) return next({ status: 400, message: "'reservation_date' and 'reservation_time' must be in the future."})
  if (hours < 10 || (hours === 10 && minutes < 30)) return next({ status: 400, message: "'reservation_time' must be after 10:30"})
  if (hours > 21 || (hours === 21 && minutes > 30)) return next({ status: 400, message: `reservation_time' must be before 21:30.`})

  next()
}
 async function reservationExists(req, res, next) {
  const { reservationId } = req.params;
  const reservation = await service.read(reservationId)
  if (reservation) {
      res.locals.reservation = reservation;
      return next();
  } else return next({ status: 404, message: `Path not found: ${reservationId}` });
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
  res.status(201).json({ data })
}

async function updateReservation(req, res) {
  const { reservationId } = req.params
  const updatedReservation = req.body
  const data = await service.updateReservation(updatedReservation, reservationId)
  res.json({ data })
}

async function updateStatus(req, res) {
  const { reservationId } = req.params
  const updatedStatus = req.body
  const data = await service.updateReservation(updatedStatus, reservationId)
  res.json({data})
}

module.exports = {
  list,
  read: [reservationExists, read],
  create: [hasRequiredFields, validatePeople, validateDateAndTime, create],
  updateReservation: [hasRequiredFields, validatePeople, reservationExists, updateReservation],
  updateStatus: [reservationExists, updateStatus],
};

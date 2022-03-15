const service = require("./reservations.service")
/**
 * List handler for reservation resources
 */

const validateFields = (req, res, next) => {
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

const validatePeople = (req, res, next) => {
  const people = req.body.data.people
  if (typeof people !== "number" || people < 1) {
    return next({ status: 400, message: "'people' must be a number greater than 0."})
  }
  next()
}

const validateDate = (req, res, next) => {
  const { reservation_date } = req.body.data;
  const today = new Date();
  const reservationDate = new Date(reservation_date);
  const dateFormat = /\d\d\d\d-\d\d-\d\d/;

  if (!dateFormat.test(reservation_date))
    return next({
      status: 400,
      message: "'reservation_date' must be in 'YYYY-MM-DD' format.",
    });
  else if (reservationDate.getUTCDay() === 2)
    return next({
      status: 400,
      message:
        "Sorry we are closed on Tuesdays, please pick a different 'reservation_date'",
    });
  else if (reservationDate < today)
    return next({
      status: 400,
      message: "'reservation_date' must be made at least a day in the future",
    });

  next();
};

const validateTime = (req, res, next) => {
  const { reservation_time } = req.body.data;
  const timeFormat = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;

  if (!timeFormat.test(reservation_time))
    return next({
      status: 400,
      message:
        "'reservation_time' must be in 'HH:MM:SS' or 'HH:MM' format",
    });
  else if (reservation_time < "10:30" || reservation_time > "21:30")
    return next({
      status: 400,
      message: "reservations must be made between 10:30AM and 9:30PM",
    });

  next();
};

const validateStatus = (req, res, next) => {
  const { status } = req.body.data;
  const validOptions = ["booked", "seated", "finished", "cancelled"];

  if (!validOptions.includes(status))
    return next({ status: 400, message: `Status: ${status} is unknown.` });
  if (res.locals.reservation.status === "finished")
    return next({
      status: 400,
      message: `Reservation is finished and can't be updated.`,
    });

  next();
};

const validateBooked = (req, res, next) => {
  const newReservation = req.body.data;
  if (
    newReservation.status === "seated" ||
    newReservation.status === "finished"
  )
    return next({
      status: 400,
      message: `Status cannot be '${newReservation.status}'.  Must be 'booked' `,
    });

  next();
};

 async function reservationExists(req, res, next) {
  const { reservationId } = req.params;
  const reservation = await service.read(reservationId)
  if (reservation) {
      res.locals.reservation = reservation;
      return next();
  } else return next({ status: 404, message: `Path not found: ${reservationId}` });
}

async function list(req, res) {
  const { date } = req.query;
  const { mobile_number } = req.query;
  if (mobile_number) {
    const searchResults = await service.phoneLookup(mobile_number);
    return res.json({ data: searchResults });
  } else {
    const data = await service.list(date);
    res.json({
      data,
    });
  }
}

async function read(req, res) {
  res.json({ data: res.locals.reservation })
}

async function create(req, res) {
  const newReservation = req.body.data;
  const data = await service.create(newReservation);
  res.status(201).json({ data });
}

async function updateReservation(req, res, next) {
  const updateData = req.body.data;
  const { reservation_id } = req.params;
  const data = await service.updateReservation(...updateData, reservation_id);
  res.json({ data });
}


async function updateStatus(req, res) {
  const { reservation_id } = req.params;
  const { status } = req.body.data;
  const data = await service.updateStatus(
    reservation_id,
    status
  );
  res.json({ data });
}

module.exports = {
  list,
  read: [reservationExists, read],
  create: [validateFields, validatePeople, validateDate, validateTime, validateBooked, create],
  updateReservation: [validateFields, validatePeople, validateDate, validateTime, validateBooked, reservationExists, updateReservation],
  updateStatus: [validateStatus, reservationExists, updateStatus]
};

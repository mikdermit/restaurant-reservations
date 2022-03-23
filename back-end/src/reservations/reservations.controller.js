const service = require("./reservations.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const { date } = req.query;
  const { mobile_number } = req.query;
  // if request has mobile number, search for results
  if (mobile_number) {
    const searchResults = await service.search(mobile_number);
    return res.json({ data: searchResults });
  } else {
    const data = await service.list(date);
    res.json({
      data,
    });
  }
}

async function read(req, res, next) {
  res.json({ data: res.locals.reservation });
}

async function create(req, res, next) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function updateReservation(req, res, next) {
  const { reservation_id } = res.locals.reservation;
  const updateData = { ...req.body.data, reservation_id };
  const data = await service.updateReservation(updateData);
  res.json({ data });
}

async function updateStatus(req, res, next) {
  const { reservation_id } = req.params;
  const updateData = { ...req.body.data, reservation_id };
  const data = await service.updateStatus(updateData);
  res.json({ data });
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const foundRes = await service.read(reservation_id);
  if (foundRes) {
    res.locals.reservation = foundRes;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${reservation_id} does not exist.`,
  });
}

const isFieldsValid = (req, res, next) => {
  const reservation = req.body.data;

  const requiredFields = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];

  if (!reservation)
    return next({ status: 400, message: "Request must have data." });

  requiredFields.forEach((field) => {
    if (!reservation[field])
      return next({ status: 400, message: `${field} is required.` });
  });

  next();
};

const isDateTimeValid = (req, res, next) => {
  const { reservation_date, reservation_time } = req.body.data;
  const reservation = new Date(`${reservation_date}T${reservation_time}Z`);
  const now = new Date();
  const [hour, minute] = reservation_time.split(":");
  if (reservation_date === "not-a-date")
    next({ status: 400, message: `reservation_date not a valid date.` });
  else if (reservation_time === "not-a-time")
    next({ status: 400, message: `reservation_time not a valid time.` });
  else if (reservation.getUTCDay() === 2)
    next({
      status: 400,
      message: `Your reservation cannot be on a Tuesday (closed).`,
    });
  else if (reservation < now)
    next({ status: 400, message: `Your reservation must be in the future.` });
  else if (hour < 10 || (hour == 10 && minute < 30))
    next({
      status: 400,
      message: `'reservation_time' invalid. Restaurant is not open until 10:30AM'`,
    });
  else if (hour > 22 || (hour === 22 && minute >= 30))
    next({
      status: 400,
      message: `'reservation_time' invalid. Restaurant is closed after 10:30PM'`,
    });
  else if (hour > 21 || (hour == 21 && minute > 30))
    next({
      status: 400,
      message: `'reservation_time' invalid. Reservation must be made at least one hour prior to closing (10:30PM)'`,
    });
  next();
};

const isPeopleValid = (req, res, next) => {
  const people = req.body.data.people;
  if (typeof people !== "number" || people < 1)
    return next({
      status: 400,
      message: "'people' must be a number greater than 0.",
    });

  next();
};

const isStatusValid = (req, res, next) => {
  const statuses = ["seated", "booked", "finished", "cancelled"];
  const { status } = req.body.data;
  if (statuses.includes(status)) return next();

  next({
    status: 400,
    message: `The status cannot be ${status}, and must be "seated", "booked", "finished", or "cancelled".`,
  });
};

const isStatusBooked = (req, res, next) => {
  const invalidStatus = ["seated", "finished"];
  const { status } = res.locals.reservation
    ? res.locals.reservation
    : req.body.data;

  if (!invalidStatus.includes(status)) return next();

  next({
    status: 400,
    message: `The status cannot be ${status}, and must be "booked".`,
  });
};

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    isFieldsValid,
    isDateTimeValid,
    isPeopleValid,
    isStatusBooked,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  updateReservation: [
    isFieldsValid,
    isDateTimeValid,
    isPeopleValid,
    asyncErrorBoundary(reservationExists),
    isStatusBooked,
    asyncErrorBoundary(updateReservation),
  ],
  updateStatus: [
    isStatusValid,
    asyncErrorBoundary(reservationExists),
    isStatusBooked,
    asyncErrorBoundary(updateStatus),
  ],
};

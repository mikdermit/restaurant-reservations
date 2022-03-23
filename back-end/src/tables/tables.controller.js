const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");

async function list(req, res, next) {
  const response = await service.list();
  res.json({ data: response });
}

async function read(req, res, next) {
  res.json({ data: res.locals.table });
}

async function create(req, res, next) {
  const table = req.body.data;
  // if table already has reservation
  if (table.reservation_id) {
    // get reservation
    const reservation = await reservationsService.read(table.reservation_id);
    // change reservation status
    reservation.status = "seated";
    // change table status
    table.status = "occupied";
    // update reservation status
    await reservationsService.updateStatus(reservation);
  }
  const data = await service.create(table);
  res.status(201).json({ data });
}

async function update(req, res, next) {
  const { table, reservation } = res.locals;
  // change table reservation_id
  table.reservation_id = reservation.reservation_id;
  // change table status
  table.status = "occupied";
  // change reservation status
  reservation.status = "seated";

  const updatedTable = await service.update(table);
  const updatedRes = await reservationsService.updateStatus(reservation);
  res.json({ data: [updatedTable, updatedRes] });
}

async function clearTable(req, res, next) {
  const { table } = res.locals;
  const reservation = await reservationsService.read(table.reservation_id);
  // change table reservation_id
  table.reservation_id = null;
  // change table status
  table.status = "free";
  // change reservation status
  reservation.status = "finished";

  const updatedTable = await service.update(table);
  const updatedRes = await reservationsService.updateStatus(reservation);
  res.json({ data: [updatedTable, updatedRes] });
}

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const foundTable = await service.read(table_id);
  if (foundTable) {
    res.locals.table = foundTable;
    return next();
  } else next({ status: 404, message: `Table ${table_id} does not exist.` });
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;
  if (!reservation_id)
    return next({
      status: 400,
      message: "Request must have 'reservation_id'.",
    });
  const foundRes = await reservationsService.read(reservation_id);
  if (foundRes) {
    res.locals.reservation = foundRes;
    next();
  } else
    next({
      status: 404,
      message: `Reservation ${reservation_id} does not exist.`,
    });
}

const hasData = (req, res, next) => {
  if (!req.body.data)
    return next({ status: 400, message: "Request must have data." });
  next();
};

const isFieldsValid = (req, res, next) => {
  const table = req.body.data;
  const requiredFields = ["table_name", "capacity"];

  if (!table) return next({ status: 400, message: "Request must have data." });

  requiredFields.forEach((field) => {
    if (!table[field])
      return next({ status: 400, message: `${field} is required.` });
  });

  res.locals.newTable = table;
  next();
};

const isCapacityValid = (req, res, next) => {
  const capacity = res.locals.newTable.capacity;

  if (typeof capacity !== "number" || capacity < 1)
    return next({ status: 400, message: "capacity must be 1 or greater" });

  next();
};

const isTableNameValid = (req, res, next) => {
  const table = res.locals.newTable;

  if (table.table_name.length < 2)
    return next({
      status: 400,
      message: "table_name needs to be at least 2 characters long",
    });

  next();
};

const isStatusValid = (req, res, next) => {
  const invalidStatus = ["seated", "finished"];
  const { status } = res.locals.reservation;

  if (!invalidStatus.includes(status)) return next();

  next({
    status: 400,
    message: `The status cannot be ${status}, and must be "booked".`,
  });
};

const isOccupied = (req, res, next) => {
  if (!res.locals.table.reservation_id) next();
  else next({ status: 400, message: `Table is occupied!` });
};

const isNotOccupied = (req, res, next) => {
  if (res.locals.table.reservation_id) next();
  else next({ status: 400, message: `Table is not occupied!` });
};

async function tableFitsCapacity(req, res, next) {
  const tableLimit = res.locals.table.capacity;
  const people = res.locals.reservation.people;
  if (people <= tableLimit) next();
  else next({ status: 400, message: `Party is too large for table capacity!` });
}

module.exports = {
  read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
  list: [asyncErrorBoundary(list)],
  create: [
    isFieldsValid,
    isCapacityValid,
    isTableNameValid,
    asyncErrorBoundary(create),
  ],
  update: [
    hasData,
    asyncErrorBoundary(reservationExists),
    isStatusValid,
    asyncErrorBoundary(tableExists),
    isOccupied,
    asyncErrorBoundary(tableFitsCapacity),
    asyncErrorBoundary(update),
  ],
  delete: [
    asyncErrorBoundary(tableExists),
    isNotOccupied,
    asyncErrorBoundary(clearTable),
  ],
};

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");

/*********** Middleware functions *******************/

const validateFields = (req, res, next) => {
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

const validateCapacity = (req, res, next) => {
  const capacity = res.locals.newTable.capacity;

  if (typeof capacity !== "number" || capacity < 1)
    return next({ status: 400, message: "capacity must be 1 or greater" });

  next();
};

const validateTableName = (req, res, next) => {
  const table = res.locals.newTable;

  if (table.table_name.length < 2)
    return next({
      status: 400,
      message: "table_name needs to be at least 2 characters long",
    });

  next();
};
// MIDDLEWARE (1) - UPDATE
async function doesTableExists(req, res, next) {
    const tableId = req.params.table_id;
    const foundTable = await service.read((tableId));
    if (!foundTable) {
        return next({
            status: 404,
            message: `Table ${tableId} not found.`,
        });
    }
    res.locals.table = foundTable;
    next();
}
// MIDDLEWARE (2) - UPDATE
async function isTableInUse(req, res, next) {
    if (!req.body.data || !req.body.data.reservation_id) {
        return next({
            status: 400,
            message: `Request body must have a data property, reservation_id does not exist, or table is not occupied.`,
        });
    }
    next();
}
// MIDDLEWARE (3) - UPDATE
async function isSeatReservationValid(req, res, next) {
    const foundTable = res.locals.table;
//     if (!req.body.data) {
//         return next({
//             status: 400,
//             message: "Request body must have a 'data' property.",
//         });
//     }
//     next();
// }
// MIDDLEWARE (4) - UPDATE
// async function checkReservationRequirements(req, res, next) {
    const foundReservation = await reservationsService.read(req.body.data.reservation_id);

    if (!foundReservation) {
        return next({
            status: 404,
            message: `Reservation for id ${req.body.data.reservation_id} not found.`,
        });
    }
    if (foundTable.reservation_id) {
            return next({
                status: 400,
                message: "Table is already occupied.",
            });
        }
    if (foundReservation.people > foundTable.capacity) {
            return next({
                status: 400,
                message: "Party size exceeds table capacity, in suffiecient seats.",
            });
        }
    if (foundReservation.status === "seated") {
            return next({
                status: 400,
                message: "Party has already been seated",
            });
        }
    next()
}
// MIDDLEWARE - DELETE
async function isTableOccupied(req, res, next) {
    const tableId = req.params.table_id;
    const foundTable = await service.read(tableId);
    if(!foundTable.reservation_id) {
        return next({
            status: 400,
            message: "Table is not occupied"
        })
    }
    next();
}

// ********** CRUD ************ //

async function list(req, res) {
    const response = await service.list();
    res.json({data: response});
}

// async function seatReservation(req, res) {
//     const {reservation_id} = req.body.data;
//     const {table} = res.locals;
//     const data = await service.setReservationToTable(table.table_id, Number(reservation_id));
//     await reservationsService.updateReservationAfterTableReset(Number(reservation_id), "seated");
//     res.json({data});
// }

async function create(req, res) {
    const newTable = res.locals.newTable;
    const data = await service.create(newTable);
    res.status(201).json({data: data});
}

async function update(req, res) {
    const {reservation_id} = req.body.data;
    const updatedTable = {
        ...res.locals.table,
        reservation_id: req.body.data.reservation_id,
      };
    const data = await service.update(updatedTable);
    await reservationsService.updateStatus(reservation_id, "seated");
    res.status(200).json({ data });
}

// DELETE
async function destroy(req, res, next) {
    const table = res.locals.table;
    const { reservation_id, table_id } = table;
    const data = await service.clear(table_id);
    await reservationsService.updateStatus(
        reservation_id,
        "finished"
    );
    res.status(200).json({data});
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    create: [validateFields, validateCapacity, validateTableName, asyncErrorBoundary(create)],
    update: [
        asyncErrorBoundary(doesTableExists),
        asyncErrorBoundary(isTableInUse),
        asyncErrorBoundary(isSeatReservationValid),
        asyncErrorBoundary(update)
    ],
    delete: [
        asyncErrorBoundary(doesTableExists),
        asyncErrorBoundary(isTableOccupied),
        asyncErrorBoundary(destroy)],
};
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
    const { reservation_id } = req.body.data;
    if (reservation_id) {
      const reservation = res.locals.reservation;
      reservation.status = "seated";
      req.body.data.status = "occupied";
      await reservationsService.updateReservation(reservation, req.body.data);
    }
    const data = await service.create(req.body.data);
    res.status(201).json({ data });
  }
  
  
  async function update(req, res, next) {
    const { table, reservation } = res.locals;
    table.reservation_id = reservation.reservation_id;
    table.status = "occupied";
    reservation.status = "seated";
  
    const updatedTable = await service.update(table);
    const updatedRes = await reservationsService.updateReservation(reservation, table);
    res.json({ data: [updatedTable, updatedRes] });
  }
  
  
  async function clearTable(req, res, next) {
    const { table } = res.locals;
    const reservation = await reservationsService.read(table.reservation_id);
    table.reservation_id = null;
    table.status = "free";
    reservation.status = "finished";
  
    const updatedTable = await service.update(table);
    const updatedRes = await reservationsService.updateReservation(reservation, table);
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
    if (!reservation_id) return next({ status: 400, message: "Request must have 'reservation_id'." })
    const foundRes = await reservationsService.read(reservation_id);
    if (foundRes) {
      res.locals.reservation = foundRes;
      next();
    } else next({status: 404, message: `Reservation ${reservation_id} does not exist.`});
  }

  const hasData = (req, res, next) => {
      if (!req.body.data) return next({ status: 400, message: "Request must have data." })
      next()
  }

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
    const validStatus = "booked"
    const { status } = res.locals.reservation;
    if (status === validStatus) return next();
    console.log(`${status} ----------------------------------------------------------------`) 
    next({
      status: 400,
      message: `The status cannot be ${status}, and must be "booked".`
    });
  };

  const isFinished = (req, res, next) => {
    if (res.locals.reservation.status === "finished") next({ status: 400, message: `Reservation is already finished!` });
    else next();
  }
  
  const isOccupied = (req, res, next) => {
    if (!res.locals.table.reservation_id) next();
    else next({ status: 400, message: `Table is occupied!` });
  }
  
  const isNotOccupied = (req, res, next) => {
    if (res.locals.table.reservation_id) next();
    else next({ status: 400, message: `Table is not occupied!` });
  }
  
  async function tableFitsCapacity(req, res, next) {
    const tableLimit = res.locals.table.capacity;
    const people = res.locals.reservation.people;
    if (people <= tableLimit) next();
    else next({status: 400, message: `Party is too large!`});
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
/*********** Middleware functions *******************/

// const validateFields = (req, res, next) => {
//   const table = req.body.data;
//   const requiredFields = ["table_name", "capacity"];

//   if (!table) return next({ status: 400, message: "Request must have data." });

//   requiredFields.forEach((field) => {
//     if (!table[field])
//       return next({ status: 400, message: `${field} is required.` });
//   });

//   res.locals.newTable = table;
//   next();
// };

// const validateCapacity = (req, res, next) => {
//   const capacity = res.locals.newTable.capacity;

//   if (typeof capacity !== "number" || capacity < 1)
//     return next({ status: 400, message: "capacity must be 1 or greater" });

//   next();
// };

// const validateTableName = (req, res, next) => {
//   const table = res.locals.newTable;

//   if (table.table_name.length < 2)
//     return next({
//       status: 400,
//       message: "table_name needs to be at least 2 characters long",
//     });

//   next();
// };
// // MIDDLEWARE (1) - UPDATE
// async function doesTableExists(req, res, next) {
//     const tableId = req.params.table_id;
//     const foundTable = await service.read((tableId));
//     if (!foundTable) {
//         return next({
//             status: 404,
//             message: `Table ${tableId} not found.`,
//         });
//     }
//     res.locals.table = foundTable;
//     next();
// }
// // MIDDLEWARE (2) - UPDATE
// async function isTableInUse(req, res, next) {
//     if (!req.body.data || !req.body.data.reservation_id) {
//         return next({
//             status: 400,
//             message: `Request body must have a data property, reservation_id does not exist, or table is not occupied.`,
//         });
//     }
//     next();
// }
// // MIDDLEWARE (3) - UPDATE
// async function isSeatReservationValid(req, res, next) {
//     const foundTable = res.locals.table;
// //     if (!req.body.data) {
// //         return next({
// //             status: 400,
// //             message: "Request body must have a 'data' property.",
// //         });
// //     }
// //     next();
// // }
// // MIDDLEWARE (4) - UPDATE
// // async function checkReservationRequirements(req, res, next) {
//     const foundReservation = await reservationsService.read(req.body.data.reservation_id);

//     if (!foundReservation) {
//         return next({
//             status: 404,
//             message: `Reservation for id ${req.body.data.reservation_id} not found.`,
//         });
//     }
//     if (foundTable.reservation_id) {
//             return next({
//                 status: 400,
//                 message: "Table is already occupied.",
//             });
//         }
//     if (foundReservation.people > foundTable.capacity) {
//             return next({
//                 status: 400,
//                 message: "Party size exceeds table capacity, in suffiecient seats.",
//             });
//         }
//     if (foundReservation.status === "seated") {
//             return next({
//                 status: 400,
//                 message: "Party has already been seated",
//             });
//         }
//     next()
// }
// // MIDDLEWARE - DELETE
// async function isTableOccupied(req, res, next) {
//     const tableId = req.params.table_id;
//     const foundTable = await service.read(tableId);
//     if(!foundTable.reservation_id) {
//         return next({
//             status: 400,
//             message: "Table is not occupied"
//         })
//     }
//     next();
// }

// // ********** CRUD ************ //

// async function list(req, res) {
//     const response = await service.list();
//     res.json({data: response});
// }

// // async function seatReservation(req, res) {
// //     const {reservation_id} = req.body.data;
// //     const {table} = res.locals;
// //     const data = await service.setReservationToTable(table.table_id, Number(reservation_id));
// //     await reservationsService.updateReservationAfterTableReset(Number(reservation_id), "seated");
// //     res.json({data});
// // }

// async function create(req, res) {
//     const newTable = res.locals.newTable;
//     const data = await service.create(newTable);
//     res.status(201).json({data: data});
// }

// async function update(req, res) {
//     const {reservation_id} = req.body.data;
//     const updatedTable = {
//         ...res.locals.table,
//         reservation_id: req.body.data.reservation_id,
//       };
//     const data = await service.update(updatedTable);
//     await reservationsService.updateStatus(reservation_id, "seated");
//     res.status(200).json({ data });
// }

// // DELETE
// async function destroy(req, res, next) {
//     const table = res.locals.table;
//     const { reservation_id, table_id } = table;
//     const data = await service.clear(table_id);
//     await reservationsService.updateStatus(
//         reservation_id,
//         "finished"
//     );
//     res.status(200).json({data});
// }

// module.exports = {
//     list: [asyncErrorBoundary(list)],
//     create: [validateFields, validateCapacity, validateTableName, asyncErrorBoundary(create)],
//     update: [
//         asyncErrorBoundary(doesTableExists),
//         asyncErrorBoundary(isTableInUse),
//         asyncErrorBoundary(isSeatReservationValid),
//         asyncErrorBoundary(update)
//     ],
//     delete: [
//         asyncErrorBoundary(doesTableExists),
//         asyncErrorBoundary(isTableOccupied),
//         asyncErrorBoundary(destroy)],
// };
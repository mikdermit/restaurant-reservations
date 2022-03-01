const service = require("./reservations.service")
/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const data = await service.list()
  res.json(data);
}

module.exports = {
  list,
};

const AppointmentService = require("../services/AppointmentService");
const PGInvalidRequestError = require("../common/errors/PGInvalidRequestError");

async function Appoint(req, res) {
  try {
    if (req && req.body) {
      let appointResponse = await AppointmentService.Appoint(req.body);
      res.json(appointResponse);
    } else throw new PGInvalidRequestError("Invalid Request");
  } catch (error) {
    throw error;
  }
}

async function Get(req, res) {
  try {
    if (req && req.body) {
      let response = await AppointmentService.Get(req.body);
      res.json(response);
    } else throw new PGInvalidRequestError("Invalid Request");
  } catch (error) {
    throw error;
  }
}

module.exports = { Appoint, Get };

const UserService = require("../services/UserService");
const PGInvalidRequestError = require("../common/errors/PGInvalidRequestError");

async function Signin(req, res) {
  try {
    if (req && req.body) {
      let signinResponse = await UserService.Signin(req.body);
      res.json(signinResponse);
    } else throw new PGInvalidRequestError("Invalid Request");
  } catch (error) {
    throw error;
  }
}

module.exports = { Signin };

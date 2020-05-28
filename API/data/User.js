const DataSource = require("./common/DataSource");
const PGAuthenticationError = require("../common/errors/PGAuthenticationError");

async function Signin(email) {
  let resultData = {};
  try {
    const connection = await DataSource.GetConnection();
    try {
      const data = await connection.query(
        'select * from "Users" where "Email"= $1 ;',
        [email]
      );
      if (data && data.rowCount > 0) resultData = data.rows[0];
      else throw new PGAuthenticationError("Invalid Email");
    } finally {
      connection.release();
    }
  } catch (error) {
    throw error;
  }
  return resultData;
}

module.exports = { Signin };

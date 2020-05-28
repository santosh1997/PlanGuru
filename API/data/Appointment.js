const DataSource = require("./common/DataSource");
const PGAuthenticationError = require("../common/errors/PGAuthenticationError");

async function Get(fetchCriteria) {
  let resultData = [];
  try {
    const connection = await DataSource.GetConnection();
    try {
      const data = await connection.query(
        'SELECT * FROM "Appointments" WHERE "AppointmentTime" >= $1 AND "AppointmentTime" <= $2 AND "AppointedUserId" = $3;',
        [
          fetchCriteria.startDateTime,
          fetchCriteria.endDateTime,
          fetchCriteria.UserId,
        ]
      );
      if (data && data.rowCount > 0)
        resultData = data.rows.map((row) =>
          getStandardizedTimeStamp(row.AppointmentTime)
        );
    } finally {
      connection.release();
    }
  } catch (error) {
    throw error;
  }
  return resultData;
}

async function Appoint(requestData) {
  let resultData = [];
  try {
    const connection = await DataSource.GetConnection();
    try {
      const data = await connection.query(
        'INSERT INTO "Appointments" ("Id", "AppointedUserId", "AppointmentTime", "RequestorUserId") values (uuid_generate_v4(), $1, $2, $3);',
        [
          requestData.userId,
          requestData.appointmentDateTime,
          requestData.requestorId,
        ]
      );
      resultData = { message: "Appointment created successfully." };
    } finally {
      connection.release();
    }
  } catch (error) {
    throw error;
  }
  return resultData;
}

/*private function*/

function getStandardizedTimeStamp(dateObj) {
  return new Date(
    Date.UTC(
      dateObj.getFullYear(),
      dateObj.getMonth(),
      dateObj.getDate(),
      dateObj.getHours()
    )
  ).toISOString();
}

module.exports = { Get, Appoint };

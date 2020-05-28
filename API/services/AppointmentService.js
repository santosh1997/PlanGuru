const Appointment = require("../data/Appointment");
const PGInvalidRequestError = require("../common/errors/PGInvalidRequestError");
/*public function*/
async function Get(requestData) {
  try {
    ValidateGetRequest(requestData);
    const endDateTimeObj = new Date(requestData.startDateTime);
    endDateTimeObj.setHours(endDateTimeObj.getHours() + 16);
    endDateTime = endDateTimeObj.toString();
    const fetchCriteria = {
      startDateTime: getStandardizedTimeStamp(requestData.startDateTime),
      endDateTime: getStandardizedTimeStamp(endDateTime),
      UserId: requestData.UserId,
    };
    return GetNormalizedAppointments(
      await Appointment.Get(fetchCriteria),
      requestData.startDateTime
    );
  } catch (error) {
    throw error;
  }
}

async function Appoint(requestData) {
  try {
    ValidateAppointRequest(requestData);
    return await Appointment.Appoint(requestData);
  } catch (error) {
    throw error;
  }
}

/*private function*/

function ValidateGetRequest(requestData) {
  try {
    if (!requestData.UserId) throw new PGInvalidRequestError("Invalid User");
    if (
      !(requestData.startDateTime && Date.parse(requestData.startDateTime) >= 0)
    )
      throw new PGInvalidRequestError("Invalid Date");
  } catch (error) {
    throw error;
  }
}

function ValidateAppointRequest(requestData) {
  try {
    if (!requestData.userId) throw new PGInvalidRequestError("Invalid User");
    if (
      !(
        requestData.appointmentDateTime &&
        Date.parse(requestData.appointmentDateTime) >= 0
      )
    )
      throw new PGInvalidRequestError("Invalid Date");
  } catch (error) {
    throw error;
  }
}

function getStandardizedTimeStamp(dateString) {
  var date = new Date(dateString);

  return `${date.getUTCFullYear().toString().padStart(4, "0")}-${(
    date.getUTCMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${date
    .getUTCDate()
    .toString()
    .padStart(2, "0")} ${date
    .getUTCHours()
    .toString()
    .padStart(2, "0")}:${date
    .getUTCMinutes()
    .toString()
    .padStart(2, "0")}:${date.getUTCSeconds().toString().padStart(2, "0")}`;
}

function GetNormalizedAppointments(responseData, startDateTime) {
  const startDateObj = new Date(startDateTime),
    normalizedResult = [];
  startDateObj.setUTCMinutes(0, 0, 0);
  for (let i = 0; i < 16; i++) {
    const ISOString = startDateObj.toISOString();
    normalizedResult.push({
      date: ISOString,
      isAppointed: responseData.includes(ISOString),
    });
    startDateObj.setHours(startDateObj.getHours() + 1);
  }
  return normalizedResult;
}
module.exports = { Get, Appoint };

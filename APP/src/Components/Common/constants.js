const HeaderContentJson = new Headers();
HeaderContentJson.append("Content-Type", "application/json");

const API_CONSTANTS = {
  apiBaseURL: "http://localhost:55245",
  signinRelativeURL: "/signin",
  getAppointmentsRelativeURL: "/appointments/get",
  bookAppointmentRelativeURL: "/appointments/appoint",
  getMethod: "GET",
  postMethod: "POST",
  headerContentJson: HeaderContentJson,
};

const APP_URL = {
  appointmentURL: "/appointments",
  homeURL: "/",
};

export { API_CONSTANTS, APP_URL };

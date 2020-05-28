import React, { useState, useEffect } from "react";
import Spinner from "../Common/Spinner";
import { API_CONSTANTS, APP_URL } from "../Common/constants";
import moment from "moment";
import { withRouter } from "react-router-dom";

function AppointmentPage({ history }) {
  const getISODate = (dateObj) => {
    dateObj.setHours(8, 0, 0, 0);
    return dateObj.toISOString();
  };

  // Basically this selectedUesrId will be sent through props
  const selectedUser = {
    Id: "5f7567a0-c7d0-44be-9ff7-b202f923b4eb",
    Name: "San",
    Email: "san@mailinator.com",
    Timezone: "Asia/Taipei",
  };

  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getISODate(new Date()));
  const [appointments, setAppointments] = useState([]);
  const initialDate = moment(new Date()).format("MM/DD/YYYY");

  const increaseSelectedDate = () => {
    try {
      const selectedDateObj = new Date(
        moment(selectedDate, moment.ISO_8601).format("MM/DD/YYYY")
      );
      selectedDateObj.setHours(selectedDateObj.getHours() + 24);
      setSelectedDate(getISODate(selectedDateObj));
    } catch (e) {
      console.log(e);
    }
  };

  const decreaseSelectedDate = () => {
    try {
      if (
        moment(selectedDate, moment.ISO_8601).format("MM/DD/YYYY") !==
        initialDate
      ) {
        const selectedDateObj = new Date(
          moment(selectedDate, moment.ISO_8601).format("MM/DD/YYYY")
        );
        selectedDateObj.setHours(selectedDateObj.getHours() - 24);
        setSelectedDate(getISODate(selectedDateObj));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const bookAppointment = async (isAppointed, dateTimeISO) => {
    if (!isAppointed) {
      setLoading(true);
      (async () => {
        try {
          const signedInUserId = localStorage.getItem("UserId"),
            requestOptions = {
              method: API_CONSTANTS.postMethod,
              body: JSON.stringify({
                userId: selectedUser.Id,
                appointmentDateTime: dateTimeISO,
                requestorId: signedInUserId ? signedInUserId : null,
              }),
              headers: API_CONSTANTS.headerContentJson,
            };

          await fetch(
            API_CONSTANTS.apiBaseURL + API_CONSTANTS.bookAppointmentRelativeURL,
            requestOptions
          );
        } catch (e) {
          history.push(APP_URL.homeURL);
        }
      })();
      history.push(APP_URL.homeURL);
    }
  };

  useEffect(() => {
    setAppointments([]);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        var requestOptions = {
          method: API_CONSTANTS.postMethod,
          body: JSON.stringify({
            UserId: selectedUser.Id,
            startDateTime: selectedDate,
          }),
          headers: API_CONSTANTS.headerContentJson,
        };

        const data = await fetch(
            API_CONSTANTS.apiBaseURL + API_CONSTANTS.getAppointmentsRelativeURL,
            requestOptions
          ),
          jsonData = await data.json();
        setAppointments(jsonData);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    })();
  }, [selectedDate, selectedUser.Id]);

  return (
    <div className="AppointmentPage">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="pg-user-details-container">
            <div className="pg-user-details-head-txt">
              Making reservations with
            </div>
            <div className="pg-user-details-wrapper">
              <span className="pg-user-details-name">{selectedUser.Name}</span>
              <span className="pg-user-details-timezone">
                {selectedUser.Timezone}
              </span>
            </div>
            <div className="pg-appointments-container">
              <div className="pg-selected-date-container">
                <span
                  className={
                    "pg-selected-date-decrement" +
                    (moment(selectedDate, moment.ISO_8601).format(
                      "MM/DD/YYYY"
                    ) === initialDate
                      ? " disabled "
                      : " ")
                  }
                  onClick={decreaseSelectedDate}
                >
                  {"<"}
                </span>
                <span className="pg-selected-date-value">
                  {moment(selectedDate, moment.ISO_8601).format("Do MMMM YYYY")}
                </span>
                <span
                  className="pg-selected-date-increment"
                  onClick={increaseSelectedDate}
                >
                  {">"}
                </span>
              </div>
              <div className="pg-appointments-list">
                {appointments.map((appointment) => {
                  return (
                    <div
                      className={
                        "pg-appointment-time-container" +
                        (appointment.isAppointed
                          ? " appointed-appointment "
                          : " available-appointment ")
                      }
                    >
                      <span
                        className="pg-appointment-time-txt"
                        onClick={() =>
                          bookAppointment(
                            appointment.isAppointed,
                            appointment.date
                          )
                        }
                      >
                        {moment(appointment.date, moment.ISO_8601).format(
                          "hh:mm A"
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default withRouter(AppointmentPage);

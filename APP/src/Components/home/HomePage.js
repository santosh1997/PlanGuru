import React, { useState, useEffect } from "react";
import { API_CONSTANTS, APP_URL } from "../Common/constants";
import Spinner from "../Common/Spinner";
import { withRouter } from "react-router-dom";

function HomePage({ history }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const signin = async () => {
    try {
      setLoading(true);
      var requestOptions = {
        method: API_CONSTANTS.postMethod,
        body: JSON.stringify({ Email: email }),
        headers: API_CONSTANTS.headerContentJson,
      };

      const data = await fetch(
          API_CONSTANTS.apiBaseURL + API_CONSTANTS.signinRelativeURL,
          requestOptions
        ),
        jsonData = await data.json();

      if (jsonData && jsonData.Id) {
        localStorage.setItem("UserId", jsonData.Id);
        localStorage.setItem("UserTimeZone", jsonData.Timezone);
        history.push(APP_URL.appointmentURL);
      } else setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const signinAnonymous = () => {
    history.push(APP_URL.appointmentURL);
  };

  useEffect(() => {
    (async () => {
      setLoading(false);
      setEmail("");
      localStorage.setItem("UserId", "");
      localStorage.setItem("UserTimeZone", "");
    })();
  }, []);

  return (
    <div className="HomePage">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="pg-home-hello-txt">Hello!</div>
          <div className="pg-home-login-txt">Login to your account</div>
          <div className="pg-home-form-group">
            <div className="pg-home-email-input-container">
              <input
                className="pg-home-email-input"
                placeholder="Email Address"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="pg-home-login-btn-container">
              <button className="pg-home-login-btn" onClick={signin}>
                Login
              </button>
              <button className="pg-home-skip-btn" onClick={signinAnonymous}>
                Skip Login
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default withRouter(HomePage);

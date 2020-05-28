import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./Components/home/HomePage";
import AppointmentPage from "./Components/appointment/AppointmentPage";
import Header from "./Components/Common/header/Header";
import PageNotFound from "./Components/Common/PageNotFound";
import "./App.css";

function App() {
  return (
    <div className="App pg-app-container">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/Appointments" component={AppointmentPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;

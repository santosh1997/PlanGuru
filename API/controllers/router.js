const express = require("express");
const UserController = require("../controllers/UserController");
const AppointmentController = require("../controllers/AppointmentController");

const router = express.Router();

const getRoute = (routeFunction) => {
  return async (req, res, next) => {
    try {
      await routeFunction(req, res);
    } catch (error) {
      next(error);
    }
  };
};

router.get("/", (req, res) => {
  res.json({ Status: "Server is running..." });
});
router.post("/signin", getRoute(UserController.Signin));
router.post("/appointments/get", getRoute(AppointmentController.Get));
router.post("/appointments/appoint", getRoute(AppointmentController.Appoint));

module.exports = router;

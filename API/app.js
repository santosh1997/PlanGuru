const express = require("express");
const bodyParser = require("body-parser");
const router = require("./controllers/router");
const handleError = require("./common/errors/globalErrorHandler");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  // Port you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.APP_URL);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use("/", router);

app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(process.env.PORT, function () {
  console.log(`Server Started at Port ${process.env.PORT}...`);
});

module.exports = router;

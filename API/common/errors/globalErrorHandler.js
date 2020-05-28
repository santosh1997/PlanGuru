const handleError = (err, res) => {
  let { statusCode, message, name } = err;
  statusCode = statusCode ? statusCode : "500";
  message =
    name && name.startsWith("PG") ? message : "Error processing your request.";
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

module.exports = handleError;

class PGInvalidRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "PGInvalidRequestError";
    this.statusCode = "200";
  }
}

module.exports = PGInvalidRequestError;

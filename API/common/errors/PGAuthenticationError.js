class PGAuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "PGAuthenticationError";
    this.statusCode = "401";
  }
}

module.exports = PGAuthenticationError;

const User = require("../data/User");

async function Signin(signinRequest) {
  try {
    return await User.Signin(signinRequest.Email);
  } catch (error) {
    throw error;
  }
}

module.exports = { Signin };

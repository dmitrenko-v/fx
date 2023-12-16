const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "15m",
    });
  },

  generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
      expiresIn: "7d",
    });
  },
};

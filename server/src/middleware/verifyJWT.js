const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../utils/generateTokens");
const { User } = require("../models");

async function verifyJWT(req, res, next) {
  try {
    const { userId } = req.body;
    const { refreshToken } = req.cookies;
    let { accessToken } = req.cookies;
    console.log(req.cookies);
    if (!refreshToken) return res.sendStatus(401);

    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_KEY,
      (err, decoded) => {
        if (err) return res.sendStatus(401);
        return decoded.userId;
      },
    );

    console.log(decodedToken);

    const user = await User.findByPk(decodedToken, {
      attributes: { exclude: ["password"] },
    });

    if (!user) return res.sendStatus(401);

    if (!accessToken) {
      accessToken = generateAccessToken({ userId });
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 15 * 60 * 1000,
      });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = verifyJWT;

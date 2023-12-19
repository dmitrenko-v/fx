const bcrypt = require("bcrypt");
const { User } = require("../models");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateTokens");

const { validateNewUser } = require("../utils/validators");

module.exports = {
  async register(req, res) {
    try {
      const {
        firstName,
        lastName,
        userName,
        email,
        password,
      } = req.body;
      if (!validateNewUser(firstName, lastName, userName, email, password)) {
        return res.status(400).json({ error: "Invalid data format" });
      }

      if (await User.findOne({ where: { email } })) {
        return res
          .status(409)
          .json({ error: "User with given email already exist" });
      }

      if (await User.findOne({ where: { userName } })) {
        return res
          .status(409)
          .json({ error: "User with given username already exist" });
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        firstName,
        lastName,
        userName,
        email,
        password: hashedPassword,
      });

      const accessToken = generateAccessToken({ userId: user.id });
      const refreshToken = generateRefreshToken({ userId: user.id });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 15 * 60 * 1000,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      delete user.password;

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async login(req, res) {
    try {
      let { refreshToken } = req.cookies;
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      if (!refreshToken) {
        refreshToken = generateRefreshToken({ userId: user.id });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
      }
      const accessToken = generateAccessToken({ userId: user.id });
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 15 * 60 * 1000,
      });

      delete user.password;

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async getSession(req, res) {
    return res.status(200).json(req.user);
  },

  async logout(req, res) {
    try {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });

      return res.status(200).json({ message: "User logged out successfully" });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

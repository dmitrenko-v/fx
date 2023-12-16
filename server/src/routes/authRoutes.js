const express = require("express");
const {
  register,
  login,
  getSession,
  logout,
} = require("../controllers/authController");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/session", verifyJWT, getSession);

module.exports = router;

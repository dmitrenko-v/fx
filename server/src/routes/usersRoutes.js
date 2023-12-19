const express = require("express");
const { getUserController } = require("../controllers/usersController");

const router = express.Router();

router.get("/:id", getUserController);

module.exports = router;

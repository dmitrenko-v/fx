const { Sequelize } = require("sequelize");
require("dotenv").config();
const config = require("./src/config/config.json")[process.env.NODE_ENV];

async function initDB() {
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
  try {
    await sequelize.authenticate();
  } catch (err) {
    throw new Error("Unable to connect to database");
  }
}

module.exports = initDB;

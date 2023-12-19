const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const initDB = require("./db");
const { postsRoutes, authRoutes, usersRoutes } = require("./src/routes");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:4173"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/posts", postsRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  await initDB();
  console.log(`Server started at port ${PORT}`);
});

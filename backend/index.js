const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");

const { expressLogger, logger } = require("./utils/logger");

const app = express();
app.use(expressLogger);

app.use(bodyParser.urlencoded({extended:  true}));
app.use(bodyParser.json());

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", usersRouter);

app.all("/*", (req, res, next) => {
  next(new Error("Resource unavailable"));
});

process.on("unhandledRejection", (err) => {
  logger.warn(err);
  process.exit(1);
});
process.on("uncaughtException", (err) => {
  logger.warn(err);
  process.exit(1);
});

module.exports = app;

const express = require("express");
const routes = require("../routes");
const rawDataLastController = require("../controller/rawDataLastController");

const rawDataLastRouter = express.Router();

rawDataLastRouter.get(
  routes.getRawDataLast,
  rawDataLastController.getRawDataLast
);
rawDataLastRouter.get(
  routes.updateRawDataLast,
  rawDataLastController.updateRawDataLast
);

module.exports = rawDataLastRouter;

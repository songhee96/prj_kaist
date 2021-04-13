const express = require("express");
const routes = require("../routes");
const totalTrafficChartController = require("../controller/totalTrafficChartController");

const totalTrafficChartRouter = express.Router();

totalTrafficChartRouter.get(
  routes.getTotalTrafficChartData,
  totalTrafficChartController.getTotalTrafficChartData
);


module.exports = totalTrafficChartRouter;

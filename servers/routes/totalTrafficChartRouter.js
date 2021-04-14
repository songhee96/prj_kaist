const express = require("express");
const routes = require("../routes");
const totalTrafficChartController = require("../controller/totalTrafficChartController");

const totalTrafficChartRouter = express.Router();

totalTrafficChartRouter.get(
  routes.getTotalTrafficHAC1Data,
  totalTrafficChartController.getTotalTrafficHAC1Data
);

totalTrafficChartRouter.get(
  routes.getTotalTrafficHAC2Data,
  totalTrafficChartController.getTotalTrafficHAC2Data
);
totalTrafficChartRouter.post(
  routes.getTrafficChartData,
  totalTrafficChartController.getTrafficChartData
);

module.exports = totalTrafficChartRouter;

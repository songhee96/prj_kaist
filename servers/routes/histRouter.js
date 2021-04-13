const express = require("express");
const routes = require("../routes");
const histController = require("../controller/histController");

const histRouter = express.Router();

histRouter.get(routes.getRawData, histController.getRawData);
histRouter.get(routes.getRawDataStats, histController.getRawDataStats);
histRouter.get(routes.getTbLink, histController.getTbLink);
histRouter.get(routes.getEvent, histController.getEvent);
histRouter.get(routes.getMainEvent, histController.getMainEvent);
histRouter.get(routes.addRawData, histController.addRawData);
histRouter.get(routes.addTbLink, histController.addTbLink);
histRouter.get(routes.addEvent, histController.addEvent);

module.exports = histRouter;

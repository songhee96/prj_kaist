const express = require("express");
const routes = require("../routes");
const subnetConfigInfoController = require("../controller/subnetConfigInfoController");

const subnetConfigInfoRouter = express.Router();

subnetConfigInfoRouter.get(
  routes.getSubnetConfigInfo,
  subnetConfigInfoController.getSubnetConfigInfo
);
subnetConfigInfoRouter.get(
  routes.updateSubnetConfigInfo,
  subnetConfigInfoController.updateSubnetConfigInfo
);

module.exports = subnetConfigInfoRouter;

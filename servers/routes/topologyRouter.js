const express = require("express");
const routes = require("../routes");
const topologyController = require("../controller/topologyController");

const topologyRouter = express.Router();

topologyRouter.get(routes.getTopology, topologyController.getTopology);

module.exports = topologyRouter;

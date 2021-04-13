const express = require("express");
const routes = require("../routes");
const treeController = require("../controller/treeController");

const treeRouter = express.Router();

treeRouter.get(routes.getTree, treeController.getTree);

module.exports = treeRouter;

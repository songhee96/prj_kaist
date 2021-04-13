const express = require("express");
const routes = require("../routes");
const tbController = require("../controller/tbController");

const tbRouter = express.Router();

tbRouter.get(routes.getTbNodes, tbController.getTbNodes);
tbRouter.get(routes.getTbLinks, tbController.getTbLinks);
tbRouter.get(routes.getTbLinkStatus, tbController.getTbLinkStatus);
tbRouter.get(routes.addTbNodes, tbController.addTbNodes);
tbRouter.get(routes.addTbLinks, tbController.addTbLinks);
tbRouter.get(routes.updateTbNodes, tbController.updateTbNodes);
tbRouter.get(routes.updateTbLinks, tbController.updateTbLinks);
tbRouter.get(routes.updateTbLinkStatus, tbController.updateTbLinkStatus);

module.exports = tbRouter;

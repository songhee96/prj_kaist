const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 301;
const routes = require("./routes");
const morgan = require("morgan");

const subnetConfigInfoRouter = require("./routes/subnetConfigInfoRouter");
const histRouter = require("./routes/histRouter");
const tbRouter = require("./routes/tbRouter");
const rawDataLastRouter = require("./routes/rawDataLastRouter");
const treeRouter = require("./routes/treeRouter");
const topologyRouter = require("./routes/topologyRouter");
const totalTrafficChartRouter = require("./routes/totalTrafficChartRouter");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.get(routes.getSubnetConfigInfo, subnetConfigInfoRouter);
app.get(routes.updateSubnetConfigInfo, subnetConfigInfoRouter);

app.get(routes.getRawData, histRouter);
app.get(routes.getRawDataStats, histRouter);
app.get(routes.getTbLink, histRouter);
app.get(routes.getEvent, histRouter);
app.get(routes.getMainEvent, histRouter);
app.get(routes.addRawData, histRouter);
app.get(routes.addTbLink, histRouter);
app.get(routes.addEvent, histRouter);

app.get(routes.getTbNodes, tbRouter);
app.get(routes.getTbLinks, tbRouter);
app.get(routes.getTbLinkStatus, tbRouter);
app.get(routes.addTbNodes, tbRouter);
app.get(routes.addTbLinks, tbRouter);
app.get(routes.updateTbNodes, tbRouter);
app.get(routes.updateTbLinks, tbRouter);
app.get(routes.updateTbLinkStatus, tbRouter);

app.get(routes.getRawDataLast, rawDataLastRouter);
app.get(routes.updateRawDataLast, rawDataLastRouter);

app.get(routes.getTree, treeRouter);

app.get(routes.getTopology, topologyRouter);

app.get(routes.getTotalTrafficChartData, totalTrafficChartRouter);

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});

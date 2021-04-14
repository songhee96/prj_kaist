const routes = {
  getSubnetConfigInfo: "/api/getSubnetConfigInfo",
  updateSubnetConfigInfo: "/api/updateSubnetConfigInfo",

  getRawData: "/api/getRawData",
  getRawDataStats: "/api/getRawDataStats",
  getTbLink: "/api/getTbLink",
  getEvent: "/api/getEvent",
  getMainEvent: "/api/getMainEvent",
  addRawData: "/api/addRawData",
  addTbLink: "/api/addTbLink",
  addEvent: "/api/addEvent",

  getTbNodes: "/api/getTbNodes",
  getTbLinks: "/api/getTbLinks",
  getTbLinkStatus: "/api/getTbLinkStatus",
  addTbNodes: "/api/addTbNodes",
  addTbLinks: "/api/addTbLinks",
  updateTbNodes: "/api/updateTbNodes",
  updateTbLinks: "/api/updateTbLinks",
  updateTbLinkStatus: "/api/updateTbLinkStatus",

  getRawDataLast: "/api/getRawDataLast",
  updateRawDataLast: "/api/updateRawDataLast",

  getTree: "/api/getTree",

  getTopology: "/api/getTopology",

  getTotalTrafficChartData: "/api/getTotalTrafficChartData",
  getTrafficChartData: "/api/getTrafficChartData",
};

module.exports = routes;

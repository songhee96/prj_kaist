const postgres = require("../postgres");

const getTotalTrafficChartData = async (req, res) => {
  try {
    let trafficSql = "select *from metric_mpipe_data_history order by log_dt desc";
    let traffic = await postgres(trafficSql);
    console.log(traffic);
    return res.json({ traffic });
  } catch (error) {
    console.log(error);
  }
};



const totalTrafficChartController = {
  getTotalTrafficChartData,
  
};

module.exports = totalTrafficChartController;

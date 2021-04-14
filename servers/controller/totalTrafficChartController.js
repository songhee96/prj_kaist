const postgres = require("../postgres");

function Unix_timestampConv(a) {
  return Math.floor(a / 1000);
}

//메인페이지
const getTotalTrafficChartData = async (req, res) => {
  try {
    let trafficSql = `select * from metric_mpipe_data_history where gxpci_ethernet='gxpci0' and log_dt between (current_timestamp - interval '1 day') and current_timestamp order by log_dt`;
    let traffic = await postgres(trafficSql);

    var txTrafficData = [];
    var rxTrafficData = [];
    for (let i = 0; i < traffic.length; i++) {
      var timeData = Unix_timestampConv(traffic[i].log_dt.getTime());
      var txData =
        Number(traffic[i].tx_bits) +
        Number(traffic[i].bcst_tx) +
        Number(traffic[i].mcst_tx);

      var rxData =
        Number(traffic[i].rx_bits) +
        Number(traffic[i].bcst_rx) +
        Number(traffic[i].mcst_rx);

      var data = [timeData, txData];
      var data2 = [timeData, rxData];

      txTrafficData.push(data);
      rxTrafficData.push(data2);

      // console.log(txData, "txData");
    }
    console.log(txTrafficData, rxTrafficData);

    return res.json({ txTrafficData, rxTrafficData });
  } catch (error) {
    console.log(error);
  }
};

//트래픽페이지
const getTrafficChartData = async (req, res) => {
  try {
    // console.log(req.body.params.inputData);

    let gxpci_ethernet = req.body.params.inputData.gxpci_ethernet;
    let interfaces = req.body.params.inputData.interfaces;

    // let trafficSql = `select * from metric_mpipe_data_history where gxpci_ethernet='gxpci0' and interfaces = 'gbe1' and log_dt between (current_timestamp - interval '1 months') and current_timestamp order by log_dt`;
    let trafficSql = `select * from metric_mpipe_data_history where gxpci_ethernet='${gxpci_ethernet}' and interfaces = '${interfaces}' and log_dt between (current_timestamp - interval '1 months') and current_timestamp order by log_dt`;
    let traffic = await postgres(trafficSql);

    var txTrafficData = [];
    var rxTrafficData = [];
    for (let i = 0; i < traffic.length; i++) {
      var timeData = Unix_timestampConv(traffic[i].log_dt.getTime());
      var txData =
        Number(traffic[i].tx_bits) +
        Number(traffic[i].bcst_tx) +
        Number(traffic[i].mcst_tx);

      var rxData =
        Number(traffic[i].rx_bits) +
        Number(traffic[i].bcst_rx) +
        Number(traffic[i].mcst_rx);

      var data = [timeData, txData];
      var data2 = [timeData, rxData];

      txTrafficData.push(data);
      rxTrafficData.push(data2);

      // console.log(txData, "txData");
    }
    console.log(txTrafficData, rxTrafficData);

    return res.json({ txTrafficData, rxTrafficData });
  } catch (error) {
    console.log(error);
  }
};

const totalTrafficChartController = {
  getTotalTrafficChartData,
  getTrafficChartData,
};

module.exports = totalTrafficChartController;

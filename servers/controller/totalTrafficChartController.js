const postgres = require("../postgres");

function Unix_timestampConv(a) {
  return Math.floor(a / 1000);
}

const getTotalTrafficChartData = async (req, res) => {
  try {
    // let gxpci_ethernet = req.body.inputData.gxpci_ethernet;
    // let interfaces = req.body.inputData.interfaces;

    let trafficSql = `select * from metric_mpipe_data_history where gxpci_ethernet='gxpci0' and interfaces = 'gbe1' and log_dt between (current_timestamp - interval '1 months') and current_timestamp`;
    // `select * from metric_mpipe_data_history where gxpci_ethernet='${gxpci_ethernet}' and interfaces = '${interfaces}' and log_dt between (current_timestamp - interval '1 months') and current_timestamp`;
    let traffic = await postgres(trafficSql);

    function Unix_timestampConv(a) {
      return Math.floor(a / 1000);
    }
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
};

module.exports = totalTrafficChartController;

const postgres = require("../postgres");

const getTopology = async (req, res) => {
  try {
    var aJson = new Object();
    var bJson = new Object();
    var cJson = new Object();
    var topologyData = [];

    let mpipeSql = "select *from metric_mpipe_data_current";
    let mpipe = await postgres(mpipeSql);
    // console.log(mpipe);
    for (let a = 0; a < mpipe.length; a++) {
      aJson.label = `${mpipe[a].gxpci_ethernet}-${mpipe[a].interfaces}`;
      aJson.tx_bitx = mpipe[a].tx_bits + mpipe[a].bcst_tx + mpipe[a].mcst_tx;
      aJson.rx_bitx = mpipe[a].rx_bits + mpipe[a].bcst_rx + mpipe[a].mcst_rx;

      var data = {
        label: aJson.label,
        tx_bitx: aJson.tx_bitx,
        rx_bitx: aJson.rx_bitx,
      };
      topologyData.push(data);
    }
    console.log(topologyData);
    return res.json({ topologyData });
  } catch (error) {
    console.log(error);
  }
};

const topologyController = {
  getTopology,
};

module.exports = topologyController;

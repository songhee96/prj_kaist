const postgres = require("../postgres");

//트래픽
const getRawData = async (req, res) => {
  try {
    let trafficMpipeSql =
      "select * from metric_mpipe_data_current join tb_nodes on metric_mpipe_data_current.gxpci_ethernet = tb_nodes.gxpci_ethernet and metric_mpipe_data_current.interfaces = tb_nodes.port order by node_name";
    let trafficMpipe = await postgres(trafficMpipeSql);
    let trafficTrioSql =
      "select * from metric_trio_data_current left join (select DISTINCT node_name, gxpci_ethernet, capacity from tb_nodes)as foo using (gxpci_ethernet) order by node_name";
    let trafficTrio = await postgres(trafficTrioSql);
    // console.log(trafficTrio[1]);

    var aJson = new Object();
    var bJson = new Object();
    var trafficData = [];

    for (let a = 0; a < trafficMpipe.length; a++) {
      aJson.gxpci_ethernet = trafficMpipe[a].gxpci_ethernet;
      aJson.interfaces = trafficMpipe[a].interfaces;
      aJson.tx_bits = trafficMpipe[a].tx_bits;
      aJson.rx_bits = trafficMpipe[a].rx_bits;
      aJson.tx_err = trafficMpipe[a].tx_err;
      aJson.rx_err = trafficMpipe[a].rx_err;
      aJson.bcst_tx = trafficMpipe[a].bcst_tx;
      aJson.bcst_rx = trafficMpipe[a].bcst_rx;
      aJson.mcst_tx = trafficMpipe[a].mcst_tx;
      aJson.mcst_rx = trafficMpipe[a].mcst_rx;
      aJson.log_dt = trafficMpipe[a].log_dt;
      aJson.idx = trafficMpipe[a].idx;
      aJson.node_id = trafficMpipe[a].node_id;
      aJson.node_name = trafficMpipe[a].node_name;
      aJson.port = trafficMpipe[a].port;
      aJson.capacity = trafficMpipe[a].capacity;

      var mpipeData = {
        gxpci_ethernet: aJson.gxpci_ethernet,
        interfaces: aJson.interfaces,
        tx_bits: aJson.tx_bits,
        rx_bits: aJson.rx_bits,
        tx_err: aJson.tx_err,
        rx_err: aJson.rx_err,
        bcst_tx: aJson.bcst_tx,
        bcst_rx: aJson.bcst_rx,
        mcst_tx: aJson.mcst_tx,
        mcst_rx: aJson.mcst_rx,
        log_dt: aJson.log_dt,
        node_id: aJson.node_id,
        node_name: aJson.node_name,
        port: aJson.port,
        capacity: aJson.capacity,
      };
      trafficData.push(mpipeData);
    }

    for (let a = 0; a < trafficTrio.length; a++) {
      bJson.gxpci_ethernet = trafficTrio[a].gxpci_ethernet;
      bJson.interfaces = trafficTrio[a].interfaces;
      bJson.tx_bits = trafficTrio[a].tx_bits;
      bJson.rx_bits = trafficTrio[a].rx_bits;
      bJson.log_dt = trafficTrio[a].log_dt;
      bJson.node_name = trafficTrio[a].node_name;
      bJson.capacity = trafficMpipe[a].capacity;
      var trioData = {
        gxpci_ethernet: bJson.gxpci_ethernet,
        interfaces: bJson.interfaces,
        tx_bits: bJson.tx_bits,
        rx_bits: bJson.rx_bits,
        log_dt: bJson.log_dt,
        node_name: bJson.node_name,
        capacity: bJson.capacity,
      };
      trafficData.push(trioData);
    }

    // trafficData.sort(function (a, b) {
    //   return a.node_name - b.node_name;
    // });
    console.log(trafficData);

    return res.json({ trafficData });
  } catch (error) {
    console.log(error);
  }
};

//예전에 있던 그래프
const getRawDataStats = async (req, res) => {
  try {
    var aJson = new Object();
    var rawStats = [];
    let sql = "select *from raw_data_hist order by collection_time";
    let stats = await postgres(sql);
    // console.log(stats.length);
    for (let i = 0; i < stats.length; i++) {
      aJson.value =
        (stats[i].rcv_data +
          stats[i].rcv_pcks +
          stats[i].multi_rcv_pcks +
          stats[i].uni_rcv_pcks +
          stats[i].xmit_data +
          stats[i].xmit_pcks +
          stats[i].multi_xmit_pcks +
          stats[i].uni_xmit_pcks +
          stats[i].rcv_errors +
          stats[i].xmit_wait) %
        30;
      aJson.collection_time = stats[i].collection_time;
      var data = {
        x: aJson.collection_time,
        y: aJson.value,
      };
      rawStats.push(data);
    }

    // console.log(rawStats);
    return res.json({ rawStats });
  } catch (error) {
    console.log(error);
  }
};

const getTbLink = async (req, res) => {
  try {
    let sql = "select *from tb_link_history order by idx desc";
    let tbLinks = await postgres(sql);
    // console.log(tbLinks);
    return res.json({ tbLinks });
  } catch (error) {
    console.log(error);
  }
};

//에러 이벤트
const getEvent = async (req, res) => {
  try {
    let sql =
      "SELECT (ROW_NUMBER() OVER()) IDX, AA.* FROM (SELECT GXPCI_ETHERNET , EVENT_TYPE , INTERFACES, ERR_DESC, ERR_DETAIL, LOG_DT, SEVERITY FROM METRIC_LOG_ERR_CURRENT UNION ALL SELECT GXPCI_ETHERNET, EVENT_TYPE, INTERFACES, ERR_DESC, ERR_DETAIL , LOG_DT, SEVERITY FROM METRIC_LOG_ERR_HISTORY) AA";
    let events = await postgres(sql);
    // console.log(events);

    return res.json({ events });
  } catch (error) {
    console.log(error);
  }
};

//메인
const getMainEvent = async (req, res) => {
  try {
    let sql =
      "select *from event_hist where event_dt between (current_timestamp - interval '1 week') AND current_timestamp order by event_dt";
    let mainEvents = await postgres(sql);
    // console.log(mainEvents);
    return res.json({ mainEvents });
  } catch (error) {
    console.log(error);
  }
};

//Insert query문 추후 확정되면 수정 예정
const addRawData = async (req, res) => {
  try {
    let sql = `INSERT INTO raw_data_hist(port, guid, lid, sm_lid, linkspeed, link_state, phy_state, rcv_data, rcv_pcks, multi_rcv_pcks, uni_rcv_pcks, xmit_data, xmit_pcks, multi_xmit_pcks, uni_xmit_pcks, rcv_errors, xmit_wait, collection_time) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,now());`;
    await postgres(sql);
  } catch (error) {
    console.log(error);
  }
};

const addTbLink = async (req, res) => {
  try {
    let sql = `INSERT INTO tb_link_history(link_id, link_state, min_bandwidth, max_bandwidth, used_traffic, link_type, perf_dt) VALUES (?, ?, ?, ?, ?, ?,now());`;
    await postgres(sql);
  } catch (error) {
    console.log(error);
  }
};

const addEvent = async (req, res) => {
  try {
    let sql = `INSERT INTO event_hist(event_desc, event_dt) VALUES (?,now());`;
    await postgres(sql);
  } catch (error) {
    console.log(error);
  }
};

const histController = {
  getRawData,
  getRawDataStats,
  getTbLink,
  getEvent,
  getMainEvent,
  addRawData,
  addTbLink,
  addEvent,
};

module.exports = histController;

const postgres = require("../postgres");

//트래픽
const getRawData = async (req, res) => {
  try {
    let sql = "SELECT *FROM metric_mpipe_data_current";
    let rawDatas = await postgres(sql);
    // console.log(rawDatas);
    return res.json({ rawDatas });
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

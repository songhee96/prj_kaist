const postgres = require("../postgres");

const getTbNodes = async (req, res) => {
  try {
    let sql = "select *from tb_nodes order by idx desc";
    let nodes = await postgres(sql);
    // console.log(nodes);
    return res.json({ nodes });
  } catch (error) {
    console.log(error);
  }
};

const getTbLinks = async (req, res) => {
  try {
    let sql = "select *from tb_links order by idx desc";
    let links = await postgres(sql);
    // console.log(links);
    return res.json({ links });
  } catch (error) {
    console.log(error);
  }
};

const getTbLinkStatus = async (req, res) => {
  try {
    let sql = "select *from tb_link_status order by idx desc";
    let statuses = await postgres(sql);
    // console.log(statuses);
    return res.json({ statuses });
  } catch (error) {
    console.log(error);
  }
};

//insert, update query 추후 확정되면 수정 예정
const addTbNodes = async (req, res) => {
  try {
    let sql = `INSERT INTO tb_nodes(node_id, node_name, node_if, ip, port, node_type, node_mac, created_dt, updated_dt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    await postgres(sql);
  } catch (error) {
    console.log(error);
  }
};

const addTbLinks = async (req, res) => {
  try {
    let sql = `INSERT INTO tb_links(link_id, src_node, dest_node, src_node_if, dest_node_if, created_dt, updated_dt) VALUES (?, ?, ?, ?, ?, ?, ?);`;
    await postgres(sql);
  } catch (error) {
    console.log(error);
  }
};

const updateTbNodes = async (req, res) => {
  try {
    // const storage_threshold = req.body.qkmsInputData.storage_threshold;
    // console.log("storage_threshold:" + storage_threshold);
    // if (link_attribute) {
    //   sql = `UPDATE public.tb_nodes SET idx=?, node_id=?, node_name=?, node_if=?, ip=?, port=?, node_type=?, node_mac=?, created_dt=?, updated_dt=? WHERE <condition>;`;
    //   await postgres(sql);
    // }
  } catch (error) {
    console.log(error);
  }
};

const updateTbLinks = async (req, res) => {
  try {
    // const storage_threshold = req.body.qkmsInputData.storage_threshold;
    // console.log("storage_threshold:" + storage_threshold);
    // if (link_attribute) {
    //   sql = `UPDATE public.tb_links SET idx=?, link_id=?, src_node=?, dest_node=?, src_node_if=?, dest_node_if=?, created_dt=?, updated_dt=? WHERE <condition>;`;
    //   await postgres(sql);
    // }
  } catch (error) {
    console.log(error);
  }
};

const updateTbLinkStatus = async (req, res) => {
  try {
    // const storage_threshold = req.body.qkmsInputData.storage_threshold;
    // console.log("storage_threshold:" + storage_threshold);
    // if (link_attribute) {
    //   sql = `UPDATE public.tb_link_status SET idx=?, link_id=?, link_state=?, min_bandwidth=?, max_bandwidth=?, used_traffic=?, link_type=?, perf_dt=? WHERE <condition>;`;
    //   await postgres(sql);
    // }
  } catch (error) {
    console.log(error);
  }
};

const tbController = {
  getTbNodes,
  getTbLinks,
  getTbLinkStatus,
  addTbNodes,
  addTbLinks,
  updateTbNodes,
  updateTbLinks,
  updateTbLinkStatus,
};

module.exports = tbController;

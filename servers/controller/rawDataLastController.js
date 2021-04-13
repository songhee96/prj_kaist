const postgres = require("../postgres");

const getRawDataLast = async (req, res) => {
  try {
    let sql = "select *from raw_data_last order by idx desc";
    let rawDataLast = await postgres(sql);
    // console.log(rawDataLast);
    return res.json({ rawDataLast });
  } catch (error) {
    console.log(error);
  }
};

const updateRawDataLast = async (req, res) => {
  try {
    // const storage_threshold = req.body.qkmsInputData.storage_threshold;
    // console.log("storage_threshold:" + storage_threshold);
    // if (link_attribute) {
    //   sql = `UPDATE public.raw_data_last SET idx=?, port=?, guid=?, lid=?, sm_lid=?, linkspeed=?, link_state=?, phy_state=?, rcv_data=?, rcv_pcks=?, multi_rcv_pcks=?, uni_rcv_pcks=?, xmit_data=?, xmit_pcks=?, multi_xmit_pcks=?, uni_xmit_pcks=?, rcv_errors=?, xmit_wait=?, collection_time=? WHERE <condition>;`;
    //   await postgres(sql);
    // }
  } catch (error) {
    console.log(error);
  }
};

const rawDataLastController = {
  getRawDataLast,
  updateRawDataLast,
};

module.exports = rawDataLastController;

const postgres = require("../postgres");

const getSubnetConfigInfo = async (req, res) => {
  try {
    let sql = "select *from subnet_config_info order by idx desc";
    let configs = await postgres(sql);
    // console.log(configs);
    return res.json({ configs });
  } catch (error) {
    console.log(error);
  }
};

const updateSubnetConfigInfo = async (req, res) => {
  try {
    // 추후 방향 정해지면 수정 예정
    // const storage_threshold = req.body.qkmsInputData.storage_threshold;
    // console.log("storage_threshold:" + storage_threshold);
    // if (link_attribute) {
    //   sql = `UPDATE qkms_links SET link_attribute=${link_attribute} WHERE qkms_id='${req.params.id}'`;
    //   await postgres(sql);
    // }
  } catch (error) {
    console.log(error);
  }
};

const subnetConfigInfoController = {
  getSubnetConfigInfo,
  updateSubnetConfigInfo,
};

module.exports = subnetConfigInfoController;

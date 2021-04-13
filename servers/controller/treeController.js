const postgres = require("../postgres");

const getTree = async (req, res) => {
  try {
    var aJson = new Object();
    var bJson = new Object();
    var cJson = new Object();
    var value = [];
    let sql = "select *from ui_tree_node order by idx";
    let treeNodes = await postgres(sql);
    for (let a = 0; a < treeNodes.length; a++) {
      if (treeNodes[a].depth == 0 && treeNodes[a].parent_node_id == null) {
        aJson.key = treeNodes[a].tree_node_id;
        aJson.title = treeNodes[a].tree_node_name;
        aJson.parent_node_id = treeNodes[a].parent_node_id;
        aJson.children = [bJson];
        var data = {
          key: aJson.key,
          title: aJson.title,
          parent_node_id: aJson.parent_node_id,
          children: [],
        };
        value.push(data);
      }
    }
    for (let i = 0; i < value.length; i++) {
      for (let b = 0; b < treeNodes.length; b++) {
        if (
          treeNodes[b].depth == 1 &&
          value[i].key == treeNodes[b].parent_node_id
        ) {
          bJson.key = treeNodes[b].tree_node_id;
          bJson.title = treeNodes[b].tree_node_name;
          bJson.parent_node_id = treeNodes[b].parent_node_id;
          bJson.children = [cJson];
          var data2 = {
            key: bJson.key,
            title: bJson.title,
            parent_node_id: bJson.parent_node_id,
            children: [],
          };
          value[i].children.push(data2);
        }
      }
    }
    for (let i = 0; i < value.length; i++) {
      for (let k = 0; k < value[i].children.length; k++) {
        for (let c = 0; c < treeNodes.length; c++) {
          if (
            treeNodes[c].depth == 2 &&
            value[i].children[k].key == treeNodes[c].parent_node_id
          ) {
            cJson.key = treeNodes[c].tree_node_id;
            cJson.title = treeNodes[c].tree_node_name;
            cJson.parent_node_id = treeNodes[c].parent_node_id;
            cJson.children = [];
            var data3 = {
              key: cJson.key,
              title: cJson.title,
              parent_node_id: cJson.parent_node_id,
              children: [],
            };
            value[i].children[k].children.push(data3);
          }
        }
      }
    }

    console.log(JSON.stringify(value));

    return res.json({ treeNode: value });
  } catch (error) {
    console.log(error);
  }
};

const treeController = {
  getTree,
};

module.exports = treeController;

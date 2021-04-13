import React from "react";
import { Card, Tree, Row, Col, Modal } from "antd";

import NextUI from "../../components/NextUI";
import TotalTrafficChart from "../../components/TotalTrafficChart";

import "antd/dist/antd.dark.css";

export default class MM00 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEventModalOpen: false,

      expandedKeys: [],
      autoExpandParent: true,

      treeList: [],
      eventList: [],
      data: [],
    };
  }

  componentDidMount() {
    this._getTreeList();
    this._getEventList();
    this._eventModalOpenHandler();
  }

  render() {
    const {
      isEventModalOpen,

      expandedKeys,
      autoExpandParent,

      treeList,
      eventList,
    } = this.state;

    // console.log(eventList, "eventList");

    const eventColumns = [
      { title: "idx", dataIndex: "idx", align: "center" },
      { title: "이벤트 발생 시각", dataIndex: "event_dt", align: "center" },
      { title: "이벤트 내용", dataIndex: "event_desc", align: "center" },
    ];

    return (
      <>
        <div className="MM00 pages">
          <Card>
            <div className="content_wrap">
              <Row gutter={[20, 20]}>
                <Col span={3}>
                  <Card className="kaist_text_wrap">
                    <Tree
                      onExpand={this.onExpand}
                      expandedKeys={expandedKeys}
                      autoExpandParent={autoExpandParent}
                      treeData={treeList}
                      onSelect={this._treeDetail}
                    />
                  </Card>
                </Col>

                <Col span={21}>
                  <Card className="topolog_wrap">
                    <div className="MM00_topology_wrap">
                      <NextUI />
                    </div>
                  </Card>
                </Col>

                <Col span={3}></Col>
                <Col span={21}>
                  <Card className="topolog_wrap">
                    <div className="MM00_topology_wrap">
                      <TotalTrafficChart />
                    </div>
                  </Card>
                </Col>
              </Row>
              {/* 
              <Row gutter={[24, 0]}>
                <Col span={24}>
                  <div className="MM00_event_table_wrap">
                    <Table
                      size="small"
                      columns={eventColumns}
                      dataSource={eventList}
                      rowKey="idx"
                      pagination={{ pageSize: 20 }}
                      scroll={{ y: 840 }}
                    />
                  </div>
                </Col>
              </Row> */}
            </div>
          </Card>

          <Modal
            title="경고"
            visible={isEventModalOpen}
            onOk={() => this._handleOpen()}
            onCancel={() => this._handleOpen()}
          >
            <p>Hello Modal</p>
          </Modal>
        </div>
      </>
    );
  }

  // Tree 데이터 가져옴
  _getTreeList = async () => {
    await fetch("/api/getTree")
      .then((res) => res.json())
      .then((data) =>
        //  console.log(data, "tree Data")
        this.setState({
          treeList: data.treeNode,
        })
      );
  };

  // Tree 클릭 시 펼침 기능
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  // Tree 클릭 시 해당 key 와 데이터를 console에 보여줌
  _treeDetail = async (expandedKeys, event) => {
    console.log(expandedKeys, event.node.title, "key, node title");
  };

  // 이벤트 리스트 불러옴
  _getEventList = async () => {
    await fetch("/api/getMainEvent")
      .then((res) => res.json())
      .then((data) =>
        // console.log(data, "main EventList")
        this.setState({
          eventList: data.mainEvents,
        })
      );
  };

  // 이벤트 model
  _eventModalOpenHandler = () => {
    console.log("event Modal Open");

    this.setState({
      isEventModalOpen: false,
    });
  };

  // 이벤트 model 열기닫기
  _handleOpen = () => {
    console.log("Click Ok");

    this.setState({
      isEventModalOpen: !this.state.isEventModalOpen,
    });
  };
}

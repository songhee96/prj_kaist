import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Card, Table } from "antd";
import TrafficChart from "../../components/TrafficChart";

export default class MM01 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "트래픽",
      eventHistoryList: [],
      trafficHistoryList: [],
      data: [],

      isDetail: false,

      // rcvData: "",
      // rcvPcks: "",
      // multiRcvPcks: "",
      // uniRcvPcks: "",
      // xmitData: "",
      // xmitPcks: "",
      // multiXmitPcks: "",
      // uniXmitPcks: "",
      // rcvErrors: "",
      // xmitWait: "",
      // collectionTime: "",
    };
  }

  componentDidMount() {
    this._getTrafficeHistoryList();
  }

  render() {
    const {
      title,

      trafficHistoryList,

      // rcvData,
      // rcvPcks,
      // multiRcvPcks,
      // uniRcvPcks,
      // xmitData,
      // xmitPcks,
      // multiXmitPcks,
      // uniXmitPcks,
      // rcvErrors,
      // xmitWait,
      // collectionTime,
    } = this.state;

    const trafficColumns = [
      { title: "디바이스", dataIndex: "device", align: "center" },
      { title: "인터페이스", dataIndex: "interfaces", align: "center" },
      {
        title: "Rx | Tx",
        dataIndex: "",
        align: "center",
        render() {
          return {
            children: (
              // <a href="./#/MM02Chart">
              <TrafficChart />
              // </a>
            ),
          };
        },
      },
      { title: "에러", dataIndex: "tx_err", align: "center" },
      { title: "CAPACITY", dataIndex: "tx_err", align: "center" },
    ];

    return (
      <>
        <div className="MM01 pages">
          <Breadcrumb className="bread_crumb">
            <Breadcrumb.Item>{title}</Breadcrumb.Item>
          </Breadcrumb>

          <Card>
            <div className="content_wrap">
              <Table
                className="table_wrap"
                size="small"
                columns={trafficColumns}
                dataSource={trafficHistoryList}
                rowKey="idx"
                onRow={(data) => ({
                  onClick: () => {
                    console.log(data, "트래픽 데이터");
                  },
                })}
              />
            </div>
          </Card>
        </div>
      </>
    );
  }

  //   트래픽 탭 데이터 가져옴
  _getTrafficeHistoryList = async () => {
    await fetch("/api/getRawData")
      .then((res) => res.json())
      .then((data) =>
        // console.log(data, "이력 > 이벤트")
        this.setState({
          trafficHistoryList: data.rawDatas,
        })
      );
  };
}

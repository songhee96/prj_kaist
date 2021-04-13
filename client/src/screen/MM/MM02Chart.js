import React from "react";
import { Breadcrumb, Card, Tabs } from "antd";

import TotalTrafficChart from "../../components/TotalTrafficChart";

const { TabPane } = Tabs;

export default class MM02Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "트래픽",
      eventHistoryList: [],
      trafficHistoryList: [],

      isDetail: false,
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
      { title: "Rx | Tx", dataIndex: "", align: "center" },
      { title: "에러", dataIndex: "tx_err", align: "center" },
      { title: "CAPACITY", dataIndex: "tx_err", align: "center" },
    ];

    // const columnsArray = numbers.map((number) =>

    // );

    return (
      <>
        <div className="MM01 pages">
          <Breadcrumb className="bread_crumb">
            <Breadcrumb.Item>{title}</Breadcrumb.Item>
          </Breadcrumb>

          <Card>
            <div className="chart_wrap">
              <ul>
                <li>
                  <p>디바이스</p> 데이터
                </li>
                <li>
                  <p>인터페이스</p> 데이터
                </li>
                <li>
                  <p>Rx | Tx</p> 데이터
                </li>
                <li>
                  <p>에러</p> 데이터
                </li>
                <li>
                  <p>CAPACITY</p> 데이터
                </li>
              </ul>

              <TotalTrafficChart />
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

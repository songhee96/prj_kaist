import React from "react";
import axios from "axios";

import { Breadcrumb, Card, Table, Modal } from "antd";

import TrafficChart from "../../components/TrafficChart";
import TotalTrafficChart from "../../components/TotalTrafficChart";

export default class MM01 extends React.Component {
  constructor(props) {
    super(props);

    this.reference = React.createRef();

    this.state = {
      title: "트래픽",

      // 트래픽 테이블 데이터
      trafficHistoryList: [],

      // 트래픽 Modal open
      isTrafficDetail: false,

      // 트래픽 Modal 데이터
      modealDevice: "",
      modalInterface: "",
      modalError: "",
      modalCapacity: "",
    };
  }

  componentDidMount() {
    this._getTrafficeHistoryList();
  }

  render() {
    const {
      title,

      // 트래픽 테이블 데이터
      trafficHistoryList,

      // 트래픽 Modal open
      isTrafficDetail,

      // 트래픽 Modal 데이터
      modealDevice,
      modalInterface,
      modalError,
      modalCapacity,
    } = this.state;

    const trafficColumns = [
      { title: "DEVICE", dataIndex: "node_name", align: "center" },
      { title: "LINK", dataIndex: "interfaces", align: "center" },
      { title: "INTERFACE", dataIndex: "interfaces", align: "center" },
      {
        title: "Rx | Tx (bits)",
        dataIndex: "rx_bits",
        align: "center",
        render(rx_bits, rafficHistoryList) {
          return {
            children: (
              <div className="MM02_traffic_wrap">
                <TrafficChart
                  rx={rafficHistoryList.rx_bits}
                  tx={rafficHistoryList.tx_bits}
                />
              </div>
            ),
          };
        },
      },
      { title: "Rx | Tx (bcst)", dataIndex: "capacity", align: "center" },
      { title: "Rx | Tx (mcst)", dataIndex: "capacity", align: "center" },
      {
        title: "Rx | Tx (IP err)",
        dataIndex: "tx_err",
        align: "center",
        render(text) {
          return {
            props: {
              style: {
                color:
                  parseInt(text) > 84
                    ? "red"
                    : parseInt(text) > 70
                    ? "orange"
                    : "yellow",
              },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: "Rx | Tx (TCP err)",
        dataIndex: "tx_err",
        align: "center",
        render(text) {
          return {
            props: {
              style: {
                color:
                  parseInt(text) > 84
                    ? "red"
                    : parseInt(text) > 70
                    ? "orange"
                    : "yellow",
              },
            },
            children: <div>{text}</div>,
          };
        },
      },

      {
        title: "Rx | Tx (UDP err)",
        dataIndex: "tx_err",
        align: "center",
        render(text) {
          return {
            props: {
              style: {
                color:
                  parseInt(text) > 84
                    ? "red"
                    : parseInt(text) > 70
                    ? "orange"
                    : "yellow",
              },
            },
            children: <div>{text}</div>,
          };
        },
      },
      { title: "CAPACITY", dataIndex: "capacity", align: "center" },
    ];

    return (
      <>
        {/* {console.log(trafficHistoryList, "트래픽 테이블 정보 확인")} */}
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
                    this._trafficModalHandler(data);
                  },
                })}
              />
            </div>
          </Card>
        </div>

        <Modal
          title="트래픽 상세 정보"
          visible={isTrafficDetail}
          okText="확인"
          cancelText="닫기"
          onOk={() => this._modalHandler()}
          onCancel={() => this._modalHandler()}
        >
          <div>
            <div className="MM02_modal_table_wrap">
              <table className="MM02_modal_table">
                <caption>트래픽 상세 정보</caption>
                <tbody>
                  <tr>
                    <th>디바이스</th>
                    <td>{modealDevice}</td>
                  </tr>
                  <tr>
                    <th>인터페이스</th>
                    <td>{modalInterface}</td>
                  </tr>
                  <tr>
                    <th>에러</th>
                    <td>{modalError}</td>
                  </tr>
                  <tr>
                    <th>Capacity</th>
                    <td>{modalCapacity}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="MM02_modal_chart_wrap">
              <TotalTrafficChart />
            </div>
          </div>
        </Modal>
      </>
    );
  }

  //   트래픽 데이터 가져옴
  _getTrafficeHistoryList = async () => {
    await axios.get("/api/getRawData").then((res) => {
      if (res.status === 200) {
        // console.log(res.data, "트래픽 데이터 가져옴");
        this.setState({
          trafficHistoryList: res.data.trafficData,
        });
      } else {
        alert(
          "데이터를 가져오는 도중에 문제가 발생하였습니다. 관리자에게 문의 바랍니다."
        );
      }
    });
  };

  // 트래픽 행 클릭 > Modal
  _trafficModalHandler = async (event) => {
    // console.log(data, "트래픽 행 클릭 데이터");

    // const inputData = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     input: {
    //       gxpci_ethernet: data.gxpci_ethernet,
    //       interfaces: data.interfaces,
    //     },
    //   }),
    // };

    // console.log(inputData.body, "트래픽 행 클릭 inputData");

    // await fetch("/api/getTrafficChartData", inputData)
    //   .then((res) => res.json())
    //   .then((data) => console.log(data, "트래픽 행 클릭 데이터"));

    const inputData = {
      gxpci_ethernet: event.gxpci_ethernet,
      interfaces: event.interfaces,
    };

    // console.log(inputData, "트래픽 행 클릭 전달 데이터");

    await axios
      .post("/api/getTrafficChartData", {
        params: { inputData },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            isTrafficDetail: !this.state.isTrafficDetail,

            modealDevice: event.gxpci_ethernet,
            modalInterface: event.interfaces,
            modalError: event.udp_cs_err,
            modalCapacity: event.event_type,
          });
        } else {
          alert(
            "데이터를 가져오는 도중에 문제가 발생하였습니다. 관리자에게 문의바랍니다."
          );
        }
      });
  };

  // 트래픽 Modal 확인, 닫기 클릭
  _modalHandler = () => {
    this.setState({
      isTrafficDetail: !this.state.isTrafficDetail,
    });
  };
}

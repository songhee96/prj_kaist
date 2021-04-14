import React from "react";
import { Breadcrumb, Card, Table } from "antd";
import { DatePicker, Space } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

export default class MM01 extends React.Component {
  state = {
    title: "이벤트",
    eventHistoryList: [],
    selectedRowKeys: [], // cheeck box

    isDetail: false,

    rcvData: "",
    rcvPcks: "",
    multiRcvPcks: "",
    uniRcvPcks: "",
    xmitData: "",
    xmitPcks: "",
    multiXmitPcks: "",
    uniXmitPcks: "",
    rcvErrors: "",
    xmitWait: "",
    collectionTime: "",
  };

  componentDidMount() {
    this._getEventHistoryList();
  }

  // cheeck box
  selectRow = (record) => {
    const selectedRowKeys = [...this.state.selectedRowKeys];
    if (selectedRowKeys.indexOf(record.key) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
    } else {
      selectedRowKeys.push(record.key);
    }
    this.setState({ selectedRowKeys });
  };

  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };
  // cheeck box

  render() {
    // cheeck box ---
    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    };
    // cheeck box ---

    const {
      title,

      eventHistoryList,
    } = this.state;

    const eventColumns = [
      {
        title: "이벤트 발생 시각",
        dataIndex: "log_dt",
        align: "center",
        render(log_dt) {
          return {
            children: (
              <div>
                {log_dt.substr(0, 10)}&nbsp;{log_dt.substr(11, 5)}
              </div>
            ),
          };
        },
      },
      {
        title: "심각도",
        dataIndex: "severity",
        align: "center",
        render(text) {
          return {
            props: {
              style: {
                color:
                  parseInt(text) > 94
                    ? "red"
                    : parseInt(text) > 85
                    ? "orange"
                    : "yellow",
              },
            },
            children: <div>{text}</div>,
          };
        },
      },
      { title: "이벤트 타입", dataIndex: "event_type", align: "center" },
      { title: "gxpci_ethernet", dataIndex: "gxpci_ethernet", align: "center" },
      { title: "인터페이스", dataIndex: "interfaces", align: "center" },
      { title: "이벤트 내용", dataIndex: "err_desc", align: "center" },
    ];

    // datePicker
    function onChange(dates, dateStrings) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    }

    return (
      <>
        <div className="MM01 pages">
          <Breadcrumb className="bread_crumb">
            <Breadcrumb.Item>{title}</Breadcrumb.Item>
          </Breadcrumb>

          <Card>
            <div className="content_wrap">
              <Space direction="vertical" size={10}>
                <RangePicker
                  ranges={{
                    Today: [moment(), moment()],
                    "This Month": [
                      moment().startOf("month"),
                      moment().endOf("month"),
                    ],
                  }}
                  onChange={onChange}
                />
              </Space>
              <Table
                rowSelection={rowSelection} // cheeck box
                size="small"
                columns={eventColumns}
                dataSource={eventHistoryList}
                rowKey="idx"
                pagination={{ pageSize: 10 }}
                scroll={{ y: 840 }}
              />
            </div>
          </Card>
        </div>
      </>
    );
  }

  //   이벤트 탭 데이터 가져옴
  _getEventHistoryList = async () => {
    await fetch("/api/getEvent")
      .then((res) => res.json())
      .then((data) =>
        // console.log(data, "이력 > 이벤트")
        this.setState({
          eventHistoryList: data.events,
        })
      );
  };
}

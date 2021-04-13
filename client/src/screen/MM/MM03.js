import React from "react";
import { Breadcrumb, Card, Tabs, Table, Modal } from "antd";

const { TabPane } = Tabs;

export default class MM01 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "트래픽",
      //트래픽 리스트
      eventHistoryList: [],
      trafficHistoryList: [],
      //트래픽 행 클릭 > 팝업창
      isDetail: false,

    


      // tx_pkt:"",
      // tx_bits:"",
      // rx_pkt:"",
      // rx_bits:"",
      // tx_err:"",
      // rx_err:"",
      // octets_tx:"",
      // octets_rx:"",
      // frames_tx:"",
      // frames_rx:"",
      // bcst_tx:"",
      // bcst_rx:"",
      // mcst_tx:"",
      // mcst_rx:"",
      // pause_tx:"",
      // pause_rx:"",
      // ip_header_cs_err:"",
      // tcp_cs_err:"",
      // udp_cs_err:"",
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
    this._getTrafficHistoryList();
  }

  render() {
    const {
      title,
      //트래픽 정보
      eventHistoryList,
      trafficHistoryList,

      //트래픽 행 클릭 > 팝업 오픈
      isDetail,

      //검색조건
      selectEventType,
      

      // tx_pkt,
      // tx_bits,
      // rx_pkt,
      // rx_bits,
      // tx_err,
      // rx_err,
      // octets_tx,
      // octets_rx,
      // frames_tx,
      // frames_rx,
      // bcst_tx,
      // bcst_rx,
      // mcst_tx,
      // mcst_rx,
      // pause_tx,
      // pause_rx,
      // ip_header_cs_err,
      // tcp_cs_err,
      // udp_cs_err,

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
    //   { title: "발생시각", dataIndex: "log_dt", align: "center",
    //     render(log_dt){
    //       return{
    //         children:(
    //           <div>
    //             {log_dt.substr(0,10)}&nbsp;{log_dt.substr(11,5)}
    //           </div>
    //         ),
    //       };

    //     },
    // },
      { title: "트래픽", dataIndex: "event_type", align: "center" },
      { title: "err", dataIndex: "tx_err", align: "center" },
     
      
     // { title: "보낸패킷", dataIndex: "tx_pkt", align: "center" }

      // { title: "linkspeed", dataIndex: "linkspeed", align: "center" },
      // { title: "link_state", dataIndex: "link_state", align: "center" },
      // { title: "phy_state", dataIndex: "phy_state", align: "center" },
    ];

    return (
      <>
        <div className="MM01 pages">
          <Breadcrumb className="bread_crumb">
            <Breadcrumb.Item>{title}</Breadcrumb.Item>
          </Breadcrumb>

          <Card>
            <div className="content_wrap">
              <Tabs defaultActiveKey="1" type="card" size="small">
                <TabPane tab="트래픽" key="2">
        
                   <div className="MM01_search_wrap">
                    <div>
                      <select 
                        name="selectEventType"
                       // value={selectEventType}
                        onChange={this._selectChange}>

                          <option value="">이벤트 종류</option>

                          {selectEventType?selectEventType.map((data)=> data?(
                            <option value={data}>{data}</option>
                          ):null
                          ):null}                       
                      </select>
                    </div>
                  </div>
                
                  
                  <Table
                    size="small"
                    columns={trafficColumns}
                    dataSource={trafficHistoryList}
                    rowKey="idx"
                    pagination={{ pageSize: 10}}
                    scroll={{ y: 800 }}
                    onRow={(data) => ({
                      onClick: () => {
                        this._showDetail(data);
                      },
                    })}
                  />
                </TabPane>
              </Tabs>
            </div>
          </Card>
        </div>

        <Modal
          title="상세정보"
          visible={isDetail}
          okText="확인"
          cancelText="닫기"
          onOk={() => this._handleOpen()}
          onCancel={() => this._handleOpen()}
        >
          <div>
            <table className="MM01_detail_table">
              <caption>이력 트래픽 상세정보</caption>
              <tbody>
                <tr>
                  <th>tx_패킷</th>
                  <td>{tx_pkt}</td>
                </tr>
                <tr>
                  <th>rx_패킷</th>
                  <td>{rx_pkt}</td>
                </tr>
                <tr>
                  <th>tx_비트</th>
                  <td>{tx_bits}</td>
                </tr>
                <tr>
                  <th>rx_비트</th>
                  <td>{rx_bits}</td>
                </tr>
                <tr>
                  <th>tx_에러</th>
                  <td>{tx_err}</td>
                </tr>
                <tr>
                  <th>rx_에러</th>
                  <td>{rx_err}</td>
                </tr>
                <tr>
                  <th>tx_옥텍</th>
                  <td>{octets_tx}</td>
                </tr>
                <tr>
                  <th>rx_옥텍</th>
                  <td>{octets_rx}</td>
                </tr>
                <tr>
                  <th>tx_프레임</th>
                  <td>{frames_tx}</td>
                </tr>
                <tr>
                  <th>rx_프레임</th>
                  <td>{frames_rx}</td>
                </tr>
                <tr>
                  <th>tx_브로드캐스트</th>
                  <td>{bcst_tx}</td>
                </tr>
                <tr>
                  <th>rx_브로드캐스트</th>
                  <td>{bcst_rx}</td>
                </tr>
                <tr>
                  <th>tx_멀티캐스트</th>
                  <td>{mcst_tx}</td>
                </tr>
                <tr>
                  <th>rx_멀티캐스트</th>
                  <td>{mcst_rx}</td>
                </tr>
                <tr>
                  <th>tx_pause</th>
                  <td>{pause_tx}</td>
                </tr>
                <tr>
                  <th>rx_pause</th>
                  <td>{pause_rx}</td>
                </tr>
                <tr>
                  <th>ip_header_cs_err</th>
                  <td>{ip_header_cs_err}</td>
                </tr>
                <tr>
                  <th>tcp_cs_err</th>
                  <td>{tcp_cs_err}</td>
                </tr>
                <tr>
                  <th>udp_cs_err</th>
                  <td>{udp_cs_err}</td>
                </tr>
                
            
              </tbody>
            </table>
          </div>
        </Modal>
      </>
    );
  }

  //   트래픽 탭 데이터 가져옴
  _getTrafficHistoryList = async () => {
    await fetch("/api/getRawData")
      .then((res) => res.json())
      .then((data) =>
        // console.log(data.rawDatas, "이력 > 트래픽")
        this.setState({
          trafficHistoryList: data.rawDatas,
        })
      );
  };

  // 이력 > 트래픽 > 상세정보
  _showDetail = (data) => {
    console.log(data, " 트래픽 > 상세정보");

    const {
      
      tx_pkt,
      rx_pkt,
      tx_bits,
      rx_bits,
      tx_err,
      rx_err,
      octets_tx,
      octets_rx,
      frames_tx,
      frames_rx,
      bcst_tx,
      bcst_rx,
      mcst_tx,
      mcst_rx,
      pause_tx,
      pause_rx,
      ip_header_cs_err,
      tcp_cs_err,
      udp_cs_err,


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

    this.setState({
      isDetail: !this.state.isDetail,
    
      tx_pkt:data.tx_pkt,
      rx_pkt:data.rx_pkt,

      tx_bits:data.tx_bits,
      rx_bits:data.rx_bits,
      
      tx_err:data.tx_err,
      rx_err:data.rx_err,
      octets_tx:data.octets_tx,
      octets_rx:data.octets_rx,
      frames_tx:data.frames_tx,
      frames_rx:data.frames_rx,
      bcst_tx:data.bcst_tx,
      bcst_rx:data.bcst_rx,
      mcst_tx:data.mcst_tx,
      mcst_rx:data.mcst_rx,
      pause_tx:data.pause_tx,
      pause_rx:data.pause_rx,
      ip_header_cs_err:data.ip_header_cs_err,
      tcp_cs_err:data.tcp_cs_err,
      udp_cs_err:data.udp_cs_err,

      
      // rcvData: data.rcv_data.data[0],
      // rcvPcks: data.rcv_pcks,
      // multiRcvPcks: data.multi_rcv_pcks,
      // uniRcvPcks: data.uni_rcv_pcks,
      // xmitData: data.xmit_data.data[0],
      // xmitPcks: data.xmit_pcks,
      // multiXmitPcks: data.multi_xmit_pcks,
      // uniXmitPcks: data.uni_xmit_pcks,
      // rcvErrors: data.rcv_errors,
      // xmitWait: data.xmit_wait,
      // collectionTime: data.collection_time,
    });
  };

  _handleOpen = () => {
    console.log("트래픽 > 상세정보 Modal 닫기/열기");

    this.setState({
      isDetail: !this.state.isDetail,
    });
  };
}

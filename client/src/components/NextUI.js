import React from "react";

import NextContainer from "react-next-ui";
import "react-next-ui/build/css/next.min.css";

export default class NextUI extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      linkState: [],
    };
  }

  componentDidMount() {
    this._topoStatus();
  }

  render() {
    const sampleTopology = {
      nodes: [
        // SW1
        {
          id: 0,
          x: 400,
          y: 100,
          label: "1",
          name: "SW1-1",
        },
        {
          id: 1,
          x: 500,
          y: 100,
          label: "3",
          name: "SW1-3",
        },
        {
          id: 2,
          x: 600,
          y: 100,
          label: "5",
          name: "SW1-5",
        },
        {
          id: 3,
          x: 400,
          y: 300,
          label: "HCA 1",
          name: "SW1-HCA1",
        },

        // SW2
        {
          id: 4,
          x: 1100,
          y: 200,
          label: "1",
          name: "SW2-1",
        },
        {
          id: 5,
          x: 1200,
          y: 200,
          label: "3",
          name: "SW2-3",
        },
        {
          id: 6,
          x: 1300,
          y: 200,
          label: "5",
          name: "SW2-5",
        },
        {
          id: 7,
          x: 1100,
          y: 400,
          label: "HCA 2",
          name: "SW2-HCA2",
        },
      ],
      links: [
        { source: 0, target: 3, label: "gxpci0-1" },

        { source: 1, target: 5, label: "gxpci0-3" },
        { source: 5, target: 1, label: "gxpci1-3" },

        { source: 2, target: 6, label: "gxpci0-5" },
        { source: 6, target: 2, label: "gxpci1-5" },

        { source: 4, target: 7, label: "gxpci1-1" },
      ],
    };

    const sampleConfig = {
      autoLayout: false,
      adaptive: true,
      identityKey: "id",

      content: {
        name: "topo",
        type: "nx.graphic.Topology",

        props: {
          width: 1800,
          height: 500,
          nodeConfig: {
            label: "model.label",
          },
          linkConfig: {
            linkType: "curve",

            color: function (link) {
              // checkRange(link)
              if (checkRange(link) === "Green") {
                return "#00B700";
              } else if (checkRange(link) === "Yellow") {
                return "#FFE400";
              } else if (checkRange(link) === "Orange") {
                return "#FF8224";
              } else if (checkRange(link) === "Red") {
                return "#FF0000";
              }
            },
            // tooltipManagerConfig: {
            //   linkTooltipContentClass: "",
            // },
          },
          showIcon: true,

          data: sampleTopology,
        },
      },
    };

    // 링크 상태 표시
    const checkRange = (link) => {
      // console.log(link._data.label, this.state.sample);
      for (let i = 0; i < this.state.linkState.length; i++) {
        if (link._data.label === this.state.linkState[i].label) {
          // console.log(
          //   link._data.label,
          //   this.state.sample[i].id,
          //   this.state.sample[i].range,
          //   "확인"
          // );

          // console.log(link._data.label.split("-")[0].includes("0"), "확인");

          if (link._data.label.split("-")[0].includes("0")) {
            if (this.state.linkState[i].tx_bitx <= 60) {
              return "Green";
            } else if (
              this.state.linkState[i].tx_bitx > 60 &&
              this.state.linkState[i].tx_bitx <= 70
            ) {
              return "Yellow";
            } else if (
              this.state.linkState[i].tx_bitx > 70 &&
              this.state.linkState[i].tx_bitx <= 85
            ) {
              return "Orange";
            } else if (this.state.linkState[i].tx_bitx > 85) {
              return "Red";
            }
          } else if (link._data.label.split("-")[0].includes("1")) {
            if (this.state.linkState[i].rx_bitx <= 60) {
              return "Green";
            } else if (
              this.state.linkState[i].rx_bitx > 60 &&
              this.state.linkState[i].rx_bitx <= 70
            ) {
              return "Yellow";
            } else if (
              this.state.linkState[i].rx_bitx > 70 &&
              this.state.linkState[i].rx_bitx <= 85
            ) {
              return "Orange";
            } else if (this.state.linkState[i].rx_bitx > 85) {
              return "Red";
            }
          }
        }
      }
    };

    // const sampleEvtHandlers = {
    //   LinkEvents: {
    //     clickLink: (sender, event) => {
    //       console.log(sender, event, "확인");
    //     },
    //   },
    // };

    // const sampleEvtHandlers = {
    //   clickLink: (sender, event) => {
    //     console.log(`${event.id()} Click Link`);
    //   },
    //   selectNode: (sender, event) => {
    //     console.log(`${event.id()} Click Node`);
    //   },
    // };

    return (
      <>
        <div>
          <NextContainer
            topologyData={sampleTopology}
            topologyConfig={sampleConfig}
            // eventHandlers={sampleEvtHandlers}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </>
    );
  }

  // 토폴로지 상태 데이터
  _topoStatus = async () => {
    await fetch("/api/getTopology")
      .then((res) => res.json())
      .then((data) =>
        // console.log(data, "data")
        this.setState({
          linkState: data.topologyData,
        })
      );
  };
}

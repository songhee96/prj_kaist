import React from "react";
import { Graph } from "react-d3-graph";
import { Modal } from "antd";

import HCA from "../assets/SVG/HCA2.png";
// import HCA from "../assets/SVG/HCA.png";
import SW from "../assets/SVG/SW2.png";
// import SW from "../assets/SVG/SW.png";
import GBE from "../assets/SVG/gbe.png";
import { link } from "fs";

export default class D3 extends React.Component {
  state = {
    linkInfo: false,
  };

  render() {
    const { linkInfo } = this.state;

    const data = {
      nodes: [
        //   HCA 1
        {
          id: "HCA1",
          name: "HCA1",
          x: 423,
          y: 110,
          size: 2500,
          svg: HCA,
          labelPosition: "top",
        },
        { id: "HCA1-gbe1", name: "gbe1", x: 350, y: 150, svg: GBE },
        { id: "HCA1-gbe2", name: "gbe2", x: 400, y: 150, svg: GBE },
        { id: "HCA1-gbe3", name: "gbe3", x: 450, y: 150, svg: GBE },
        { id: "HCA1-gbe4", name: "gbe4", x: 500, y: 150, svg: GBE },

        // SW 1
        {
          id: "SW1",
          name: "SW1",
          x: 423,
          y: 350,
          size: 2500,
          svg: SW,
          labelPosition: "top",
        },
        { id: "SW1-1", name: "1", x: 350, y: 330, svg: GBE },
        { id: "SW1-3", name: "3", x: 425, y: 370, svg: GBE },
        { id: "SW1-5", name: "5", x: 500, y: 370, svg: GBE },

        // HCA 2
        {
          id: "HCA2",
          name: "HCA2",
          x: 1320,
          y: 110,
          size: 2500,
          svg: HCA,
          labelPosition: "top",
        },
        { id: "HCA2-gbe1", name: "gbe1", x: 1250, y: 150, svg: GBE },
        { id: "HCA2-gbe2", name: "gbe2", x: 1300, y: 150, svg: GBE },
        { id: "HCA2-gbe3", name: "gbe3", x: 1350, y: 150, svg: GBE },
        { id: "HCA2-gbe4", name: "gbe4", x: 1400, y: 150, svg: GBE },

        // SW 2
        {
          id: "SW2",
          name: "SW2",
          x: 1320,
          y: 350,
          size: 2500,
          svg: SW,
          labelPosition: "top",
        },
        { id: "SW2-1", name: "1", x: 1250, y: 330, svg: GBE },
        { id: "SW2-3", name: "3", x: 1325, y: 370, svg: GBE },
        { id: "SW2-5", name: "5", x: 1400, y: 370, svg: GBE },
      ],
      links: [
        { source: "HCA1-gbe1", target: "SW1-1" },

        { source: "SW1-3", target: "SW2-3", type: "CURVE_SMOOTH" },
        { source: "SW1-5", target: "SW2-5", type: "CURVE_SMOOTH" },

        { source: "HCA2-gbe1", target: "SW2-1" },
      ],
    };

    const myConfig = {
      width: "100%",

      nodeHighlightBehavior: true,
      linkHighlightBehavior: true,

      automaticRearrangeAfterDropNode: true,

      staticGraph: true,
      node: {
        color: "lightgreen",
        size: 500,
        highlightStrokeColor: "blue",
        // symbolType: "square",
        labelProperty: "name",
        labelPosition: "bottom",
      },
      link: {
        highlightColor: "lightblue",
        mouseCursor: "pointer",
        renderLabel: false,
        semanticStrokeWidth: false,
      },
    };

    const onClickLink = (source, target) => {
      //   alert(`click ${source} and ${target}`);
      this.setState({
        linkInfo: !this.state.linkInfo,
      });
    };

    return (
      <>
        <div>
          <Graph
            id="graph-id" // id is mandatory
            data={data}
            config={myConfig}
            onClickLink={onClickLink}
          />
        </div>

        <Modal
          title="링크 상세 정보"
          visible={linkInfo}
          okText="확인"
          cancelText="닫기"
          onOk={() =>
            this.setState({
              linkInfo: !this.state.linkInfo,
            })
          }
          onCancel={() =>
            this.setState({
              linkInfo: !this.state.linkInfo,
            })
          }
        >
          dddd
        </Modal>
      </>
    );
  }
}

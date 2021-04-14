import React from "react";
import ReactFlow from "react-flow-renderer";

class Flow extends React.Component {
  render() {
    const Elements = [
      // HCA 1
      {
        id: "1",
        type: "input",
        data: { label: "HCA 1" },
        position: { x: 250, y: 30 },
        style: {
          width: 460,
          height: 130,
        },
      },
      {
        id: "2",
        data: { label: "gbe 1" },
        position: { x: 250, y: 120 },
        style: {
          width: 100,
        },
      },
      {
        id: "3",
        data: { label: "gbc 2" },
        position: { x: 370, y: 120 },
        style: {
          width: 100,
        },
      },
      {
        id: "4",
        data: { label: "gbc 3" },
        position: { x: 490, y: 120 },
        style: {
          width: 100,
        },
      },
      {
        id: "5",
        data: { label: "gbc 4" },
        position: { x: 610, y: 120 },
        style: {
          width: 100,
        },
      },

      // SW 1
      {
        id: "6",
        type: "input",
        data: { label: "SW 1" },
        position: { x: 250, y: 330 },
        style: {
          width: 460,
          height: 130,
        },
      },
      {
        id: "7",
        data: { label: "1" },
        position: {
          x: 250,
          y: 330,
        },
        style: {
          width: 100,
        },
      },
      {
        id: "8",
        data: { label: "3" },
        position: {
          x: 430,
          y: 420,
        },
        style: {
          width: 100,
        },
      },
      {
        id: "9",
        data: { label: "5" },
        position: {
          x: 610,
          y: 420,
        },
        style: {
          width: 100,
        },
      },

      // HCA2
      {
        id: "10",
        type: "input",
        data: { label: "HCA 2" },
        position: { x: 1000, y: 30 },
        style: {
          width: 460,
          height: 130,
        },
      },
      {
        id: "11",
        data: { label: "gbe1" },
        position: { x: 1000, y: 120 },
        style: {
          width: 100,
        },
      },
      {
        id: "12",
        data: { label: "gbe2" },
        position: { x: 1120, y: 120 },
        style: {
          width: 100,
        },
      },
      {
        id: "13",
        data: { label: "gbe3" },
        position: { x: 1240, y: 120 },
        style: {
          width: 100,
        },
      },
      {
        id: "14",
        data: { label: "gbe4" },
        position: { x: 1360, y: 120 },
        style: {
          width: 100,
        },
      },

      // SW 2
      {
        id: "15",
        type: "input",
        data: { label: "SW 2" },
        position: { x: 1000, y: 330 },
        style: {
          width: 460,
          height: 130,
        },
      },
      {
        id: "16",
        data: { label: "1" },
        position: { x: 1000, y: 330 },
        style: {
          width: 100,
        },
      },
      {
        id: "17",
        targetPosition: "bottom",
        data: { label: "3" },
        position: { x: 1180, y: 420 },
        style: {
          width: 100,
        },
      },
      {
        id: "18",
        targetPosition: "bottom",
        data: { label: "5" },
        position: { x: 1360, y: 420 },
        style: {
          width: 100,
        },
      },

      //   link
      { id: "HCA1-SW1-1", source: "2", target: "7", label: "gxpci0" },
      { id: "HCA2-SW2-1", source: "11", target: "16", label: "gxpci0" },
      { id: "SW1-SW2-3", source: "8", target: "17", label: "gxpci0" },
      { id: "SW1-SW2-5", source: "9", target: "18", label: "gxpci0" },
    ];
    return (
      <div className="flow_content_wrap">
        <ReactFlow elements={Elements} />
      </div>
    );
  }
}

export default Flow;

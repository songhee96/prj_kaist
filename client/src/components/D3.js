import React from "react";
import { Graph } from "react-d3-graph";

export default class D3 extends React.Component {
  render() {
    const data = {
      nodes: [
        //   HCA 1
        {
          id: "HCA1",
          name: "HCA1",
          x: 300,
          y: 100,
        },
        { id: "HCA1-gbe1", name: "gbe1", x: 300, y: 150 },
        { id: "HCA1-gbe2", name: "gbe2", x: 300, y: 150 },
        { id: "HCA1-gbe3", name: "gbe3", x: 300, y: 150 },
        { id: "HCA1-gbe4", name: "gbe4", x: 300, y: 150 },

        // SW 1
        { id: "SW1", name: "SW1" },
        { id: "SW1-1", name: "1" },
        { id: "SW1-3", name: "3" },
        { id: "SW1-5", name: "5" },

        // HCA 2
        { id: "HCA2", name: "HCA2" },
        { id: "HCA2-gbe1", name: "gbe1" },
        { id: "HCA2-gbe2", name: "gbe2" },
        { id: "HCA2-gbe3", name: "gbe3" },
        { id: "HCA2-gbe4", name: "gbe4" },

        // SW 2
        { id: "SW2" },
        { id: "SW2-1" },
        { id: "SW2-3" },
        { id: "SW2-5" },
      ],
      links: [
        { source: "HCA1-gbe1", target: "SW1-1" },

        { source: "SW1-3", target: "SW2-3", type: "CURVE_SMOOTH" },
        { source: "SW1-5", target: "SW2-5", type: "CURVE_SMOOTH" },

        { source: "HCA2-gbe1", target: "SW2-1" },
      ],
    };

    const myConfig = {
      nodeHighlightBehavior: true,
      linkHighlightBehavior: true,
      node: {
        color: "lightgreen",
        size: 500,
        highlightStrokeColor: "blue",
        symbolType: "square",
        labelProperty: "name",
        labelPosition: "bottom",
      },
      link: {
        highlightColor: "lightblue",
        renderLabel: false,
        semanticStrokeWidth: false,
      },
    };

    const onClickLink = (source, target) => {
      alert(`click ${source} and ${target}`);
    };

    return (
      <div>
        <Graph
          id="graph-id" // id is mandatory
          data={data}
          config={myConfig}
          onClickLink={onClickLink}
        />
      </div>
    );
  }
}

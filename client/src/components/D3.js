import React from "react";
import { Graph } from "react-d3-graph";

export default class D3 extends React.Component {
  render() {
    const data = {
      nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
      links: [
        { source: "Harry", target: "Sally" },
        { source: "Harry", target: "Alice" },
      ],
    };

    const myConfig = {
      nodeHighlightBehavior: true,
      node: {
        color: "lightgreen",
        size: 120,
        highlightStrokeColor: "blue",
      },
      link: {
        highlightColor: "lightblue",
      },
    };
    return (
      <div>
        <Graph
          id="graph-id" // id is mandatory
          data={data}
          config={myConfig}
        />
      </div>
    );
  }
}

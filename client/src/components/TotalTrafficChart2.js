import React from "react";
import _ from "underscore";
import { format } from "d3-format";
import "bootstrap/dist/css/bootstrap.css";
// import Button from 'react-bootstrap/Button';

import { TimeRange, TimeSeries } from "pondjs";

import {
  styler,
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  Legend,
  Resizable,
  AreaChart,
  MultiBrush,
} from "react-timeseries-charts";

const rawTrarricData = require("./TotalTrafficHCA2.json");

const trafficRXseries = new TimeSeries({
  name: "trafficRX",
  columns: ["time", "in"],
  points: _.map(rawTrarricData.traffic["traffic_Rx"], (p) => [
    p[0] * 1000,
    p[1],
  ]),
});

const trafficTXseries = new TimeSeries({
  name: "trafficTX",
  columns: ["time", "out"],
  points: _.map(rawTrarricData.traffic["traffic_Tx"], (p) => [
    p[0] * 1000,
    p[1],
  ]),
});

const trafficSeries = TimeSeries.timeSeriesListMerge({
  name: "traffic",
  seriesList: [trafficRXseries, trafficTXseries],
});

const upDownStyle = styler([
  { key: "in", color: "#C8D5B8" },
  { key: "out", color: "#9BB8D7" },
]);

const trackerStyle = {
  line: {
    stroke: "#a62011",
    cursor: "crosshair",
    pointerEvents: "none",
  },
};

export default class traffic extends React.Component {
  state = {
    tracker: null,
    timerange: trafficSeries.range(),
    selected: 1,
    selections: [
      new TimeRange(1441059420000, 1441062390000),
      new TimeRange(1441070850000, 1441088580000),
      new TimeRange(1441127730000, 1441137540000),
    ],
  };

  componentDidMount() {
    const trafficRXseries = new TimeSeries({
      name: "trafficRX",
      columns: ["time", "in"],
      points: _.map(this.props.rx, (p) => [p[0] * 1000, p[1]]),
    });

    const trafficTXseries = new TimeSeries({
      name: "trafficTX",
      columns: ["time", "out"],
      points: _.map(this.props.tx, (p) => [p[0] * 1000, p[1]]),
    });

    const trafficSeries = TimeSeries.timeSeriesListMerge({
      name: "traffic",
      seriesList: [trafficRXseries, trafficTXseries],
    });

    const upDownStyle = styler([
      { key: "in", color: "#C8D5B8" },
      { key: "out", color: "#9BB8D7" },
    ]);

    const trackerStyle = {
      line: {
        stroke: "#a62011",
        cursor: "crosshair",
        pointerEvents: "none",
      },
    };
  }

  handleTrackerChanged = (t, scale) => {
    this.setState({
      tracker: t,
      trackerEventIn: t && trafficTXseries.at(trafficTXseries.bisect(t)),
      trackerEventOut: t && trafficRXseries.at(trafficRXseries.bisect(t)),
      trackerX: t && scale(t),
    });
  };

  handleTimeRangeChange = (timerange) => {
    this.setState({ timerange });
  };

  handleSelectionChange = (timerange, i) => {
    const selections = this.state.selections;
    selections[i] = timerange;
    this.setState({ selections });
  };

  render() {
    const dateStyle = {
      fontSize: 12,
      color: "#F4F4F4",
      borderWidth: 1,
      borderColor: "#F4F4F4",
    };

    const markerStyle = {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      color: "#F4F4F4",
      marginLeft: "5px",
    };

    const max = _.max([trafficRXseries.max("in"), trafficTXseries.max("out")]);
    const axistype = "linear";
    const tracker = this.state.tracker ? "${this.state.tracker}" : "";
    const formatter = format(".4s");

    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <Legend
              type="swatch"
              style={upDownStyle}
              categories={[
                { key: "out", label: "Total TX" },
                { key: "in", label: "Total RX" },
              ]}
            />
          </div>
          <div className="col-md-8">
            <span style={dateStyle}>{tracker}</span>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-md-12">
            {this.state.tracker ? (
              <div style={{ position: "relative" }}>
                <div
                  style={{ position: "absolute", left: this.state.trackerX }}
                >
                  <div style={markerStyle}>
                    Data In: {formatter(this.state.trackerEventIn.get("in"))}
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: this.state.trackerX,
                    top: "220px",
                  }}
                >
                  <div style={markerStyle}>
                    Data In: {formatter(this.state.trackerEventOut.get("out"))}
                  </div>
                </div>
              </div>
            ) : null}
            <Resizable>
              <ChartContainer
                timeRange={this.state.timerange}
                trackerPosition={this.state.tracker}
                onTrackerChanged={this.handleTrackerChanged}
                enablePanZoom={false}
                maxTime={trafficSeries.range().end()}
                minTime={trafficSeries.range().begin()}
                minDuration={1000 * 60 * 60}
                onBackgroundClick={() => this.setState({ selection: null })}
                onTimeRangeChanged={this.handleTimeRangeChange}
              >
                <ChartRow height="250" debug={false}>
                  <Charts>
                    <AreaChart
                      axis="traffic"
                      series={trafficSeries}
                      columns={{
                        up: ["in"],
                        down: ["out"],
                      }}
                      style={upDownStyle}
                    />
                  </Charts>
                  <YAxis
                    id="traffic"
                    label="Traffic (bps)"
                    labelOffset={0}
                    min={-max}
                    max={max}
                    absolute={true}
                    width="60"
                    type={axistype}
                  />
                </ChartRow>
              </ChartContainer>
            </Resizable>
          </div>
        </div>
      </div>
    );
  }
}

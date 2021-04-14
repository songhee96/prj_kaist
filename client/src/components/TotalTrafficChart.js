import React from "react";

import _ from "underscore";
import { format } from "d3-format";

import "bootstrap/dist/css/bootstrap.css";
// import Button from 'react-bootstrap/Button';

import { TimeSeries } from "pondjs";

import {
  Resizable,
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  BarChart,
  styler,
} from "react-timeseries-charts";

export default class traffic extends React.Component {
  state = {};

  render() {
    const series = new TimeSeries({
      name: "hilo_rainfall",
      columns: ["index", "precip"],
      points: _.map(this.props.tx, (p) => [p[0], [[1]]]),
    });

    const style = styler([
      {
        key: "precip",
        color: "#A5C8E1",
        selected: "#2CB1CF",
      },
    ]);

    return (
      <div>
        {/* {console.log(series, "확인")} */}
        <div className="row">
          <div className="col-md-12">
            <Resizable>
              <ChartContainer timeRange={series.range()}>
                <ChartRow height="150">
                  <YAxis
                    id="rain"
                    label="Rainfall (inches/hr)"
                    min={0}
                    max={2}
                    format=".2f"
                    width="70"
                    type="linear"
                  />
                  <Charts>
                    <BarChart
                      axis="rain"
                      style={style}
                      spacing={1}
                      columns={["precip"]}
                      series={series}
                      minBarHeight={1}
                    />
                  </Charts>
                </ChartRow>
              </ChartContainer>
            </Resizable>
          </div>
        </div>
      </div>
    );
  }
}

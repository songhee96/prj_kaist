import React from "react";
import ReactApexChart from "react-apexcharts";

export default class TrafficChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Rx",
          data: [this.props.rx],
          // data: [400]
        },
        {
          name: "Tx",
          data: [this.props.tx],
          // data: [-300]
        },
      ],
      options: {
        chart: {
          type: "bar",
          stacked: true,
        },
        colors: ["#339af0", "#51cf66"],
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "10px",
          },
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          reversed: true,
          axisTicks: {
            show: true,
          },
        },
        xaxis: {
          categories: [
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
        />
      </div>
    );
  }
}

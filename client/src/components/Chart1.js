import React from "react";
import Chart from "react-apexcharts";

class Chart1 extends React.Component {
  render() {
    const options = {
      chart: {
        id: "realtime",

        foreColor: "#bcbcbc",

        animations: {
          enabled: false,
          easing: "linear",
          dynamicAnimation: {
            speed: 1000,
          },
        },

        toolbar: {
          show: true,
        },

        zoom: {
          enabled: true,
        },

        dataLabels: {
          enabled: false,
        },
      },

      stroke: {
        curve: "smooth",
      },

      title: {
        text: "Test Graph 1",
        align: "left",
      },
    };

    const series = [
      { data: this.props.data.rawStats },
      // {
      //   data: [
      //     { x: "05/06/2014", y: 54 },
      //     { x: "05/08/2014", y: 17 },
      //     { x: "05/28/2014", y: 26 },
      //   ],
      // },
    ];

    return (
      <>
        <div>
          <Chart options={options} series={series} height="400" />
        </div>
      </>
    );
  }
}

export default Chart1;

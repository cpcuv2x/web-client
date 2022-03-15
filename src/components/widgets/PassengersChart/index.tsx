import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { ApexOptions } from "apexcharts"
import WidgetCard from "../WidgetCard"
import { Typography } from "antd"

interface Props {
  carId: string
}

const PassengersChart: React.FC<Props> = ({ carId }) => {
  const series = [
    {
      name: "passengers",
      data: [7, 7, 7, 7, 8, 8, 9, 7],
    },
  ]
  const options = {
    xaxis: {
      categories: [
        "18:44:50",
        "18:45:00",
        "18:45:10",
        "18:45:20",
        "18:45:30",
        "18:45:40",
        "18:45:50",
        "18:46:00",
      ],
    },
    yaxis: [
      {
        labels: {
          formatter: function (val) {
            return val.toFixed(0)
          },
        },
        min: 0,
        max: 10,
      },
    ],
    grid: {
      show: false,
    },
    theme: {
      mode: "dark",
    },
    chart: {
      id: `passengers-charts-${carId}`,
      toolbar: {
        show: false,
      },
    },
  }

  return (
    <WidgetCard
      title="Passenger(s)"
      helpText="The graph between total number of passengers in this car and time."
      content={
        <div>
          <Typography.Title level={5}>Current: 7</Typography.Title>
          <Chart series={series} options={options} width="100%" height={250} />
        </div>
      }
    />
  )
}

export default PassengersChart

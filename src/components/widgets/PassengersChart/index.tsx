import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { ApexOptions } from "apexcharts"
import WidgetCard from "../WidgetCard"
import { Button, Typography } from "antd"

interface Props {
  carId: string
}

interface ChartValue {
  series: ApexOptions["series"]
  options: ApexOptions
}

const PassengersChart: React.FC<Props> = ({ carId }) => {
  const [chart, setChart] = useState<ChartValue>({
    series: [
      {
        name: "No. of passengers",
        data: [
          // { x: new Date(2022, 3, 23, 10, 0, 0), y: 10 },
          // { x: new Date(2022, 3, 23, 10, 0, 10), y: 5 },
          // { x: new Date(2022, 3, 23, 10, 0, 20), y: 3 },
        ],
      },
    ],
    options: {
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        min: 0,
        tickAmount: 5,
        floating: false,
      },
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
          tools: {
            zoom: false,
          },
        },
      },
    },
  })

  const appendData = () => {
    setChart((prevChart) => {
      const prevSeries = prevChart.series
      const newSeries = []
      if (prevSeries instanceof Array && prevSeries?.length > 0) {
        const prevData = prevSeries[0]?.data
        const prevName = prevSeries[0]?.name
        newSeries.push({
          name: prevName,
          data: prevData.concat({
            x: new Date(),
            y: Math.floor(Math.random() * 10),
          }),
        })
      }

      return {
        options: prevChart.options,
        series: newSeries,
      }
    })
  }

  return (
    <WidgetCard
      title="Passenger(s)"
      helpText="The graph between total number of passengers in this car and time."
      content={
        <div>
          <Typography.Title level={5}>Current: 7</Typography.Title>
          <Button onClick={appendData}>Update</Button>
          <Chart
            series={chart.series}
            options={chart.options}
            width="100%"
            height={250}
          />
        </div>
      }
    />
  )
}

export default PassengersChart

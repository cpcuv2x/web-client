import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { ApexOptions } from "apexcharts"
import _ from "lodash"
import WidgetCard from "../WidgetCard"
import { Button, Typography } from "antd"

interface Props {
  carId: string
  maxPoints?: number
}

interface ChartData {
  name: string
  data: [number, number][]
}

const PassengersChart: React.FC<Props> = ({ carId, maxPoints = 10 }) => {
  const [current, setCurrent] = useState(0)
  const [series, setSeries] = useState<ChartData[]>([
    {
      name: "No. of passengers",
      data: [],
    },
  ])

  const options: ApexOptions = {
    xaxis: {
      type: "datetime",
      // range: 90000,
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
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
    },
  }

  const appendData = () => {
    setSeries((prev) => {
      const newSeries: ChartData[] = _.cloneDeep(prev)
      if (newSeries[0].data.length >= maxPoints) {
        newSeries[0].data.shift()
      }
      newSeries[0].data.push([
        new Date().getTime(),
        Math.floor(Math.random() * 10),
      ])
      return newSeries
    })
  }

  return (
    <WidgetCard
      title="Passenger(s)"
      helpText="The graph between total number of passengers in this car and time."
      content={
        <div>
          <Typography.Title level={5}>Current: {current}</Typography.Title>
          <Button onClick={appendData}>Update</Button>
          <Chart series={series} options={options} width="100%" height={250} />
        </div>
      }
    />
  )
}

export default PassengersChart

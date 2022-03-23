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
  const TICKINTERVAL = 1000 // 1000 ms = 1s
  const XAXISRANGE = TICKINTERVAL * maxPoints // 600000 ms = 600s
  const [current, setCurrent] = useState(0)
  const [series, setSeries] = useState<ChartData[]>([
    {
      name: "No. of passengers",
      data: [[1486684800000, 5]],
    },
  ])

  useEffect(() => {
    const intervalId = setInterval(() => {
      appendData()
    }, TICKINTERVAL)
    return () => clearInterval(intervalId)
  })

  const options: ApexOptions = {
    xaxis: {
      type: "datetime",
      range: XAXISRANGE,
      labels: {
        format: "HH:mm:ss",
      },
    },
    yaxis: {
      min: 0,
      max: 12,
      tickAmount: 6,
      floating: false,
    },
    grid: {
      show: false,
    },
    theme: {
      mode: "dark",
    },
    dataLabels: {
      enabled: true,
    },
    markers: {
      size: 3,
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
        enabled: false,
      },
    },
  }

  const appendData = () => {
    setSeries((prev) => {
      const newSeries: ChartData[] = _.cloneDeep(prev)
      const data = newSeries[0].data
      const lastDate = data[data.length - 1][0]
      if (data.length >= maxPoints) {
        data.shift()
      }
      const newCurrent = Math.floor(Math.random() * 10)
      setCurrent(newCurrent)
      data.push([lastDate + TICKINTERVAL, newCurrent])
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
          {/* <Button onClick={appendData}>Update</Button> */}
          <Chart
            type="line"
            series={series}
            options={options}
            width="100%"
            height={250}
          />
        </div>
      }
    />
  )
}

export default PassengersChart

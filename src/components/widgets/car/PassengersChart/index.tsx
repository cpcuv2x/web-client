import { Typography } from "antd"
import { ApexOptions } from "apexcharts"
import _ from "lodash"
import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import useCarPassengers from "../../../../hooks/socket/useCarPassengers"
import WidgetCard from "../../WidgetCard"

interface Props {
  carId: string
  maxPoints?: number
}

interface ChartData {
  name: string
  data: [string, number][]
}

const PassengersChart: React.FC<Props> = ({ carId, maxPoints = 10 }) => {
  const TICKINTERVAL = 60000 // interval between datapoint
  const XAXISRANGE = TICKINTERVAL * maxPoints
  const [current, setCurrent] = useState(0)
  const [series, setSeries] = useState<ChartData[]>([
    {
      name: "No. of passengers",
      data: [],
    },
  ])

  const passenger = useCarPassengers(carId)

  useEffect(() => {
    if (passenger && passenger.timestamp && passenger.passengers)
      appendData(passenger.timestamp, passenger.passengers)
  }, [JSON.stringify(passenger)])

  const options: ApexOptions = {
    xaxis: {
      type: "datetime",
      range: XAXISRANGE,
      labels: {
        formatter: function (value, timestamp, opts) {
          return new Date(timestamp || "").toLocaleTimeString("en-US", {
            hour12: false,
          })
        },
      },
      tickPlacement: "on",
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
    // theme: {
    //   mode: "dark",
    // },
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

  const appendData = (timestamp: string, passenger: number) => {
    setSeries((prev) => {
      const newSeries: ChartData[] = _.cloneDeep(prev)
      const data = newSeries[0].data
      setCurrent(passenger)
      data.push([timestamp, passenger])
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
          <Chart
            type="line"
            series={series as any}
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

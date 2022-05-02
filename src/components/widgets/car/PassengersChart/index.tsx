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
  const chartName = "No. of passenger(s)"
  const passengersData = useCarPassengers(carId)

  const [currentPassengers, setCurrentPassengers] = useState(0)

  const [data, setData] = useState<[string, number][]>([])
  const [series, setSeries] = useState<ChartData[]>([
    {
      name: chartName,
      data: [],
    },
  ])
  const [options, setOptions] = useState<ApexOptions>({
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
      tickPlacement: "on",
    },
    yaxis: {
      min: 0,
      max: 10,
      tickAmount: 5,
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
    tooltip: {
      x: {
        format: "dd MMM HH:mm:ss",
      },
    },
  })

  useEffect(() => {
    if (
      passengersData &&
      passengersData.passengers &&
      passengersData.timestamp
    ) {
      // Update current passengers value
      setCurrentPassengers(passengersData.passengers)
      // Update graph
      if (data.length >= maxPoints) {
        setData([
          ...data.slice(1),
          [passengersData.timestamp, passengersData.passengers],
        ])
      } else {
        setData([
          ...data,
          [passengersData.timestamp, passengersData.passengers],
        ])
      }
    }
  }, [JSON.stringify(passengersData)])

  useEffect(() => {
    setSeries([
      {
        name: chartName,
        data,
      },
    ])
  }, [JSON.stringify(data)])

  return (
    <WidgetCard
      title="Passenger(s)"
      helpText="The graph between total number of passengers in this car and time."
      content={
        <div>
          <Typography.Title level={5}>
            Current Passenger(s): {currentPassengers}
          </Typography.Title>
          <Chart
            type="area"
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

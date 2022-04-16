import { Typography } from "antd"
import { ApexOptions } from "apexcharts"
import _ from "lodash"
import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import useDriverECR from "../../../../hooks/socket/useDriverECR"
import WidgetCard from "../../WidgetCard"

interface Props {
  driverId: string
  maxPoints?: number
}

interface ChartData {
  name: string
  data: [string, number][]
}

const DriverECRChart: React.FC<Props> = ({
  driverId,
  maxPoints = 10,
}: Props) => {
  const TICKINTERVAL = 30000 // interval between datapoint
  const XAXISRANGE = TICKINTERVAL * maxPoints
  const [current, setCurrent] = useState(0)
  const [series, setSeries] = useState<ChartData[]>([
    {
      name: "ECR",
      data: [],
    },
  ])

  const ecr = useDriverECR(driverId)

  useEffect(() => {
    if (ecr && ecr.timestamp && ecr.ecr) appendData(ecr.timestamp, ecr.ecr)
  }, [JSON.stringify(ecr)])

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
      max: 1,
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
      id: `ecr-chart-${driverId}`,
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

  const appendData = (timestamp: string, ecr: number) => {
    setSeries((prev) => {
      const newSeries: ChartData[] = _.cloneDeep(prev)
      const data = newSeries[0].data
      setCurrent(ecr)
      data.push([timestamp, ecr])
      return newSeries
    })
  }

  return (
    <WidgetCard
      title="ECR"
      helpText="The graph between ECR value of this driver and time."
      content={
        <div>
          <Typography.Title level={5}>Current: {current}</Typography.Title>
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

export default DriverECRChart

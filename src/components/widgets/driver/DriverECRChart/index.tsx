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
  const ecrData = useDriverECR(driverId)

  const [currentEcr, setCurrentEcr] = useState(0)
  const [currentEcrThreshold, setCurrentEcrThreshold] = useState(0)

  const [data, setData] = useState<[string, number][]>([])
  const [series, setSeries] = useState<ChartData[]>([
    {
      name: "ECR",
      data: [],
    },
  ])

  const [options, setOptions] = useState<ApexOptions>({
    annotations: {
      yaxis: [
        {
          y: 0,
          borderColor: "#00E396",
          label: {
            text: "ECR threshold",
            style: {
              color: "#fff",
              background: "#00E396",
            },
          },
        },
      ],
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
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
    tooltip: {
      x: {
        format: "dd MMM HH:mm:ss",
      },
    },
  })

  useEffect(() => {
    if (ecrData && ecrData.timestamp && ecrData.ecr && ecrData.ecrThreshold) {
      // Update current ECR value
      setCurrentEcr(ecrData.ecr)
      // Update current threshold value
      setCurrentEcrThreshold(ecrData.ecrThreshold)
      // Update threshold line
      setOptions((prevOptions) => {
        if (
          Array.isArray(prevOptions.annotations?.yaxis) &&
          prevOptions.annotations?.yaxis.length &&
          prevOptions.annotations?.yaxis[0]?.y !== undefined
        ) {
          prevOptions.annotations.yaxis[0].y = ecrData.ecrThreshold
        }
        return prevOptions
      })
      // Update graph
      if (data.length >= maxPoints) {
        setData([...data.slice(1), [ecrData.timestamp, ecrData.ecr]])
      } else {
        setData([...data, [ecrData.timestamp, ecrData.ecr]])
      }
    }
  }, [JSON.stringify(ecrData)])

  useEffect(() => {
    setSeries([
      {
        name: "ECR",
        data,
      },
    ])
  }, [JSON.stringify(data)])

  return (
    <WidgetCard
      title="ECR"
      helpText="The graph between ECR value of this driver and time."
      content={
        <div>
          <Typography.Title level={5}>
            Current ECR: {currentEcr}, Threshold: {currentEcrThreshold}
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

export default DriverECRChart

import { Typography } from "antd"
import { ApexOptions } from "apexcharts"
import _ from "lodash"
import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import useSWR from "swr"
import useDriverECR from "../../../../hooks/socket/useDriverECR"
import axiosClient from "../../../../utils/axiosClient"
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
  const chartName = "ECR chart"

  const emptySeries = [
    {
      name: chartName,
      data: [],
    },
  ]

  const ecrData = useDriverECR(driverId)

  const [currentEcr, setCurrentEcr] = useState(0)
  const [currentEcrThreshold, setCurrentEcrThreshold] = useState(0)

  const [series, setSeries] = useState<ChartData[]>(emptySeries)

  useEffect(()=>{
    if(driverId){

      const date = new Date();
      const startDate = new Date(date);
      startDate.setMinutes(startDate.getMinutes()-6);
      const endDate = new Date(date);
      endDate.setMinutes(endDate.getMinutes());
      
      const url = `/api/drivers/${driverId}/ecr?startTime=${startDate.toISOString()}&endTime=${endDate.toISOString()}`

      axiosClient
        .get(url)
        .then((res) => {

          const beginTime = res.data.length > 0 ? new Date(res.data[0][0]) : new Date();
          const length = res.data.length ? res.data.length : 0;
          const data = res.data;
          let temp = [];
      
          for(let i=0; i<maxPoints-length; i++){
            beginTime.setSeconds(beginTime.getSeconds()-30)
            temp.unshift([new Date(beginTime), 0])
          }

          setSeries([
            {
              name: chartName,
              data: [
                ...temp,
                ...(data.length >= maxPoints ? data.slice(data.length-maxPoints) : data),
              ],
            },
          ])
        })
    }
    setSeries(emptySeries);
  }, [driverId])

  useEffect(()=>{}, [])
  
  const [options, setOptions] = useState<ApexOptions>({
    annotations: {
      yaxis: [
        {
          y: 0,
          borderColor: "#00E396",
          label: {
            text: "ECR threshold: 0",
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
      const { ecr, timestamp, ecrThreshold } = ecrData
      // Update current ECR value
      setCurrentEcr(ecr)
      // Update current threshold value
      setCurrentEcrThreshold(ecrThreshold)
      // Update threshold line
      setOptions((options) => {
        const newOptions = _.cloneDeep(options)
        if (newOptions.annotations?.yaxis?.[0]) {
          const isDanger = ecr >= ecrThreshold
          const lineColor = isDanger ? "#FF4560" : "#2E93fA"
          const annotationColor = isDanger ? "#FF4560" : "#00E396"
          newOptions.colors = [lineColor]
          newOptions.annotations.yaxis[0] = {
            y: ecrThreshold,
            borderColor: annotationColor,
            label: {
              text: `ECR threshold: ${ecrThreshold}`,
              style: {
                color: "#fff",
                background: annotationColor,
              },
            },
          }
        }
        return newOptions
      })
      // Update graph
      setSeries((series) => {
        const data = series[0].data
        return [
          {
            name: chartName,
            data: [
              ...(data.length >= maxPoints ? data.slice(data.length-maxPoints+1) : data),
              [timestamp, ecr],
            ],
          },
        ]
      })
    }
  }, [ecrData?.timestamp])

  return (
    <WidgetCard
      title="Drowsiness Detection"
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

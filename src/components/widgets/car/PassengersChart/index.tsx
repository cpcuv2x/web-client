import { Typography } from "antd"
import { ApexOptions } from "apexcharts"
import _ from "lodash"
import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import useCarPassengers from "../../../../hooks/socket/useCarPassengers"
import axiosClient from "../../../../utils/axiosClient"
import WidgetCard from "../../WidgetCard"

interface Props {
  carId: string
  maxPoints?: number
}

interface ChartData {
  name: string
  data: [string, number][]
}

const chartName = "No. of passenger(s)"

const emptySeries = [
  {
    name: chartName,
    data: [],
  },
];

const PassengersChart: React.FC<Props> = ({ carId, maxPoints = 10 }) => {

  const passengersData = useCarPassengers(carId)

  const [currentPassengers, setCurrentPassengers] = useState(0)

  const [series, setSeries] = useState<ChartData[]>(emptySeries)

  useEffect(()=>{
    if(carId){

      const date = new Date();
      const startDate = new Date(date);
      startDate.setMinutes(startDate.getMinutes()-15);
      const endDate = new Date(date);
      endDate.setMinutes(endDate.getMinutes()+5);
      
      const url = `/api/cars/${carId}/passengers?startTime=${startDate.toISOString()}&endTime=${endDate.toISOString()}`

      axiosClient
        .get(url)
        .then((res) => {

          const beginTime = res.data.length > 0 ? new Date(res.data[0][0]) : new Date();
          const length = res.data.length ? res.data.length : 0;
          const data = res.data;
          let temp = [];
          console.log(data);
      
          for(let i=0; i<maxPoints-length; i++){
            beginTime.setSeconds(beginTime.getSeconds()-30)
            temp.unshift([new Date(beginTime), 0])
          }

          if(data.length > 0) setCurrentPassengers(data.at(-1)[1])

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

      setSeries(emptySeries);
    }
  }, [carId])

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
      const { passengers, timestamp } = passengersData
      // Update current passengers value
      setCurrentPassengers(passengers)
      // Update graph
      setSeries((series) => {
        const data = series[0].data
        return [
          {
            name: chartName,
            data: [
              ...(data.length >= maxPoints ? data.slice(1) : data),
              [timestamp, passengers],
            ],
          },
        ]
      })
    }
  }, [passengersData?.timestamp])

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

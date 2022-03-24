import { Typography } from "antd"
import { ApexOptions } from "apexcharts"
import _ from "lodash"
import React, { useEffect, useRef, useState } from "react"
import Chart from "react-apexcharts"
import { io, Socket } from "socket.io-client"
import WidgetCard from "../WidgetCard"

interface Props {
  carId: string
  maxPoints?: number
}

interface ChartData {
  name: string
  data: [number, number][]
}

const PassengersChart: React.FC<Props> = ({ carId, maxPoints = 10 }) => {
  const TICKINTERVAL = 3000 // interval between datapoint
  const XAXISRANGE = TICKINTERVAL * maxPoints
  const [current, setCurrent] = useState(0)
  const [series, setSeries] = useState<ChartData[]>([
    {
      name: "No. of passengers",
      data: [],
    },
  ])

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     appendData()
  //   }, TICKINTERVAL)
  //   return () => clearInterval(intervalId)
  // })

  const [id, setId] = useState("")
  const socket = useRef<Socket>()

  useEffect(() => {
    socket.current = io("http://localhost:5000/")
    socket.current?.on("connect", () => {
      console.log("connected")
      socket.current?.emit(
        "START_STREAM_CAR_PASSENGERS",
        "b9c64923-9fca-4c37-af82-6f59496bf542",
        (id: any) => {
          console.log("id", id)
          setId(id)
          socket.current?.on(id, (data: any) => {
            console.log(data)
            appendData(data["time"] * 1000, data["passenger"])
          })
        }
      )
    })

    return () => {
      socket.current?.close()
    }
  }, [])

  // const onDisconnect = () => {
  //   socket.current?.emit("STOP_STREAM", id)
  // }

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

  const appendData = (time: number, passenger: number) => {
    setSeries((prev) => {
      const newSeries: ChartData[] = _.cloneDeep(prev)
      const data = newSeries[0].data
      setCurrent(passenger)
      data.push([time, passenger])
      return newSeries
    })
  }

  // const appendData = () => {
  //   setSeries((prev) => {
  //     const newSeries: ChartData[] = _.cloneDeep(prev)
  //     const data = newSeries[0].data
  //     const lastDate = data[data.length - 1][0]
  //     if (data.length >= maxPoints) {
  //       data.shift()
  //     }
  //     const newCurrent = Math.floor(Math.random() * 10)
  //     setCurrent(newCurrent)
  //     data.push([lastDate + TICKINTERVAL, newCurrent])
  //     return newSeries
  //   })
  // }

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

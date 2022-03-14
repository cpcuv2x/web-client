import React from "react"
import Chart from "react-apexcharts"
import { ApexOptions } from "apexcharts"
import WidgetCard from "../WidgetCard"
import { Typography } from "antd"

interface Props {
  carId: string
}

const PassengersChart: React.FC<Props> = ({ carId }) => {
  const series: ApexOptions["series"] = [
    {
      name: "Passengers",
      data: [19, 22, 20, 26],
    },
  ]
  const options: ApexOptions = {
    xaxis: {
      categories: ["2022-03-01", "2022-03-02", "2022-03-03", "2022-03-04"],
    },
    grid: {
      show: false,
    },
    theme: {
      mode: "dark",
    },
    chart: {
      id: `passengers-${carId}`,
      toolbar: {
        show: false,
      },
    },
  }
  return (
    <WidgetCard
      title={"Passenger(s)"}
      helpText={
        "The graph between total number of passengers in this car and time."
      }
      content={
        <div>
          <Typography.Title level={5}>Current: 20</Typography.Title>
          <Chart series={series} options={options} width="100%" height={200} />
        </div>
      }
    />
  )
}

export default PassengersChart

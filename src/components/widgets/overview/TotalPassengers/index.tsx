import { Table, Typography } from "antd"
import { ColumnsType } from "antd/lib/table"
import { useState } from "react"
import useTotalPassengers from "../../../../hooks/useTotalPassengers"
import { CarStatus } from "../../../../interfaces/Car"
import { CarOverviewInformation } from "../../../../interfaces/Overview"
import WidgetCard from "../../WidgetCard"

interface props {
  cars: CarOverviewInformation[]
  totalPassengers: number
}

const TotalPassengers: React.FC<props> = ({ cars, totalPassengers }) => {
  const pagination = 3
  const [page, setPage] = useState<number>(1)

  const columns: ColumnsType<CarOverviewInformation> = [
    {
      key: "no",
      align: "center",
      render: (value, record, index) => (
        <Typography.Text
          style={{
            color: record.status === CarStatus.ACTIVE ? "#ed1170" : "#666666",
          }}
        >
          {(page - 1) * pagination + index + 1}
        </Typography.Text>
      ),
    },
    {
      title: "Car ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (_, record) => (
        <Typography.Text
          style={{
            color: record.status === CarStatus.ACTIVE ? "#ed1170" : "#666666",
          }}
        >
          {record.id}
        </Typography.Text>
      ),
    },
    {
      title: "Passenger(s)",
      dataIndex: "passengers",
      key: "passengers",
      align: "center",
      render: (passengers) => passengers,
    },
  ]

  return (
    <WidgetCard
      title={`Total Passenger(s) : ${totalPassengers}`}
      helpText={"Total number of passengers in all cars."}
      content={
        <Table
          columns={columns}
          dataSource={cars}
          size={"small"}
          pagination={{
            pageSize: pagination,
            simple: true,
            size: "small",
            hideOnSinglePage: true,
            position: ["bottomCenter"],
            onChange(current) {
              setPage(current)
            },
          }}
        ></Table>
      }
      padding={0}
    />
  )
}

export default TotalPassengers

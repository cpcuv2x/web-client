import { Table, Typography } from "antd"
import { ColumnsType } from "antd/lib/table"
import useTotalPassengers from "../../../../hooks/useTotalPassengers"
import { CarStatus } from "../../../../interfaces/Car"
import WidgetCard from "../../WidgetCard"

interface DataType {
  id: string
  passengers: number
  status: CarStatus
}

const TotalPassengers = () => {
  const { data } = useTotalPassengers()

  const columns: ColumnsType<DataType> = [
    {
      title: "Car ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (_, record) => (
        <Typography.Text
          style={{
            color: record.status === CarStatus.ACTIVE ? "#ed1170" : "#c0c0c0",
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
      title={`Total Passenger(s) : ${data?.totalPassengers}`}
      helpText={"Total number of passengers in all cars."}
      content={
        <Table
          columns={columns}
          dataSource={data?.eachCarPassengers}
          size={"small"}
          pagination={{
            pageSize: 3,
            simple: true,
            size: "small",
            hideOnSinglePage: true,
            position: ["bottomCenter"],
          }}
        ></Table>
      }
      padding={0}
    />
  )
}

export default TotalPassengers

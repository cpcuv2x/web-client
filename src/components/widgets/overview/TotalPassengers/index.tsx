import { Table } from "antd"
import { ColumnsType } from "antd/lib/table"
import useTotalPassengers from "../../../../hooks/socket/useTotalPassengers"
import WidgetCard from "../../WidgetCard"

interface DataType {
  id: string
  passengers: number
}

const TotalPassengers = () => {
  const total = useTotalPassengers()

  const columns: ColumnsType<DataType> = [
    {
      title: "Car ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (id) => id,
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
      title={`Total Passenger(s) : ${total.totalPassengers}`}
      helpText={"Total number of passengers in all cars."}
      content={
        <Table
          columns={columns}
          dataSource={total.eachCarPassengers}
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

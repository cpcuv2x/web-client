import { Table } from "antd"
import React from "react"
import WidgetCard from "../WidgetCard"

const { Column } = Table

interface Props {
  carId: string
}

const AccidentsLogByCar: React.FC<Props> = ({ carId }) => {
  const data = [
    {
      createdAt: "2022-03-01 23:12:00",
      id: "acc1",
      lat: 13.738498349970362,
      long: 100.53259748277665,
      driverName: "Somchai",
    },
  ]
  return (
    <WidgetCard
      title={"Accidents Log"}
      helpText={"Accidents occurred with this car."}
      content={
        <Table dataSource={data}>
          <Column title="Time occurred" dataIndex="createdAt" key="createdAt" />
          <Column title="ID" dataIndex="id" key="id" />
          <Column title="Latitude" dataIndex="lat" key="lat" />
          <Column title="Longitude" dataIndex="long" key="long" />
          <Column title="Driver" dataIndex="driverName" key="driverName" />
        </Table>
      }
    />
  )
}

export default AccidentsLogByCar

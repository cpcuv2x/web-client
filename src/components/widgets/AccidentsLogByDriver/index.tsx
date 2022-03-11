import { Table } from "antd"
import React from "react"
import WidgetCard from "../WidgetCard"

const { Column } = Table

interface Props {
  driverId: string
}

const AccidentsLogByDriver: React.FC<Props> = ({ driverId }) => {
  const data = [
    {
      createdAt: "2022-03-01 23:12:00",
      id: "acc1",
      lat: 13.738498349970362,
      long: 100.53259748277665,
      carId: "AA-0000",
    },
  ]
  return (
    <WidgetCard
      title={"Accidents Log"}
      helpText={"Accidents occurred with this driver."}
      content={
        <Table dataSource={data}>
          <Column title="Time occurred" dataIndex="createdAt" key="createdAt" />
          <Column title="ID" dataIndex="id" key="id" />
          <Column title="Latitude" dataIndex="lat" key="lat" />
          <Column title="Longitude" dataIndex="long" key="long" />
          <Column title="Car" dataIndex="carId" key="carId" />
        </Table>
      }
    />
  )
}

export default AccidentsLogByDriver

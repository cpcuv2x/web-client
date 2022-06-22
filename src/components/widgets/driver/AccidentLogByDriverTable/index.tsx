import { ReloadOutlined } from "@ant-design/icons"
import { LoadScript } from "@react-google-maps/api"
import { Button, Col, DatePicker, Row, Table, Typography } from "antd"
import { ColumnsType } from "antd/lib/table"
import moment, { Moment } from "moment"
import React, { useState } from "react"
import appConfig from "../../../../configuration"
import useAccidentLogByDriver from "../../../../hooks/useAccidentLogByDriver"
import { AccidentLogByDriver } from "../../../../interfaces/Driver"
import IDColumn from "../../../IDColumn"
import AccidentDetailMapComponent from "../../AccidentDetailMapComponent"
import WidgetCard from "../../WidgetCard"

interface Props {
  driverId: string
}

type EventValue<DateType> = DateType | null
type RangeValue<DateType> = [EventValue<DateType>, EventValue<DateType>] | null

const AccidentLogByDriverTable: React.FC<Props> = ({ driverId }) => {
  const [dateRange, setDateRange] = useState<RangeValue<Moment>>([
    moment().subtract(1, "hours"),
    moment(),
  ])

  const startTime =
    dateRange?.length && dateRange[0] ? dateRange[0].toISOString() : ""
  const endTime =
    dateRange?.length && dateRange[1] ? dateRange[1].toISOString() : ""

  const { accidents, loading, mutate } = useAccidentLogByDriver(
    driverId,
    startTime,
    endTime
  )

  function reload() {
    mutate()
  }

  function onDateTimeChange(dates: RangeValue<Moment>) {
    setDateRange(dates)
  }
  //FIXME : Mock up data
  const mockUpDate = [
    {
      id: "A0001",
      carId: "C0001",
      driverId: "D0001",
      lat: 13.739839,
      long: 100.531367,
      timestamp: "1655699278"
    },
    {
      id: "A0002",
      carId: "C0001",
      driverId: "D0001",
      lat: 13.739839,
      long: 100.531367,
      timestamp: "1655700278"
    },
    ]

  const columns: ColumnsType<AccidentLogByDriver> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      // sorter: true,
      ellipsis: true,
      render: (id) => <IDColumn id={id} />,
    },
    {
      title: "Vehicle",
      dataIndex: "carId",
      key: "carId",
      // sorter: true,
      ellipsis: true,
      render: (id) => <IDColumn id={id} />,
    },
    {
      title: "Time Occurred",
      dataIndex: "timestamp",
      key: "timestamp",
      // sorter: true,
      render: (timestamp: string) =>
        moment(timestamp).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "Detail",
      dataIndex : ["lat", 'long'],
      key: "id",
      render: (_, record) => <AccidentDetailMapComponent data={record}/>,
    },
  ]

  return (
    <>
      <WidgetCard
        title={
          <Row justify="space-between">
            <Col>Accidents Log</Col>
            <Col style={{ marginRight: 8 }}>
              <DatePicker.RangePicker
                format="DD/MM/YYYY HH:mm:ss"
                showTime
                onChange={onDateTimeChange}
                value={dateRange}
              />
            </Col>
          </Row>
        }
        helpText="Accidents occurred with this driver."
        content={
          <Table
            dataSource={mockUpDate}
            columns={columns}
            rowKey="id"
            loading={loading}
            tableLayout="fixed"
            title={() => (
              <Row justify="space-between">
                <Col>
                  <Typography.Text>
                    Total: {accidents.length} item(s)
                  </Typography.Text>
                </Col>
                <Col>
                  <Button onClick={reload} icon={<ReloadOutlined />}>
                    Reload
                  </Button>
                </Col>
              </Row>
            )}
          />
        }
      />
    </>
  )
}

export default AccidentLogByDriverTable

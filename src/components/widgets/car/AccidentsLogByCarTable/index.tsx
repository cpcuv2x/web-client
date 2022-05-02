import { ReloadOutlined } from "@ant-design/icons"
import { Button, Col, DatePicker, Row, Table, Tooltip, Typography } from "antd"
import { ColumnsType } from "antd/lib/table"
import moment, { Moment } from "moment"
import React, { useState } from "react"
import useAccidentsLogByCar from "../../../../hooks/useAccidentsLogByCar"
import { AccidentLogByCar } from "../../../../interfaces/Car"
import IDColumn from "../../../IDColumn"
import WidgetCard from "../../WidgetCard"

interface Props {
  carId: string
}

type EventValue<DateType> = DateType | null
type RangeValue<DateType> = [EventValue<DateType>, EventValue<DateType>] | null

const AccidentsLogByCarTable: React.FC<Props> = ({ carId }) => {
  const [dateRange, setDateRange] = useState<RangeValue<Moment>>([
    moment().subtract(1, "hours"),
    moment(),
  ])

  const startTime =
    dateRange?.length && dateRange[0] ? dateRange[0].toISOString() : ""
  const endTime =
    dateRange?.length && dateRange[1] ? dateRange[1].toISOString() : ""

  const { accidents, loading, mutate } = useAccidentsLogByCar(
    carId,
    startTime,
    endTime
  )

  function reload() {
    mutate()
  }

  function onDateTimeChange(dates: RangeValue<Moment>) {
    setDateRange(dates)
  }

  const columns: ColumnsType<AccidentLogByCar> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      // sorter: true,
      ellipsis: true,
      render: (id) => <IDColumn id={id} />,
    },
    {
      title: "Driver",
      dataIndex: "driverId",
      key: "driverId",
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
      title: "Latitude",
      dataIndex: "lat",
      key: "lat",
      // sorter: true,
    },
    {
      title: "Longitude",
      dataIndex: "long",
      key: "long",
      // sorter: true,
    },
  ]

  return (
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
      helpText="Accidents occurred with this car."
      content={
        <Table
          dataSource={accidents}
          columns={columns}
          rowKey="id"
          loading={loading}
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
  )
}

export default AccidentsLogByCarTable

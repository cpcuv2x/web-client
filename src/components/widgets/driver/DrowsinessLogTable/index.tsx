import { ReloadOutlined } from "@ant-design/icons"
import { Button, Col, DatePicker, Row, Table, Typography } from "antd"
import { ColumnsType } from "antd/lib/table"
import moment, { Moment } from "moment"
import React, { useState } from "react"
import useDrowsinessLog from "../../../../hooks/useDrowsinessLog"
import { DrowsinessLog } from "../../../../interfaces/Driver"
import IDColumn from "../../../IDColumn"
import WidgetCard from "../../WidgetCard"

interface Props {
  driverId: string
}

type EventValue<DateType> = DateType | null
type RangeValue<DateType> = [EventValue<DateType>, EventValue<DateType>] | null

const DrowsinessLogTable: React.FC<Props> = ({ driverId }) => {
  const [dateRange, setDateRange] = useState<RangeValue<Moment>>([
    moment().subtract(1, "hours"),
    moment(),
  ])

  const startTime =
    dateRange?.length && dateRange[0] ? dateRange[0].toISOString() : ""
  const endTime =
    dateRange?.length && dateRange[1] ? dateRange[1].toISOString() : ""

  const { drowsiness, loading, mutate } = useDrowsinessLog(
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

  const columns: ColumnsType<DrowsinessLog> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      // sorter: true,
      ellipsis: true,
      render: (id) => <IDColumn id={id} />,
    },
    {
      title: "Car",
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
    {
      title: "Response Time (s)",
      dataIndex: "responseTime",
      key: "responseTime",
      // sorter: true,
    },
  ]

  return (
    <WidgetCard
      title={
        <Row justify="space-between">
          <Col>Drowsiness Log</Col>
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
      helpText="Drowsiness history of this driver."
      content={
        <Table
          dataSource={drowsiness}
          columns={columns}
          rowKey="id"
          loading={loading}
          tableLayout="fixed"
          title={() => (
            <Row justify="space-between">
              <Col>
                <Typography.Text>
                  Total: {drowsiness.length} item(s)
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

export default DrowsinessLogTable

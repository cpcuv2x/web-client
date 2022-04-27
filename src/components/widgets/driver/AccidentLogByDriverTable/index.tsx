import { ReloadOutlined } from "@ant-design/icons"
import { Button, Col, DatePicker, Row, Table, Tooltip, Typography } from "antd"
import { ColumnsType } from "antd/lib/table"
import moment, { Moment } from "moment"
import React, { useState } from "react"
import useAccidentLogByDriver from "../../../../hooks/useAccidentLogByDriver"
import { AccidentLogByDriver } from "../../../../interfaces/Driver"
import CopyToClipboardButton from "../../../CopyToClipboardButton"
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

  const columns: ColumnsType<AccidentLogByDriver> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      // sorter: true,
      ellipsis: true,
      render: (id) => (
        <Row justify="space-between" gutter={8} wrap={false}>
          <Col>
            <CopyToClipboardButton text={id} />
          </Col>
          <Col>
            <Tooltip title={id}>{id}</Tooltip>
          </Col>
        </Row>
      ),
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
      title: "Car",
      dataIndex: "carId",
      key: "carId",
      // sorter: true,
      ellipsis: true,
      render: (id) => (
        <Row justify="space-between" gutter={8} wrap={false}>
          <Col>
            <CopyToClipboardButton text={id} />
          </Col>
          <Col>
            <Tooltip title={id}>{id}</Tooltip>
          </Col>
        </Row>
      ),
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
      helpText="Accidents occurred with this driver."
      content={
        <Table
          dataSource={accidents}
          columns={columns}
          rowKey="id"
          loading={loading}
          tableLayout="fixed"
          pagination={false}
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

export default AccidentLogByDriverTable

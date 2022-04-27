import { ReloadOutlined } from "@ant-design/icons"
import { Button, Col, DatePicker, Row, Table, Tooltip, Typography } from "antd"
import { ColumnsType } from "antd/lib/table"
import moment, { Moment } from "moment"
import React, { useState } from "react"
import useDrowsinessLog from "../../../../hooks/useDrowsinessLog"
import { DrowsinessLog } from "../../../../interfaces/Driver"
import CopyToClipboardButton from "../../../CopyToClipboardButton"
import WidgetCard from "../../WidgetCard"

interface Props {
  driverId: string
}

const DrowsinessLogTable: React.FC<Props> = ({ driverId }) => {
  const [dateRange, setDateRange] = useState([
    moment().subtract(1, "hours"),
    moment(),
  ])

  const { drowsiness, loading, mutate } = useDrowsinessLog(
    driverId,
    dateRange[0].toISOString(),
    dateRange[1].toISOString()
  )

  function reload() {
    mutate()
  }

  function onDateTimeChange(dates: [Moment, Moment]) {
    setDateRange(dates)
  }

  const columns: ColumnsType<DrowsinessLog> = [
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
              defaultValue={[moment().subtract(1, "hours"), moment()]}
            />
          </Col>
        </Row>
      }
      helpText="Drowsiness history of this driver"
      content={
        <Table
          dataSource={drowsiness}
          columns={columns}
          rowKey="id"
          loading={loading}
          tableLayout="fixed"
          pagination={false}
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

import { ReloadOutlined } from "@ant-design/icons"
import { Button, Col, DatePicker, Row, Table, Typography } from "antd"
import { ColumnsType } from "antd/lib/table"
import moment, { Moment } from "moment"
import React, { useState } from "react"
import useAccidentsLogByCar from "../../../../hooks/useAccidentsLogByCar"
import { CarAccident } from "../../../../interfaces/Car"
import CopyToClipboardButton from "../../../CopyToClipboardButton"
import WidgetCard from "../../WidgetCard"

interface Props {
  carId: string
}

const AccidentsLogByCar: React.FC<Props> = ({ carId }) => {
  const [startTime, setStartTime] = useState(moment().subtract(1, "hours"))
  const [endTime, setEndTime] = useState(moment())
  const { accidents, loading, mutate } = useAccidentsLogByCar(
    carId,
    startTime.toISOString(),
    endTime.toISOString()
  )

  const onDateTimeChange = ([sTime, eTime]: [Moment, Moment]) => {
    setStartTime(sTime)
    setEndTime(eTime)
  }

  function reload() {
    mutate()
  }

  const columns: ColumnsType<CarAccident> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
      render: (id) => (
        <Row justify="space-between" gutter={8}>
          <Col style={{ maxWidth: 100 }}>
            <Typography.Text ellipsis>{id}</Typography.Text>
          </Col>
          <Col>
            <CopyToClipboardButton text={id} />
          </Col>
        </Row>
      ),
    },
    {
      title: "Time Occurred",
      dataIndex: "timestamp",
      key: "timestamp",
      sorter: true,
      render: (timestamp) => {
        return moment(timestamp).format("DD/MM/YYYY HH:mm:ss")
      },
    },
    {
      title: "Latitude",
      dataIndex: "lat",
      key: "lat",
      sorter: true,
    },
    {
      title: "Longitude",
      dataIndex: "long",
      key: "long",
      sorter: true,
    },
  ]

  // FIXME: change onDateTimeChange type
  return (
    <WidgetCard
      title={
        <Row justify="space-between">
          <Col>Accidents Log</Col>
          <Col style={{ marginRight: 8 }}>
            <DatePicker.RangePicker
              showTime
              onChange={onDateTimeChange}
              defaultValue={[moment().subtract(1, "hours"), moment()]}
            />
          </Col>
        </Row>
      }
      helpText={"Accidents occurred with this car."}
      content={
        <Table
          dataSource={accidents}
          columns={columns}
          rowKey="id"
          loading={loading}
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

export default AccidentsLogByCar

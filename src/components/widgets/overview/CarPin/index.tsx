import { ControlOutlined, PieChartOutlined } from "@ant-design/icons"
import { Marker } from "@react-google-maps/api"
import { Button, Col, Modal, Row, Space, Typography } from "antd"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import activeBusPin from "../../../../assets/bus_pin_active.svg"
import inactiveBusPin from "../../../../assets/bus_pin_inactive.svg"
import useCarInformation from "../../../../hooks/useCarInformation"
import { CarPosition, CarStatus } from "../../../../interfaces/Car"
import { routes } from "../../../../routes/constant"

interface Props {
  position: CarPosition
  carId: string
}

const CarPin: React.FC<Props> = ({ position, carId }) => {
  const navigate = useNavigate()
  const { car } = useCarInformation(carId)

  function onClick() {
    const current = new Date()
    const modal = Modal.info({
      title: "Vehicle information",
      content: (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Typography.Text>Vehicle ID: {car?.id}</Typography.Text>
          <Typography.Text>License Plate: {car?.licensePlate}</Typography.Text>
          <Typography.Text>Passengers: {car?.passengers}</Typography.Text>
          <Typography.Text>
            Status: {car?.status != null ? car?.status : CarStatus.INACTIVE}
          </Typography.Text>
          <Typography.Text type="secondary">
            Last updated: {current.toLocaleTimeString()}
          </Typography.Text>
          <Row gutter={12}>
            <Col span={12}>
              <Button
                block
                icon={<PieChartOutlined />}
                onClick={() => {
                  navigate(`${routes.DASHBOARD_CAR}/${carId}`)
                  modal.destroy()
                }}
              >
                Dashboard
              </Button>
            </Col>
            <Col span={12}>
              <Button
                block
                icon={<ControlOutlined />}
                onClick={() => {
                  navigate(`${routes.ENTITY_CAR}?id=${carId}`)
                  modal.destroy()
                }}
              >
                Manage
              </Button>
            </Col>
          </Row>
        </Space>
      ),
      centered: true,
      icon: false,
    })
  }
  const isActive = car?.status === CarStatus.ACTIVE
  const icon = isActive ? activeBusPin : inactiveBusPin
  const color = "white"

  return (
    <Marker
      icon={icon}
      position={position}
      onClick={onClick}
      label={{
        fontSize: "10px",
        text: carId,
        fontWeight: "900",
        color: color,
      }}
    />
  )
}

export default CarPin

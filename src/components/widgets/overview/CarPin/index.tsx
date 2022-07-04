import { ControlOutlined, PieChartOutlined } from "@ant-design/icons"
import { Marker } from "@react-google-maps/api"
import { Button, Col, Modal, Row, Space, Typography } from "antd"
import React from "react"
import { useNavigate } from "react-router-dom"
import activeBusPin from "../../../../assets/bus_pin_active.svg"
import inactiveBusPin from "../../../../assets/bus_pin_inactive.svg"
import useCar from "../../../../hooks/useCar"
import { CarPosition, CarStatus } from "../../../../interfaces/Car"
import { routes } from "../../../../routes/constant"

interface Props {
  position: CarPosition
  carId: string
  status: CarStatus
}

const CarPin: React.FC<Props> = ({ position, carId, status }) => {
  const navigate = useNavigate()
  const { car } = useCar(carId)

  function onClick() {
    const modal = Modal.info({
      title: "Car information",
      content: (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Typography.Text>Vehicle ID: {car?.id}</Typography.Text>
          <Typography.Text>License Plate: {car?.licensePlate}</Typography.Text>
          <Typography.Text>Passengers: {car?.passengers}</Typography.Text>
          <Typography.Text>
            Status: {status != null ? status : CarStatus.INACTIVE}
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
  const isActive = status === CarStatus.ACTIVE
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

import { ControlOutlined, PieChartOutlined } from "@ant-design/icons"
import { Marker } from "@react-google-maps/api"
import { Button, Col, Modal, Row, Space, Typography } from "antd"
import React from "react"
import { useNavigate } from "react-router-dom"
import busPin from "../../../../assets/bus_pin.png"
import useCar from "../../../../hooks/useCar"
import { CarPosition } from "../../../../interfaces/Car"
import { routes } from "../../../../routes/constant"

interface Props {
  position: CarPosition
  carId: string
}

const CarPin: React.FC<Props> = ({ position, carId }) => {
  const navigate = useNavigate()
  const { car } = useCar(carId)
  function onClick() {
    const modal = Modal.info({
      title: "Car information",
      content: (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Typography.Text>Passengers: {car?.passengers}</Typography.Text>
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
  return <Marker icon={busPin} position={position} onClick={onClick} />
}

export default CarPin

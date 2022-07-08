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
  /*
  const [previousPostion, setPreviousPosition] = useState<CarPosition>(position)
  const temp = new Array<CarPosition>(20)
  for (let i = 0; i < 20; i++) {
    temp[i] = position
  }
  const [showingPosition, setShowingPosition] = useState<CarPosition[]>(temp)
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    const stepLat = (position.lat - previousPostion.lat) / 20
    const stepLng = (position.lng - previousPostion.lng) / 20
    if (stepLat !== 0 && stepLng !== 0) {
      const temp = showingPosition
      temp[0] = previousPostion
      for (let i = 1; i < 20; i++) {
        temp[i] = {
          lat: temp[i - 1].lat + stepLat,
          lng: temp[i - 1].lng + stepLng,
        }
      }
      setIndex(0)
      setShowingPosition(temp)
      setPreviousPosition(position)
    }
  }, [position])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (index < 20) setIndex(index + 1)
    }, 10)

    return () => clearInterval(intervalId)
  }, [])
  */
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
    <Marker icon={icon} position={position} onClick={onClick} animation={2} />
  )
}

export default CarPin

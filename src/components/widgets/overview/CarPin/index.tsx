import { ControlOutlined, PieChartOutlined } from "@ant-design/icons"
import { Marker, OverlayView } from "@react-google-maps/api"
import { Button, Col, Modal, Row, Space, Tooltip, Typography } from "antd"
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
  showVehicleID: boolean
  hideVehicleID: boolean
}

const CarPin: React.FC<Props> = ({
  position,
  carId,
  showVehicleID,
  hideVehicleID,
}) => {
  const navigate = useNavigate()
  const { car } = useCarInformation(carId)
  const [overlayVisible, setOverlayVisible] = useState<boolean>(true)
  const [isDblClick, setIsDblClick] = useState<boolean>(false)

  useEffect(() => {
    if (showVehicleID) setOverlayVisible(true)
  }, [showVehicleID])
  useEffect(() => {
    if (hideVehicleID) setOverlayVisible(false)
  }, [hideVehicleID])

  //Easing moving car pin
  /*
  const [index, SetIndex] = useState<number>(-1)
  const [positionTransition, setPositionTransition] = useState<CarPosition>()
  const [currentPosition, setCurrentPosition] = useState<CarPosition>()

  useEffect(() => {
    SetIndex(0)
    setCurrentPosition(position)
    setPositionTransition(() => {
      if (currentPosition == null) return { lat: 0, lng: 0 }
      return {
        lat: position.lat - currentPosition?.lat,
        lng: position.lng - currentPosition?.lng,
      }
    })
  }, [position])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index < 30 && positionTransition != null && currentPosition != null) {
        SetIndex(index + 1)
        setCurrentPosition((prevPosition) => {
          console.log(prevPosition)
          return {
            lat: prevPosition?.lat! + positionTransition.lat,
            lng: prevPosition?.lng! + positionTransition.lng,
          }
        })
      }
    }, 20)
    return () => clearTimeout(timer)
  }, [index])
  */

  function showIDOverlay() {
    setTimeout(() => {
      if (!isDblClick) setOverlayVisible(!overlayVisible)
    }, 100)
  }
  function showModal() {
    setIsDblClick(true)
    setOverlayVisible(!overlayVisible)
    setTimeout(() => {
      setIsDblClick(false)
    }, 150)
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
  const zIndex = isActive ? 1 : 0

  return (
    <div>
      <Marker
        icon={icon}
        position={position}
        onClick={showIDOverlay}
        onDblClick={showModal}
        zIndex={zIndex}
      />
      {overlayVisible && (
        <OverlayView
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          position={position}
        >
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "3px",
              transform: "translate(-50%, -275%)",
              zIndex: zIndex,
            }}
          >
            {car?.id}
          </div>
        </OverlayView>
      )}
    </div>
  )
}

export default CarPin

import { ControlOutlined, PieChartOutlined } from "@ant-design/icons"
import { Marker, OverlayView } from "@react-google-maps/api"
import { Button, Col, Modal, Row, Space, Typography } from "antd"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import activeBusPin from "../../../../assets/bus_pin_active.svg"
import inactiveBusPin from "../../../../assets/bus_pin_inactive.svg"
import currentBusPin from "../../../../assets/bus_pin_current.svg"
import { CarStatus } from "../../../../interfaces/Car"
import { CarOverviewInformation } from "../../../../interfaces/Overview"
import { routes } from "../../../../routes/constant"

interface Props {
  information: CarOverviewInformation
  showVehicleID: boolean
  hideVehicleID: boolean
  currentID?: string
  showActionInModal?: boolean
  showPassengersInCarPin?: boolean
}

const CarPin: React.FC<Props> = ({
  information,
  showVehicleID,
  hideVehicleID,
  currentID,
  showActionInModal = true,
  showPassengersInCarPin = false,
}) => {
  const navigate = useNavigate()
  const [overlayVisible, setOverlayVisible] = useState<boolean>(true)
  const [isDblClick, setIsDblClick] = useState<boolean>(false)

  const { id, status, lat, lng, passengers, licensePlate } = information
  const position = {
    lng: lat != null ? lat : 0,
    lat: lng != null ? lng : 0,
  }

  const isActive = status === CarStatus.ACTIVE
  const isCurrent = currentID === information.id

  let icon = isActive ? activeBusPin : inactiveBusPin
  icon = isCurrent ? currentBusPin : icon

  let zIndex = isActive ? 1 : 0
  zIndex = isCurrent ? 2 : zIndex

  let color = isActive ? "#ed1170" : "black"
  color = isCurrent ? "#5677fc" : color

  useEffect(() => {
    if (showVehicleID) setOverlayVisible(true)
  }, [showVehicleID])
  useEffect(() => {
    if (hideVehicleID) setOverlayVisible(false)
  }, [hideVehicleID])

  useEffect(() => {
    if (isActive) setOverlayVisible(true)
    else setOverlayVisible(false)
  }, [status])

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
          <Typography.Text>Vehicle ID: {id}</Typography.Text>
          <Typography.Text>License Plate: {licensePlate}</Typography.Text>
          <Typography.Text>Passengers: {passengers}</Typography.Text>
          <Typography.Text>
            Status: {status != null ? status : CarStatus.INACTIVE}
          </Typography.Text>
          <Typography.Text type="secondary">
            Last updated: {current.toLocaleTimeString()}
          </Typography.Text>
          {showActionInModal && (
            <Row gutter={12}>
              <Col span={12}>
                <Button
                  block
                  icon={<PieChartOutlined />}
                  onClick={() => {
                    navigate(`${routes.DASHBOARD_CAR}/${id}`)
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
                    navigate(`${routes.ENTITY_CAR}?id=${id}`)
                    modal.destroy()
                  }}
                >
                  Manage
                </Button>
              </Col>
            </Row>
          )}
        </Space>
      ),
      centered: true,
      icon: false,
    })
  }

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
        <div style={{ zIndex: zIndex }}>
          <OverlayView
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            position={position}
          >
            <div
              style={{
                backgroundColor: color,
                color: "white",
                paddingInline: "3px",
                transform: "translate(-50%, -275%)",
              }}
            >
              {id}
              {showPassengersInCarPin ? ", " + passengers : ""}
            </div>
          </OverlayView>
        </div>
      )}
    </div>
  )
}

export default CarPin

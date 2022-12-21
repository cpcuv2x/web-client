import { ControlOutlined, PieChartOutlined } from "@ant-design/icons"
import { Marker, OverlayView } from "@react-google-maps/api"
import { Button, Col, Modal, Row, Space, Typography } from "antd"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import accidentPin from "../../../../assets/accident_pin.svg"
import { CarStatus } from "../../../../interfaces/Car"
import { CarOverviewInformation } from "../../../../interfaces/Overview"
import { routes } from "../../../../routes/constant"
import { AccidentInformation } from "../../../../interfaces/Accident"

interface Props {
  information: AccidentInformation
}

const AccidentPin: React.FC<Props> = ({ information }) => {
  const navigate = useNavigate()
  const [overlayVisible, setOverlayVisible] = useState<boolean>(true)
  const [isDblClick, setIsDblClick] = useState<boolean>(false)

  const { carId, driverId, id, lat, long, timestamp } = information
  const position = {
    lng: long != null ? long : 0,
    lat: lat != null ? lat : 0,
  }

  const timestampToDate = (timestamp: string) => {
    const date = new Date(parseInt(timestamp))
    return date.toLocaleString()
  }

  // const isActive = status === CarStatus.ACTIVE
  // const isCurrent = currentID === information.id

  let icon = accidentPin
  icon = accidentPin

  let zIndex = 1
  zIndex = 2

  let color = "#ed1170"
  color = "#fc320e"

  // useEffect(() => {
  //   if (isActive) setOverlayVisible(true)
  //   else setOverlayVisible(false)
  // }, [status])

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
      title: "Accident information",
      content: (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Typography.Text>Vehicle ID: {carId}</Typography.Text>
          <Typography.Text>Driver ID: {driverId}</Typography.Text>
          <Typography.Text>Time: {timestampToDate(timestamp)}</Typography.Text>
          <Typography.Text>
            Location: {lat}, {long}
          </Typography.Text>
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
                transform: "translate(-50%, -200%)",
                wordWrap: "break-word",
                textAlign: "center",
              }}
            >
              {/* {isCurrent && <div>YOU'RE HERE</div>} */}
              {/* {id} */}
              {/* {showPassengersInCarPin ? " (" + passengers + ")" : ""} */}
            </div>
          </OverlayView>
        </div>
      )}
    </div>
  )
}

export default AccidentPin

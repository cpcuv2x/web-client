import { Col, Row, Typography } from "antd"
import React from "react"
import ReactPlayer from "react-player"
import useCar from "../../../hooks/useCar"
import { CameraRole } from "../../../interfaces/Camera"
import WidgetCard from "../WidgetCard"

interface Props {
  carId: string
}

interface Stream {
  id: string
  label: string
  url: string
}

const CameraStreams: React.FC<Props> = ({ carId }) => {
  const { car } = useCar(carId)

  const cameraRoleIdMap = new Map<CameraRole, string>()

  car?.Camera.forEach((camera) => {
    cameraRoleIdMap.set(camera.role, camera.id)
  })

  const getCameraURL = (role: CameraRole) => {
    const cameraId = cameraRoleIdMap.get(role)
    if (cameraId) {
      return `/api/live/${cameraId}.m3u8`
    }
    return ""
  }

  const streams: Stream[] = [
    {
      id: "stream-1",
      label: "Driver Seat",
      url: getCameraURL(CameraRole.DRIVER),
    },
    {
      id: "stream-2",
      label: "Door",
      url: getCameraURL(CameraRole.DOOR),
    },
    {
      id: "stream-3",
      label: "Passengers Seat(Front side)",
      url: getCameraURL(CameraRole.SEATS_FRONT),
    },
    {
      id: "stream-4",
      label: "Passengers Seat(Back side)",
      url: getCameraURL(CameraRole.SEATS_BACK),
    },
  ]
  return (
    <WidgetCard
      title={"Camera Stream(s)"}
      helpText={"Video stream from each camera inside the car."}
      content={
        <Row gutter={[16, 24]}>
          {streams.map(({ id, label, url }: Stream) => (
            <Col key={id} span={12}>
              <Typography.Title level={5}>{label}</Typography.Title>
              <ReactPlayer url={url} muted width={"100%"} playing={true} loop />
            </Col>
          ))}
        </Row>
      }
    />
  )
}

export default CameraStreams

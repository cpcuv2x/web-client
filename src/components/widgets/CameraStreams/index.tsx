import React from "react"
import WidgetCard from "../WidgetCard"
import { Row, Col, Typography } from "antd"
import ReactPlayer from "react-player"
// mock videos
import frontPassenger from "../../../mocks/videos/front.webm"
import backPassenger from "../../../mocks/videos/back.mp4"
import door from "../../../mocks/videos/door.mp4"
import driver from "../../../mocks/videos/driver.mp4"

interface Props {
  carId: string
}

interface Stream {
  id: string
  label: string
  url: string
}

const CameraStreams: React.FC<Props> = ({ carId }) => {
  const streams: Stream[] = [
    {
      id: "stream-1",
      label: "Driver Seat",
      url: driver,
    },
    {
      id: "stream-2",
      label: "Door",
      url: door,
    },
    {
      id: "stream-3",
      label: "Passengers Seat(Front side)",
      url: frontPassenger,
    },
    {
      id: "stream-4",
      label: "Passengers Seat(Back side)",
      url: backPassenger,
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

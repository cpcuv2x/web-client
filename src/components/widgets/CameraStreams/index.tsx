import React from "react"
import WidgetCard from "../WidgetCard"
import { Row, Col } from "antd"
import ReactPlayer from "react-player"

interface Props {
  carId: string
}

interface Stream {
  id: string
  url: string
}

const CameraStreams: React.FC<Props> = ({ carId }) => {
  const streams: Stream[] = [
    {
      id: "stream-1",
      url: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
    },
    {
      id: "stream-2",
      url: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
    },
    {
      id: "stream-3",
      url: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
    },
    {
      id: "stream-4",
      url: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
    },
  ]
  return (
    <WidgetCard
      title={"Camera Stream(s)"}
      helpText={"Video stream from each camera inside the car."}
      content={
        <Row gutter={[16, 16]}>
          {streams.map(({ id, url }: Stream) => (
            <Col key={id} span={12}>
              <ReactPlayer
                url={url}
                muted
                width={"100%"}
                playing={true}
                controls={true}
              />
            </Col>
          ))}
        </Row>
      }
    />
  )
}

export default CameraStreams

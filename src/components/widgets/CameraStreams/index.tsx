import { Col, Empty, Row, Typography } from "antd"
import React, { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import { cameraPositionLabel } from "../../../constants/Camera"
import useCar from "../../../hooks/useCar"
import { CameraRole } from "../../../interfaces/Camera"
import axiosClient from "../../../utils/axiosClient"
import WidgetCard from "../WidgetCard"

interface Props {
  carId: string
}

interface Stream {
  id: string
  label: string
  url: string
  isAvailable: boolean
}

const CameraStreams: React.FC<Props> = ({ carId }) => {
  const { car } = useCar(carId)
  const [streams, setStreams] = useState<Stream[]>([])

  useEffect(() => {
    const init = async () => {
      if (car) {
        const cameraRoleIdMap = new Map<CameraRole, string>()
        car?.Camera.forEach((camera) => {
          cameraRoleIdMap.set(camera.role, camera.id)
        })

        setStreams(
          await Promise.all(
            [
              CameraRole.DRIVER,
              CameraRole.DOOR,
              CameraRole.SEATS_FRONT,
              CameraRole.SEATS_BACK,
            ].map(async (role) => {
              const cameraId = cameraRoleIdMap.get(role)
              const stream = {
                id: role,
                label: cameraPositionLabel[role],
                url: "",
                isAvailable: false,
              }
              if (!cameraId) {
                return stream
              }
              const url = `/api/live/${cameraId}.m3u8`
              stream.url = url
              if(!stream.isAvailable) {
                try {
                  setInterval(() =>{
                    axiosClient.get(url)
                  }, 3000)
                  stream.isAvailable = true
                } catch (error) {
                  stream.isAvailable = false
                }
              }
              return stream
            })
          )
        )
      }
    }

    init()
  }, [carId])

  return (
    <WidgetCard
      title={"Camera Stream(s)"}
      helpText={"Video stream from each camera inside the car."}
      content={
        <Row gutter={[16, 24]}>
          {streams.map(({ id, label, url, isAvailable }: Stream) =>
            isAvailable ? (
              <Col key={id} span={12}>
                <Typography.Title level={5}>{label}</Typography.Title>
                <ReactPlayer url={url} muted width={"100%"} playing={true} />
              </Col>
            ) : (
              <Col key={id} span={12}>
                <Typography.Title level={5}>{label}</Typography.Title>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  style={{
                    height: 360,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                />
              </Col>
            )
          )}
        </Row>
      }
    />
  )
}

export default CameraStreams

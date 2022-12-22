import { Col, Empty, Row, Typography } from "antd"
import React, { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import { cameraPositionLabel } from "../../../constants/Camera"
import useCar from "../../../hooks/useCar"
import { CameraRole } from "../../../interfaces/Camera"
import axiosClient from "../../../utils/axiosClient"
import WidgetCard from "../WidgetCard"
// import retry from "retry"
// import rax from "retry-axios"

interface Props {
  carId: string
  fullSize?: boolean
}

interface Stream {
  id: string
  label: string
  url: string
  isAvailable: boolean
}

const CameraStreams: React.FC<Props> = ({ carId, fullSize }) => {
  const { car } = useCar(carId)
  const [streams, setStreams] = useState<Stream[]>([])
  const [cameraKeys, setCameraKeys] = useState(0)
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

              try {
                await axiosClient.get(url)
                stream.isAvailable = true
              } catch (error) {
                stream.isAvailable = false
              }

              return stream
            })
          )
        )
      }
    }

    init()
  }, [carId])

  useEffect(() => {
    //set stream.isAvailable to true if stream is available
    // const operation = retry.operation()
    const checkHLSActive = async (url: string) => {
      let res = await axiosClient
        .head(url)
        .then((response) => {
          console.log("works: ", url, /2\d\d/.test("" + response.status))
          setCameraKeys(1)
        })
        .catch((err) => {
          console.log("err", url, err)
          setCameraKeys(0)
        })
    }
    const checkCameraConnection = async () => {
      if (car) {
        const cameraRoleIdMap = new Map<CameraRole, string>()
        car?.Camera.forEach((camera) => {
          cameraRoleIdMap.set(camera.role, camera.id)
        })
        console.log(streams)

        //set isAvailable in each stream to true
        streams.map((stream: Stream) => {
          setInterval(() => {
            if (stream.isAvailable) {
              checkHLSActive(stream.url).catch((err) => {
                console.log("err", err)
                stream.isAvailable = false
              })
            } else {
              try {
                axiosClient.get(stream.url)
                console.log(`${stream.url} is connected`)
                stream.isAvailable = true
              } catch (err) {
                console.log(`${stream.url} is not available`, err)
                stream.isAvailable = false
              }
            }
          }, 20000)
        })
      }
    }

    checkCameraConnection()
  }, [streams])

  return (
    <WidgetCard
      title={carId}
      helpText={"Video stream from each camera inside the car."}
      content={
        <Row gutter={[16, 24]}>
          {streams.map(({ id, label, url, isAvailable }: Stream) =>
            isAvailable ? (
              <Col key={id} span={fullSize ? 24 : 12}>
                <Typography.Title level={5}>{label}</Typography.Title>
                <ReactPlayer
                  key={cameraKeys}
                  url={url}
                  muted
                  width={"100%"}
                  playing={true}
                />
              </Col>
            ) : (
              <Col key={id} span={fullSize ? 24 : 12}>
                <Typography.Title level={5}>{label}</Typography.Title>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  style={{
                    height: fullSize ? "10vh" : 250,
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

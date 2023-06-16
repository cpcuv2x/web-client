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
  fullSize?: boolean
}

interface Stream {
  id: string
  label: string
  url: string
  isAvailable: boolean
  playerRef: React.RefObject<ReactPlayer>
  lastSuccessfulConnect: number
}

const CameraStreams: React.FC<Props> = ({ carId, fullSize }) => {
  const { car } = useCar(carId)
  const [players, setPlayers] = useState<(ReactPlayer | null)[]>([])
  const [, forceRender] = useState({})
  const [key, setKey] = useState(false)
  const [streams, setStreams] = useState<Stream[]>([
    {
      id: CameraRole.DRIVER,
      label: cameraPositionLabel[CameraRole.DRIVER],
      url: "",
      isAvailable: false,
      playerRef: React.createRef<ReactPlayer>(),
      lastSuccessfulConnect: Date.now(),
    },
    {
      id: CameraRole.DOOR,
      label: cameraPositionLabel[CameraRole.DOOR],
      url: "",
      isAvailable: false,

      playerRef: React.createRef<ReactPlayer>(),
      lastSuccessfulConnect: Date.now(),
    },
    {
      id: CameraRole.SEATS_FRONT,
      label: cameraPositionLabel[CameraRole.SEATS_FRONT],
      url: "",
      isAvailable: false,
      playerRef: React.createRef<ReactPlayer>(),
      lastSuccessfulConnect: Date.now(),
    },
    {
      id: CameraRole.SEATS_BACK,
      label: cameraPositionLabel[CameraRole.SEATS_BACK],
      url: "",
      isAvailable: false,
      playerRef: React.createRef<ReactPlayer>(),
      lastSuccessfulConnect: Date.now(),
    },
  ])

  const getUrl = (role: string) => {
    //find id from car.camera if match return url
    const camera = car?.Camera.find((camera) => camera.role === role)
    if (!camera) {
      return ""
    }
    return `/api/live/${camera.id}.m3u8`
  }

  useEffect(() => {
    // console.log("camera set")
    setStreams((streams) => {
      // console.log("streams", streams)
      return streams.map((stream) => {
        return {
          ...stream,
          url: getUrl(stream.id),
        }
      })
    })

    streams.forEach(async (stream: Stream) => {
      try {
        // console.log("init")
        await axiosClient.get(stream.url)
        stream.isAvailable = true
        stream.lastSuccessfulConnect = Date.now()
      } catch (error) {
        stream.isAvailable = false
      }
    })
  }, [car])

  useEffect(() => {
    const intervalId = setInterval(() => {
      streams.forEach((stream) => {
        console.log("stream status: ", stream.id, stream.isAvailable)
      })
      checkCameraConnection()
    }, 3000)

    return () => {
      clearInterval(intervalId)
    }
  }, [streams])

  const checkCameraConnection = async () => {
    const availableStreams: string[] = []

    const promises = streams.map(async (stream: Stream) => {
      try {
        const response = await axiosClient.get(stream.url)

        if (response.status >= 200 && response.status < 300) {
          availableStreams.push(stream.url)
        }
      } catch (error) {
        // console.log("error", error);
      }
    })

    await Promise.all(promises)

    setStreams(
      streams.map((checkStream: Stream) => {
        // console.log(availableStreams, checkStream.url, availableStreams.includes(checkStream.url));
        if (availableStreams.includes(checkStream.url)) {
          return {
            ...checkStream,
            isAvailable: true,
            // lastSuccessfulConnect: Date.now()
          }
        }
        return {
          ...checkStream,
          isAvailable: false,
        }
      })
    )
    // console.log("complete");
  }

  // const setStreamUnavailable = (stream: Stream) => {
  //   setStreams(
  //     streams.map((checkStream: Stream) => {
  //       if (checkStream.url == stream.url){
  //         return {
  //           ...checkStream,
  //           isAvailable: false,
  //         }
  //       }
  //       return checkStream
  //     })
  //   )
  // }

  return (
    <>
      <WidgetCard
        title={carId}
        helpText={"Video stream from each camera inside the car."}
        padding={0}
        content={
          <Row gutter={[16, 12]}>
            {streams.map(
              ({
                id,
                label,
                url,
                isAvailable,
                playerRef,
                lastSuccessfulConnect,
              }: Stream) =>
                isAvailable ? (
                  <>
                    <Col
                      span={fullSize ? 6 : 12}
                      style={{ width: "100%", height: "100%" }}
                    >
                      <Typography.Title
                        level={5}
                        type="secondary"
                        style={{ marginLeft: "1rem" }}
                      >
                        {label}
                      </Typography.Title>
                      <ReactPlayer
                        // key={lastSuccessfulConnect}
                        // ref={playerRef}
                        url={url}
                        muted
                        width={"100%"}
                        height={"100%"}
                        playing={true}
                      />
                    </Col>
                  </>
                ) : (
                  <Col span={fullSize ? 6 : 12}>
                    <Typography.Title
                      type="secondary"
                      level={5}
                      style={{ marginLeft: "1rem" }}
                    >
                      {label}
                    </Typography.Title>
                    <Empty
                      className=""
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description="Sit tight, and we'll be right back!"
                      style={{
                        width: "100%",
                        // aspectRatio: "4/3",
                        height: fullSize ? "15vh" : 250,
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
    </>
  )
}

export default CameraStreams

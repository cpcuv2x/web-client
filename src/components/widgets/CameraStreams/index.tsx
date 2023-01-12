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
  playerRef: React.RefObject<ReactPlayer>
  lastSuccessfulConnect: number
}

const CameraStreams: React.FC<Props> = ({ carId, fullSize }) => {
  const { car } = useCar(carId)
  const [players, setPlayers] = useState<(ReactPlayer | null)[]>([])
  const [streams, setStreams] = useState<Stream[]>([])
  const [intervalIds, setIntervalIds] = useState<NodeJS.Timer[]>([])
  // const [reconnectKey, setCameraKeys] = useState(0)
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
                player: null,
                playerRef: React.createRef<ReactPlayer>(),
                lastSuccessfulConnect: 0,
              }
              if (!cameraId) {
                return stream
              }
              const url = `/api/live/${cameraId}.m3u8`
              stream.url = url

              try {
                await axiosClient.get(url)
                stream.isAvailable = true
                stream.lastSuccessfulConnect = Date.now()
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
  }, [])

  useEffect(() => {
    console.log(streams)
  }, [streams])

  useEffect(() => {
    const checkHLSActive = async (
      player: ReactPlayer | null,
      stream: Stream
    ) => {
      // Fetch the stream and check the status code
      try {
        const response = await axiosClient.get(stream.url)
        stream.isAvailable = true
        if (response.status >= 200 && response.status < 300) {
          if (!stream.isAvailable && stream.playerRef.current) {
            stream.playerRef.current?.seekTo(1)
            // restart player
            // stream.isAvailable = true
          }
          console.log("connected: " + stream.isAvailable + " ID: " + stream.id)
          stream.lastSuccessfulConnect = Date.now()
          stream.isAvailable = true
        } else if (Date.now() - stream.lastSuccessfulConnect > 10000) {
          // setStreamUnavailable(stream)
          stream.isAvailable = false
        }
      } catch (error) {
        if (Date.now() - stream.lastSuccessfulConnect > 10000) {
          // setStreamUnavailable(stream)
          stream.isAvailable = false
        }
      }
    }

    const checkCameraConnection = async () => {
      if (car) {
        // const cameraRoleIdMap = new Map<CameraRole, string>()
        // car.Camera.forEach((camera) => {
        //   cameraRoleIdMap.set(camera.role, camera.id)
        // })
        // Check the availability of each stream
        streams.forEach((stream: Stream, id: number) => {
          const player = players[id]
          checkHLSActive(player, stream)
        })
      }
    }

    const setStreamUnavailable = (stream: Stream) => {
      setTimeout(() => {
        stream.isAvailable = false
      }, 10000)
    }

    // Use a single setInterval timer to check the availability of all streams
    const intervalId = setInterval(() => {
      checkCameraConnection()
    }, 5000)

    setIntervalIds([...intervalIds, intervalId])
  }, [players, streams])

  useEffect(() => {
    return () => {
      intervalIds.forEach((id) => clearInterval(id))
    }
  }, [intervalIds])

  return (
    <WidgetCard
      title={carId}
      helpText={"Video stream from each camera inside the car."}
      padding={0}
      content={
        <Row gutter={[16, 12]}>
          {streams.map(({ id, label, url, isAvailable, playerRef }: Stream) =>
            isAvailable ? (
              <Col
                // key={id}
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
                  // key={isAvailable ? undefined : id}
                  ref={playerRef}
                  url={url}
                  muted
                  width={"100%"}
                  height={"100%"}
                  playing={true}
                />
              </Col>
            ) : (
              <Col key={id} span={fullSize ? 6 : 12}>
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
  )
}

export default CameraStreams

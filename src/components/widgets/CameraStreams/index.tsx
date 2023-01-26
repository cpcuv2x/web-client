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
import axiosRetry from "axios-retry"
import axios from "axios"
import useSWR from "swr"

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
      url: `/api/live/C0005.m3u8`,
      isAvailable: true,
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
    console.log("camera set")
    setStreams((streams) => {
      console.log("streams", streams)
      return streams.map((stream) => {
        return {
          ...stream,
          url: getUrl(stream.id),
        }
      })
    })

    streams.forEach(async (stream) => {
      try {
        console.log("init")
        await axiosClient.get(stream.url)
        stream.isAvailable = true
        stream.lastSuccessfulConnect = Date.now()
      } catch (error) {
        stream.isAvailable = false
      }
    })
  }, [car])

  useEffect(() => {
    console.log("car from console: ", car)
  }, [car])

  useEffect(() => {
    console.log("streams from console: ", streams)
  }, [streams])

  useEffect(() => {
    //console for isavailable in each stream
    streams.forEach((stream) => {
      if (stream.isAvailable)
        console.log("stream status: ", stream.id, stream.isAvailable)
    })
  }, [streams])

  useEffect(() => {
    // const init = async () => {
    //   const cameraRoleIdMap = new Map<CameraRole, string>()
    //   car?.Camera.forEach((camera) => {
    //     cameraRoleIdMap.set(camera.role, camera.id)
    //   })

    // setStreams(
    //   await Promise.all(
    //     [
    //       CameraRole.DRIVER,
    //       CameraRole.DOOR,
    //       CameraRole.SEATS_FRONT,
    //       CameraRole.SEATS_BACK,
    //     ].map((role) => {
    //       const cameraId = cameraRoleIdMap.get(role)
    //       const stream = {
    //         id: role,
    //         label: cameraPositionLabel[role],
    //         url: "",
    //         isAvailable: false,
    //         player: null,
    //         playerRef: React.createRef<ReactPlayer>(),
    //         lastSuccessfulConnect: Date.now(),
    //       }
    //       if (!cameraId) {
    //         return stream
    //       }
    //       const url = `/api/live/${cameraId}.m3u8`
    //       stream.url = url

    //       // try {
    //       //   console.log("init")
    //       //   await axiosClient.get(url)
    //       //   stream.isAvailable = true
    //       //   stream.lastSuccessfulConnect = Date.now()
    //       // } catch (error) {
    //       //   stream.isAvailable = false
    //       // }

    //       return stream
    //     })
    //   )
    // )

    // init()

    const intervalId = setInterval(() => {
      if (!streams) {
        // init()
      }
      checkCameraConnection()
      console.log("interval called")
    }, 3000)

    return () => {
      clearInterval(intervalId)
    }
  }, [streams])

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     checkCameraConnection()
  //     console.log("interval called")
  //   }, 2000)

  //   return () => {
  //     clearInterval(intervalId)
  //   }
  // }, [])

  const checkCameraConnection = async () => {
    console.log("camera checked")
    console.log(streams)
    streams.forEach(async (stream: Stream) => {
      try {
        console.log("camera checked2", stream.url)
        const response = await axiosClient.get(stream.url)
        console.log("camera checked3")

        //set isAvailable to true on that camera id
        setStreams(
          streams.map((stream) => {
            return {
              ...stream,
              isAvailable: true,
            }
          })
        )

        if (response.status >= 200 && response.status < 300) {
          // stream.isAvailable = true
          console.log("connected: " + stream.isAvailable + " ID: " + stream.id)
          stream.lastSuccessfulConnect = Date.now()
        } else {
          setStreamUnavailable(stream)
        }
      } catch (error) {
        setStreamUnavailable(stream)
        console.log(error)
      }
    })
  }

  const setStreamUnavailable = (stream: Stream) => {
    setTimeout(() => {
      stream.isAvailable = false
    }, 10000)
  }

  const setStreamAvailable = (stream: Stream) => {
    setTimeout(() => {
      stream.isAvailable = true
      console.log("set!")
    }, 5000)
  }

  // Use a single setInterval timer to check the availability of all streams

  // useEffect(() => {
  //   const checkCameraConnection = async () => {
  //     const checkHLSActive = async (
  //       // player: ReactPlayer | null,
  //       stream: Stream
  //     ) => {
  //       // Fetch the stream and check the status code
  //       try {
  //         const response = await axiosClient.get(stream.url)

  //         if (response.status >= 200 && response.status < 300) {
  //           stream.isAvailable = true
  //           console.log(
  //             "connected: " + stream.isAvailable + " ID: " + stream.id
  //           )
  //           stream.lastSuccessfulConnect = Date.now()
  //         } else {
  //           setStreamUnavailable(stream)
  //         }
  //       } catch (error) {
  //         setStreamUnavailable(stream)

  //         console.log(error)
  //       }
  //     }

  //     streams.forEach((stream: Stream) => {
  //       // const player = players[id]
  //       checkHLSActive(stream)
  //     })
  //   }

  //   const intervalId = setInterval(() => {
  //     checkCameraConnection()
  //   }, 3000)

  //   return () => {
  //     clearInterval(intervalId)
  //   }
  // }, [])

  // useEffect(() => {
  //   return () => {
  //     intervalIds.forEach((id) => clearInterval(id))
  //   }
  // }, [intervalIds])

  return (
    <>
      {streams.map((stream: Stream) => {
        return stream.id + " " + stream.isAvailable + " | "
      })}
      <button onClick={() => setKey(!key)}>Delete</button>
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
                      <button
                        onClick={() => {
                          setStreams(
                            streams
                              .filter((stream) => stream.id)
                              .map((stream) => {
                                return {
                                  ...stream,
                                  isAvailable: !isAvailable,
                                }
                              })
                          )
                          console.log("Available: ", isAvailable)
                        }}
                      >
                        Aasdasd
                      </button>
                      <Typography.Title
                        level={5}
                        type="secondary"
                        style={{ marginLeft: "1rem" }}
                      >
                        {label}
                      </Typography.Title>
                      <ReactPlayer
                        key={lastSuccessfulConnect}
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
                    <button
                      onClick={() => {
                        const stream: Stream | undefined = streams.find(
                          (stream) => stream.id === id
                        )
                        if (stream) {
                          const updatedStream = {
                            ...stream,
                            isAvailable: !isAvailable,
                          }

                          const updatedStreams = streams.map((stream) =>
                            stream.id === id ? updatedStream : stream
                          )
                          setStreams(updatedStreams)
                        }
                      }}
                    >
                      Aasdasd
                    </button>
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

import { useEffect, useRef, useState } from "react"
import { Socket } from "socket.io-client"
import { Driver } from "../../interfaces/Driver"
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketEventType,
} from "../../interfaces/socket"
import useSocket from "./useSocket"

const useDriverInformation = (driverId: string) => {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>(
    useSocket()
  )
  const socketIdRef = useRef("")
  const [driver, setDriver] = useState<Driver>()

  useEffect(() => {
    const { current: socket } = socketRef
    socket.emit(
      SocketEventType.StartStreamDriverInformation,
      driverId,
      (sId: string) => {
        socketIdRef.current = sId
        socket.on(sId, (res: Driver) => {
          // FIXME: remove console
          console.log(SocketEventType.StartStreamDriverInformation, res)
          setDriver(res)
        })
      }
    )

    return () => {
      socketRef.current?.emit(SocketEventType.StopStream, socketIdRef.current)
    }
  }, [driverId])

  return driver
}

export default useDriverInformation

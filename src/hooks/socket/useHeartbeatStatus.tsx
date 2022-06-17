import { useEffect, useRef, useState } from "react"
import { Socket } from "socket.io-client"
import { Car } from "../../interfaces/Car"
import { HeartbeatStatus } from "../../interfaces/HeartbeatStatus"
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketEventType,
} from "../../interfaces/socket"
import useSocket from "./useSocket"

const useHeartbeatStatus = () => {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>(
    useSocket()
  )
  const socketIdRef = useRef("")
  const [heartbeatOfACar, setHeartbeatOfACar] = useState<HeartbeatStatus[]>()

  useEffect(() => {
    const { current: socket } = socketRef
    socket.emit(
      SocketEventType.StartStreamHeartbeatsStatus,
      (sId: string) => {
        socketIdRef.current = sId
        socket.on(sId, (res: HeartbeatStatus[]) => {
          // FIXME: remove console
          console.log(SocketEventType.StartStreamHeartbeatsStatus, res)
          setHeartbeatOfACar(res)
        })
      }
    )

    return () => {
      socketRef.current?.emit(SocketEventType.StopStream, socketIdRef.current)
    }
  }, [])

  return heartbeatOfACar
}

export default useHeartbeatStatus

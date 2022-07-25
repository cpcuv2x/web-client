import { useEffect, useRef, useState } from "react"
import { Socket } from "socket.io-client"
import { HeartbeatStatus } from "../../interfaces/HeartbeatStatus"
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketEventType,
} from "../../interfaces/socket"
import { Status } from "../../interfaces/Status"
import useSocket from "./useSocket"

const useHeartbeatStatus = () => {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>(
    useSocket()
  )
  const socketIdRef = useRef("")
  const [heartbeatOfACar, setHeartbeatOfACar] = useState<HeartbeatStatus[]>()

  useEffect(() => {
    const { current: socket } = socketRef
    socket.emit(SocketEventType.StartStreamHeartbeatsStatus, (sId: string) => {
      socketIdRef.current = sId
      socket.on(sId, (res: HeartbeatStatus[]) => {
        // FIXME: remove console
        setHeartbeatOfACar(() => {
          for (const x of res) {
            if (x.status === undefined) {
              x.status = Status.INVALID
            }
            const date = new Date().toISOString()

            const invlidDevice = {
              status: Status.INVALID,
            }

            while (x.Camera.length < 4) {
              x.Camera.push(invlidDevice)
            }

            while (x.Module.length < 2) {
              x.Module.push(invlidDevice)
            }
          }
          return res
        })
        console.log(SocketEventType.StartStreamHeartbeatsStatus, res)
      })
    })

    return () => {
      socketRef.current?.emit(SocketEventType.StopStream, socketIdRef.current)
    }
  }, [])

  return heartbeatOfACar
}

export default useHeartbeatStatus

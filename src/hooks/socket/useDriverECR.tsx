import { useEffect, useRef, useState } from "react"
import { Socket } from "socket.io-client"
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketEventType,
} from "../../interfaces/socket"
import useSocket from "./useSocket"

interface Ecr {
  ecr: number
  timestamp: string
}

interface EcrResponse {
  type: string
  kind: string
  carId: string
  driverId: string
  ecr: number
  lat: number
  lng: number
  timestamp: string
}

const useDriverECR = (driverId: string) => {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>(
    useSocket()
  )
  const socketIdRef = useRef("")
  const [ecr, setEcr] = useState<Ecr>()

  useEffect(() => {
    const { current: socket } = socketRef
    socket.emit(
      SocketEventType.StartStreamDriverECR,
      driverId,
      (sId: string) => {
        socketIdRef.current = sId
        socket.on(sId, (res: EcrResponse) => {
          // FIXME: remove console
          console.log(SocketEventType.StartStreamDriverECR, res)
          setEcr({
            ecr: res.ecr,
            timestamp: res.timestamp,
          })
        })
      }
    )

    return () => {
      socketRef.current?.emit(SocketEventType.StopStream, socketIdRef.current)
    }
  }, [driverId])

  return ecr
}

export default useDriverECR

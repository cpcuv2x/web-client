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
  ecrThreshold: number
  timestamp: string
}

interface EcrResponse {
  type: string
  kind: string
  carId: string
  driverId: string
  ecr: number
  ecrThreshold: number
  lat: number
  lng: number
  timestamp: string
}

const useDriverECR = (driverId: string) => {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>(
    useSocket()
  )
  const socketIdRef = useRef("")
  const [ecrData, setEcrData] = useState<Ecr>()

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
          setEcrData({
            ecr: res.ecr,
            ecrThreshold: res.ecrThreshold,
            timestamp: res.timestamp,
          })
        })
      }
    )

    return () => {
      socketRef.current?.emit(SocketEventType.StopStream, socketIdRef.current)
    }
  }, [driverId])

  return ecrData
}

export default useDriverECR

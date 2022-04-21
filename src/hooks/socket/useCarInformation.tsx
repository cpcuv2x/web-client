import { useEffect, useRef, useState } from "react"
import { Socket } from "socket.io-client"
import { Car } from "../../interfaces/Car"
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketEventType,
} from "../../interfaces/socket"
import useSocket from "./useSocket"

const useCarInformation = (carId: string) => {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>(
    useSocket()
  )
  const socketIdRef = useRef("")
  const [car, setCar] = useState<Car>()

  useEffect(() => {
    const { current: socket } = socketRef
    socket.emit(
      SocketEventType.StartStreamCarInformation,
      carId,
      (sId: string) => {
        socketIdRef.current = sId
        socket.on(sId, (res: Car) => {
          // FIXME: remove console
          console.log(SocketEventType.StartStreamCarInformation, res)
          setCar(res)
        })
      }
    )

    return () => {
      socketRef.current?.emit(SocketEventType.StopStream, socketIdRef.current)
    }
  }, [carId])

  return car
}

export default useCarInformation

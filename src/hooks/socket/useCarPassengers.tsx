import { useEffect, useRef, useState } from "react"
import { Socket } from "socket.io-client"
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketEventType,
} from "../../interfaces/socket"
import useSocket from "./useSocket"

interface CarPassengersResponse {
  type: string
  kind: string
  carId: string
  passengers: number
  lat: number
  lng: number
  timestamp: string
}

const useCarPassengers = (carId: string) => {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>(
    useSocket()
  )
  const socketIdRef = useRef("")
  const [passenger, setPassenger] = useState<CarPassengersResponse>()

  useEffect(() => {
    const { current: socket } = socketRef
    socket.emit(
      SocketEventType.StartStreamCarPassengers,
      carId,
      (sId: string) => {
        socketIdRef.current = sId
        socket.on(sId, (res: CarPassengersResponse) => {
          // FIXME: remove console
          console.log(SocketEventType.StartStreamCarPassengers, res)
          setPassenger(res)
        })
      }
    )

    return () => {
      socketRef.current?.emit(SocketEventType.StopStream, socketIdRef.current)
    }
  }, [carId])

  return passenger
}

export default useCarPassengers

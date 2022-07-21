import { useEffect, useRef, useState } from "react"
import { Socket } from "socket.io-client"
import { CarStatus } from "../../interfaces/Car"
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketEventType,
} from "../../interfaces/socket"
import useSocket from "./useSocket"

interface Location {
  lat: number
  lng: number
  status: CarStatus
}

interface LocationEvent {
  type: string
  kind: string
  carId: string
  lat: number
  lng: number
  status: CarStatus
  timestamp: string
}

type CarsLocations = Record<string, Location>

const useCarsLocations = (carIds: string[]) => {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>(
    useSocket()
  )
  const socketIdRef = useRef("")
  const [locations, setLocations] = useState<CarsLocations>({})

  useEffect(() => {
    if (carIds.length) {
      const { current: socket } = socketRef
      socket.emit(SocketEventType.StartStreamMapCars, carIds, (sId: string) => {
        socketIdRef.current = sId
        socket.on(sId, ({ carId, ...other }: LocationEvent) => {
          //FIXME: swap lat and lng
          setLocations((prev) => ({
            ...prev,
            [carId]: other,
          }))
        })
      })
    }

    return () => {
      socketRef.current?.emit(SocketEventType.StopStream, socketIdRef.current)
    }
  }, [JSON.stringify(carIds)])

  return locations
}

export default useCarsLocations

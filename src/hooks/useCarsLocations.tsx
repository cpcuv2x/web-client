import { useEffect, useRef, useState } from "react"
import { Socket } from "socket.io-client"
import useSocket from "../contexts/socket/hooks/useSocket"
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketEventType,
} from "../interfaces/socket"

interface Location {
  lat: number
  lng: number
}

interface LocationEvent {
  type: string
  kind: string
  carId: string
  lat: number
  lng: number
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
        socket.on(sId, (location: LocationEvent) => {
          //FIXME: swap lat and lng
          const lat = location.lng
          const lng = location.lat
          setLocations((prev) => ({
            ...prev,
            [location.carId]: { lat, lng },
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

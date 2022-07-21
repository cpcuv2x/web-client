import { useEffect, useRef, useState } from "react"
import { Socket } from "socket.io-client"
import { Overview } from "../../interfaces/Overview"
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketEventType,
} from "../../interfaces/socket"
import useSocket from "./useSocket"

const emptyOverview: Overview = {
  activeTotalCars: {
    active: 0,
    total: 0,
  },
  activeTotalDrivers: {
    active: 0,
    total: 0,
  },
  cars: [],
  accidentCount: 0,
  totalPassengers: 0,
}

const useRealTimeOverview = () => {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>(
    useSocket()
  )
  const socketIdRef = useRef("")
  const [overview, setOverview] = useState<Overview>(emptyOverview)

  useEffect(() => {
    const { current: socket } = socketRef
    socket.emit(SocketEventType.StartStreamOverview, (sId: string) => {
      socketIdRef.current = sId
      socket.on(sId, (res: Overview) => {
        // FIXME: remove console
        console.log(SocketEventType.StartStreamOverview, res)
        setOverview(res)
      })
    })

    return () => {
      socketRef.current?.emit(SocketEventType.StopStream, socketIdRef.current)
    }
  }, [])

  return overview
}

export default useRealTimeOverview

import { useEffect, useRef, useState } from "react"
import { Socket } from "socket.io-client"
import { TotalPassenger } from "../../interfaces/Car"
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketEventType,
} from "../../interfaces/socket"
import useSocket from "./useSocket"

const useTotalPassengers = () => {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>(
    useSocket()
  )
  const socketIdRef = useRef("")
  const [total, setTotal] = useState<TotalPassenger>({
    totalPassengers: 0,
    eachCarPassengers: [],
  })

  useEffect(() => {
    const { current: socket } = socketRef
    socket.emit(SocketEventType.StartStreamTotalPassengers, (sId: string) => {
      socketIdRef.current = sId
      socket.on(sId, (res: TotalPassenger) => {
        // FIXME: remove console
        console.log(SocketEventType.StartStreamTotalPassengers, res)
        setTotal(res)
      })
    })

    return () => {
      socketRef.current?.emit(SocketEventType.StopStream, socketIdRef.current)
    }
  }, [])

  return total
}

export default useTotalPassengers

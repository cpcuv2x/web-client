import { useEffect, useRef, useState } from "react"
import { Socket } from "socket.io-client"
import useSocket from "../contexts/socket/hooks/useSocket"
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketEventType,
} from "../interfaces/socket"

interface ActiveCarsResponse {
  active: number
  total: number
}

const useActiveCars = () => {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>(
    useSocket()
  )
  const socketIdRef = useRef("")
  const [active, setActive] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const { current: socket } = socketRef
    socket.emit(SocketEventType.StartStreamActiveCars, (sId: string) => {
      socketIdRef.current = sId
      socket.on(sId, (res: ActiveCarsResponse) => {
        // FIXME: remove console
        console.log(SocketEventType.StartStreamActiveCars, res)
        setActive(res.active)
        setTotal(res.total)
      })
    })

    return () => {
      socketRef.current?.emit(SocketEventType.StopStream, socketIdRef.current)
    }
  }, [])

  return {
    active,
    total,
  }
}

export default useActiveCars

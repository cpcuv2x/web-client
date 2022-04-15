import { useEffect, useRef, useState } from "react"
import { Socket } from "socket.io-client"
import useSocket from "../../contexts/socket/hooks/useSocket"
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketEventType,
} from "../../interfaces/socket"

const useTotalAccidentCount = () => {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>(
    useSocket()
  )
  const socketIdRef = useRef("")
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const { current: socket } = socketRef
    socket.emit(
      SocketEventType.StartStreamTotalAccidentCount,
      (sId: string) => {
        socketIdRef.current = sId
        socket.on(sId, (res: number) => {
          // FIXME: remove console
          console.log(SocketEventType.StartStreamTotalAccidentCount, res)
          setTotal(res)
        })
      }
    )

    return () => {
      socketRef.current?.emit(SocketEventType.StopStream, socketIdRef.current)
    }
  }, [])

  return total
}

export default useTotalAccidentCount

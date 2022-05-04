import { useEffect, useRef, useState } from "react"
import { Socket } from "socket.io-client"
import { Notification } from "../../interfaces/Notification"
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketEventType,
} from "../../interfaces/socket"
import useSocket from "./useSocket"

const useRealTimeNotification = () => {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>(
    useSocket()
  )
  const socketIdRef = useRef("")
  const [notification, setNotification] = useState<Notification>()

  useEffect(() => {
    const { current: socket } = socketRef
    socket.emit(SocketEventType.StartStreamNotification, (sId: string) => {
      socketIdRef.current = sId
      socket.on(sId, (res: Notification) => {
        // FIXME: remove console
        console.log(SocketEventType.StartStreamNotification, res)
        setNotification(res)
      })
    })

    return () => {
      socketRef.current?.emit(SocketEventType.StopStream, socketIdRef.current)
    }
  }, [])

  return notification
}

export default useRealTimeNotification

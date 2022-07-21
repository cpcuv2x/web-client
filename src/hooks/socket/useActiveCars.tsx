import { useEffect, useRef, useState } from "react"
import { Socket } from "socket.io-client"
import useSWR from "swr"
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketEventType,
} from "../../interfaces/socket"
import useSocket from "./useSocket"

interface ActiveDriversResponse {
  active: number
  total: number
}

/*const useActiveCars = () => {
  const { data, mutate, error } = useSWR<ActiveDriversResponse>(
    `/api/cars/activeAndTotal`
  )

  const loading = !data && !error

  return {
    ...data,
    mutate,
    error,
    loading,
  }
}*/

const useActiveCars = () => {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>(
    useSocket()
  )
  const socketIdRef = useRef("")
  const [activeAndTotal, setActiveTotal] = useState<ActiveDriversResponse>({
    active: 0,
    total: 0,
  })

  useEffect(() => {
    const { current: socket } = socketRef
    socket.emit(SocketEventType.StartStreamActiveCars, (sId: string) => {
      socketIdRef.current = sId
      socket.on(sId, (res: ActiveDriversResponse) => {
        // FIXME: remove console
        console.log(SocketEventType.StartStreamActiveCars, res)
        setActiveTotal(res)
      })
    })

    return () => {
      socketRef.current?.emit(SocketEventType.StopStream, socketIdRef.current)
    }
  }, [])

  return activeAndTotal
}

export default useActiveCars

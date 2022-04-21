import { useContext } from "react"
import SocketContext from "../../contexts/socket/SocketContext"

const useSocket = () => {
  const socket = useContext(SocketContext)
  return socket
}

export default useSocket

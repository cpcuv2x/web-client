import { createContext } from "react"
import { io, Socket } from "socket.io-client"
import appConfig from "../../configuration"
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../interfaces/socket"

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io({
  path: appConfig.webSocketURL,
})
const SocketContext = createContext(socket)

export default SocketContext

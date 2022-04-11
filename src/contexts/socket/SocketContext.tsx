import { createContext } from "react"
import { io } from "socket.io-client"
import appConfig from "../../configuration"

export const socket = io(appConfig.webSocketURL)
const SocketContext = createContext(socket)

export default SocketContext

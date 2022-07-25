export type ServerToClientEvents = Record<string, (...args: any) => void>

export enum SocketEventType {
  StartStreamCarInformation = "START_STREAM_CAR_INFORMATION",
  StartStreamCarPassengers = "START_STREAM_CAR_PASSENGER",
  StartStreamDriverInformation = "START_STREAM_DRIVER_INFORMATION",
  StartStreamDriverECR = "START_STREAM_DRIVER_ECR",
  StartStreamNotification = "START_STREAM_NOTIFICATION",
  StartStreamHeartbeatsStatus = "START_STREAM_HEARTBEATSSTATUS",
  StartStreamOverview = "START_STREAM_OVERVIEW",
  StopStream = "STOP_STREAM",
}

export interface ClientToServerEvents {
  [SocketEventType.StartStreamCarInformation]: (
    carId: string,
    callback: (sId: string) => void
  ) => void
  [SocketEventType.StartStreamCarPassengers]: (
    carId: string,
    callback: (sId: string) => void
  ) => void
  [SocketEventType.StartStreamDriverInformation]: (
    driverId: string,
    callback: (sId: string) => void
  ) => void
  [SocketEventType.StartStreamDriverECR]: (
    driverId: string,
    callback: (sId: string) => void
  ) => void
  [SocketEventType.StartStreamNotification]: (
    callback: (sId: string) => void
  ) => void
  [SocketEventType.StartStreamHeartbeatsStatus]: (
    callback: (sId: string) => void
  ) => void
  [SocketEventType.StartStreamOverview]: (
    callback: (sId: string) => void
  ) => void
  [SocketEventType.StopStream]: (sId: string) => void
}

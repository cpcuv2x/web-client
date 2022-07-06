export type ServerToClientEvents = Record<string, (...args: any) => void>

export enum SocketEventType {
  StartStreamActiveCars = "START_STREAM_ACTIVE_CARS",
  StartStreamActiveDrivers = "START_STREAM_ACTIVE_DRIVERS",
  StartStreamTotalPassengers = "START_STREAM_TOTAL_PASSENGERS",
  StartStreamTotalAccidentCount = "START_STREAM_TOTAL_ACCIDENT_COUNT",
  StartStreamMapCars = "START_STREAM_MAP_CARS",
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
  [SocketEventType.StartStreamMapCars]: (
    carIds: string[],
    callback: (sId: string) => void
  ) => void
  [SocketEventType.StartStreamActiveCars]: (
    callback: (sId: string) => void
  ) => void
  [SocketEventType.StartStreamActiveDrivers]: (
    callback: (sId: string) => void
  ) => void
  [SocketEventType.StartStreamTotalPassengers]: (
    callback: (sId: string) => void
  ) => void
  [SocketEventType.StartStreamTotalAccidentCount]: (
    callback: (sId: string) => void
  ) => void
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

import { Status } from "./Status"
export interface HeartbeatStatus {
    carId: string,
    driverId: string, 
    time?: number,
    lat?: number,
    lng?: number,
    deviceStatus? : DeviceStatus
}

interface DeviceStatus{
    cameraDriver?: DeviceStatus,
    cameraDoor: DeviceStatus,
    cameraSeatsBack?: DeviceStatus,
    cameraSeatsFront?: DeviceStatus,
    drowsinessModule?: DeviceStatus,
    accidentModule?: DeviceStatus,
}

interface DeviceStatus{
    id?: string,
    status: Status
}

import { Status } from "./Status"
export interface HeartbeatStatus {
    id: string,
    status: Status 
    timestamp: string,
    Camera: CameraHeartbeatStatus[],
    Module: ModuleHeartbeatStatus[]
}

interface CameraHeartbeatStatus {
    role? : CameraRole,
    status : Status,
    timestamp : string
}

interface ModuleHeartbeatStatus {
    role? : ModuleRole,
    status : Status,
    timestamp : string
}

enum CameraRole {
    SEATS_BACK = "SEATS_BACK",
    SEATS_FRONT = "SEATS_FRONT",
    DRIVER = "DRIVER",
    DOOR = "DOOR"
}

enum ModuleRole{
    DROWSINESS_MODULE = "DROWSINESS_MODULE",
    ACCIDENT_MODULE = "ACCIDENT_MODULE"
}

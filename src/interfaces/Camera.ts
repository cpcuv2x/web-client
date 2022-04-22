export interface Camera {
  id: string
  name: string
  description: string
  streamUrl: string
  role: CameraRole
  status: CameraStatus
  carId: string
}

export enum CameraRole {
  DRIVER = "DRIVER",
  DOOR = "DOOR",
  SEATS_FRONT = "SEATS_FRONT",
  SEATS_BACK = "SEATS_BACK",
}

export enum CameraStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface CamerasResponse {
  cameras: Camera[]
  count: number
}

export interface CamerasFilters {
  name?: string
  description?: string
  streamUrl?: string
  carId?: string
  limit?: number
  offset?: number
  orderBy?: string
  orderDir?: OrderDir
}

export type CamerasFilter = keyof CamerasFilters

export enum OrderDir {
  ASC = "asc",
  DESC = "desc",
}

import { Camera } from "./Camera"
import { Driver } from "./Driver"

export interface Car {
  id: string
  imageFilename: string
  licensePlate: string
  model: string
  lat: number
  long: number
  passengers: number
  status: CarStatus
  driverId: string
  Driver: Driver | null
  Camera: Camera[]
}

export interface CarsFilters {
  id?: string
  licensePlate?: string
  model?: string
  status?: CarStatus
  minPassengers?: number
  maxPassengers?: number
  limit?: number
  offset?: number
  orderBy?: string
  orderDir?: OrderDir
}

export type CarsFilter = keyof CarsFilters

export enum OrderDir {
  ASC = "asc",
  DESC = "desc",
}

export enum CarStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface CarsResponse {
  cars: Car[]
  count: number
}

export interface AccidentLogByCar {
  id: string
  carId: string
  driverId: string
  lat: number
  long: number
  timestamp: string
}

export interface CarPosition {
  lat: number
  lng: number
}

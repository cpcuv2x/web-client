export interface Car {
  id: string
  imageFilename: string
  licensePlate: string
  model: string
  lat: number
  long: number
  passengers: number
  status: CarStatus
}

export interface CarsFilter {
  licensePlate?: string
  model?: string
  status?: CarStatus
  minPassengers?: number
  maxPassengers?: number
  limit?: number
  offset?: number
}

export enum CarStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface CarsResponse {
  cars: Car[]
  count: number
}

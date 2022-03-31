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

export enum CarStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

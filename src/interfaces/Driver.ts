import { Car } from "./Car"
import { User } from "./User"

export interface Driver {
  id: string
  firstNameTH: string
  lastNameTH: string
  firstNameEN: string
  lastNameEN: string
  gender: DriverGender
  birthDate: string
  registerDate: string
  nationalId: string
  carDrivingLicenseId: string
  status: DriverStatus
  imageFilename: string
  User: User
  Car: Car | null
}

export enum DriverGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  NOT_SPECIFIED = "NOT_SPECIFIED",
}

export enum DriverStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface DriversFilters {
  firstName?: string
  lastName?: string
  nationalId?: string
  carDrivingLicenseId?: string
  imageFilename?: string
  limit?: number
  offset?: number
  orderBy?: string
  orderDir?: OrderDir
}

export type DriversFilter = keyof DriversFilters

export enum OrderDir {
  ASC = "asc",
  DESC = "desc",
}

export interface DriversResponse {
  drivers: Driver[]
  count: number
}

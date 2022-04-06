// FIXME: add Driver status
export interface Driver {
  id: string
  firstName: string
  lastName: string
  birthDate: string
  nationalId: string
  carDrivingLicenseId: string
  imageFilename: string
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

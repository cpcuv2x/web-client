import { CarStatus } from "./Car"

export interface Overview {
    activeTotalCars: {
        active: number,
        total: number
    }
    activeTotalDrivers: {
        active: number,
        total: number
    }
    cars: CarOverviewInformation[],
    accidentCount: number,
    totalPassengers: number
}

export interface CarOverviewInformation {
    id: string,
    licensePlate?: string,
    passengers?: number,
    status?: CarStatus,
    lat?: number,
    lng?: number
}
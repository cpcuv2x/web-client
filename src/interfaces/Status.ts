export interface StatusTableElement {
    id: string,
    status: string 
}

export enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}
 
export interface HeartbeatTableElement {
    id : string,
    carStatus : Status,
    fontCamStatus : Status,
    backCamStatus : Status,
    doorCamStatus : Status,
    driverCamStatus : Status,
    drowsinessModuleStatus : Status,
    accidentModuleStatus : Status,
}
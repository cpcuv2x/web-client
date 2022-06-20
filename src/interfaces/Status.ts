export interface StatusTableElement {
    id: string,
    status: string 
}

export enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}
 
export interface HeartbeatTableElement {
    id? : string,
    carStatus? : Status,
    carTimestamp? : string,

    cameraDriver?: Status,
    cameraDoor?: Status,
    cameraSeatsBack?: Status,
    cameraSeatsFront?: Status,
    cameraTimestamp?: string,

    drowsinessModule?: Status,
    accidentModule?: Status,
    moduleTimestamp?: string,
}

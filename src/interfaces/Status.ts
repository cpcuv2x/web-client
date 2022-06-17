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
    cameraDriver?: Status,
    cameraDoor: Status,
    cameraSeatsBack?: Status,
    cameraSeatsFront?: Status,
    drowsinessModule?: Status,
    accidentModule?: Status,
}

export class MadeFromHeartbeatTableElement implements HeartbeatTableElement {
    id : string;
    carStatus : Status;
    cameraDriver: Status;
    cameraDoor: Status;
    cameraSeatsBack: Status;
    cameraSeatsFront: Status;
    drowsinessModule: Status;
    accidentModule: Status;

    constructor (id: string) {
        this.id = id;
        this.carStatus = Status.INACTIVE;
        this.cameraDriver = Status.INACTIVE;
        this.cameraDoor = Status.INACTIVE;
        this.cameraSeatsBack = Status.INACTIVE;;
        this.cameraSeatsFront = Status.INACTIVE;;
        this.drowsinessModule = Status.INACTIVE;;
        this.accidentModule = Status.INACTIVE;;
    }
}

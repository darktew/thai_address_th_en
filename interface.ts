interface ICallbackSubDistrict {
    subDistrict : string
    zipcode : string
}

export interface IReqDistrict {
    province : string
}

export interface IReqSubDistrict {
    province : string
    district : string
}

export interface ICallback {
    (res : string[] | ICallbackSubDistrict[] | null, err? : Error) : void
}
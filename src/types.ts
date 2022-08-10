import {LatLngExpression} from "leaflet";

type AddressType = { latlng: LatLngExpression; title: string; }

export interface PointType {
    id: number,
    title: string,
    description: string,
    address: {
        addressFrom: AddressType,
        addressTo: AddressType
    }
}

export type MapProps = {
    startPoint: LatLngExpression,
    endPoint: LatLngExpression
}


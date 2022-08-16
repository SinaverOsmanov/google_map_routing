import {LatLngExpression, LeafletMouseEvent} from "leaflet";

type AddressType = { latlng: LatLngExpression; title: string; }

export type PointType = {
    id: number,
    title: string,
    description: string,
    address: {
        addressFrom: AddressType,
        addressTo: AddressType
    }
}

export type MapProps = {
    startPoint: LatLngExpression | null,
    endPoint: LatLngExpression | null,
    onClickMap: (event: LeafletMouseEvent) => void,
    step: number,
    trigger: boolean,
}


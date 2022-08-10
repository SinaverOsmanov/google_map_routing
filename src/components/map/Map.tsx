import React, {useEffect, useState, useRef} from "react";
import {
    TileLayer,
    MapContainer
} from "react-leaflet";

import L, {LeafletMouseEvent} from "leaflet";
// Import the routing machine JS and CSS:
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import {MapProps} from "../../types";
import {mapConfig} from "./map.config";
import {getAddress} from "../../helpers/getAddress.helper";

const Map: React.FC<MapProps> = ({startPoint, endPoint}) => {
// The map instance:
    const [map, setMap] = useState<L.Map | null>(null);

// Start-End point for the routing machine

    const [routingMachine, setRoutingMachine] = useState<any | null>(null);

// Routing machine ref
    const RoutingMachineRef = useRef(null)


    async function onMapClick(e: LeafletMouseEvent) {
        let popup = L.popup()

        if (map) {
            const {display_name} = await getAddress(e.latlng.lat, e.latlng.lng)

            popup.setLatLng(e.latlng)
                .setContent(display_name)
                .openOn(map);
        }
    }

// Create the routing-machine instance:
    useEffect(() => {
        if (map) {
            map.on('click', onMapClick)
            const {Routing} = L as any

            RoutingMachineRef.current = Routing.control({
                position: 'bottomright',
                lineOptions: {
                    styles: [
                        {
                            color: '#757de8',
                        },
                    ],
                },
                waypoints: [startPoint, endPoint],
            })
            setRoutingMachine(RoutingMachineRef.current)
        }
        return () => {
            map?.off('click', onMapClick)
        }
    }, [map])


// Set waypoints when startPoint and endPoint points are updated:
    useEffect(() => {
        if (routingMachine && map) {
            routingMachine.addTo(map)
            routingMachine.setWaypoints([startPoint, endPoint])
        }
    }, [routingMachine, startPoint, endPoint])

    return (
        <MapContainer
            center={[45.345566668964558, -75.760933332842754]}
            zoom={5}
            zoomControl={false}
            // Set the map instance to state when ready:
            style={{height: '100%'}}
            whenCreated={(map: L.Map) => setMap(map)}
        >
            <TileLayer {...mapConfig} />
        </MapContainer>

    );
};

export default Map;

import React, {useEffect, useRef, useState} from "react";
import {MapContainer, TileLayer} from "react-leaflet";

import L, {LeafletMouseEvent} from "leaflet";
// Import the routing machine JS and CSS:
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import {MapProps} from "../../types";
import {mapConfig} from "./map.config";
import {getAddress} from "../../helpers/getAddress.helper";


const controlConfig = {
    position: 'bottomright',
    draggableWaypoints: false,
    lineOptions: {
        styles: [
            {
                color: '#757de8',
            },
        ],
    },
}

const Map: React.FC<MapProps> = ({startPoint, endPoint, onClickMap, trigger, step}) => {
// The map instance:
    const [map, setMap] = useState<L.Map | null>(null);

// Start-End point for the routing machine
    const [routingMachine, setRoutingMachine] = useState<any | null>(null);

// Routing machine ref
    const RoutingMachineRef = useRef(null)

    async function onMapClickPopup(e: LeafletMouseEvent) {
        let popup = L.popup()
        if (map) {
            const {display_name} = await getAddress(e.latlng.lat, e.latlng.lng)

            popup.setLatLng(e.latlng)
                .setContent(display_name)
                .openOn(map);
        }
    }

    function onClickMapHandler(e: LeafletMouseEvent) {
        onClickMap(e)
    }


// Create the routing-machine instance:
    useEffect(() => {
        if (map) {
            const {Routing, Control} = L as any
            console.log(Control.geocoder, 'control');
            RoutingMachineRef.current = Routing.control({
                waypoints: [startPoint, endPoint],
                ...controlConfig
            }) as typeof Routing.control
            setRoutingMachine(RoutingMachineRef.current)
        }
        return () => {
            RoutingMachineRef.current = null
        }
    }, [map])


// Set waypoints when startPoint and endPoint points are updated:
    useEffect(() => {
        if (map && routingMachine) {
            map.on('click', onMapClickPopup)
            routingMachine.addTo(map)
        }
        return () => {
            if (map && routingMachine) {
                map.off('click', onMapClickPopup)
                routingMachine.remove()
            }
        }
    }, [routingMachine])


    useEffect(() => {
        if (routingMachine) {
            if (trigger) {

                const {Routing} = L as any

                RoutingMachineRef.current = Routing.control({
                    ...controlConfig,
                    draggableWaypoints: true
                })

                setRoutingMachine(RoutingMachineRef.current)
            }
        }
        return () => {
            RoutingMachineRef.current = null
        }

    }, [trigger]);

    useEffect(() => {
        if (routingMachine) {
            routingMachine.setWaypoints([startPoint, endPoint])
        }
    }, [startPoint, endPoint]);


    useEffect(() => {
        if (map && routingMachine) {
            map.on('click', onClickMapHandler)
            routingMachine.on('routeselected', (e: any) => console.log(e))
        }
        return () => {
            map?.off('click', onClickMapHandler)
        }
    }, [trigger, step]);


    return (
        <MapContainer
            zoom={4}
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

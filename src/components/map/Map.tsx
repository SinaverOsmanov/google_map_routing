import React, {useEffect, useRef, useState} from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import * as L from "leaflet";
import {LeafletMouseEvent} from "leaflet";
// Import the routing machine JS and CSS:
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import {MapProps} from "../../types";
import {controlConfig, mapConfig} from "./map.config";
import {getAddress} from "../../helpers/getAddress.helper";


const Map: React.FC<MapProps> = ({startPoint, endPoint, onClickMap, trigger, step}) => {
// The map instance:
    const [map, setMap] = useState<L.Map | null>(null);

// Start-End point for the routing machine
    const [routingMachine, setRoutingMachine] = useState<any | null>(null);

// Routing machine ref
    const RoutingMachineRef = useRef<any | null>(null)

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
            const {Routing} = L as any

            RoutingMachineRef.current = Routing.control({
                ...controlConfig
            })

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

                    waypoints: [startPoint, endPoint],
                    ...controlConfig,
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
        }
        return () => {
            map?.off('click', onClickMapHandler)
        }
    }, [trigger, step]);


    return (
        <MapContainer
            center={[50.94633342311665, 34.10705566406251]}
            zoom={4}
            zoomControl={false}
            style={{height: '100%'}}
            whenCreated={(map: L.Map) => {
                console.log(map)
                setMap(map)
            }}
        >
            <TileLayer {...mapConfig} />
        </MapContainer>

    );
};

export default Map;

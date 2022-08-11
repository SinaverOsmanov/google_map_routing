import React, {useCallback, useEffect, useState} from 'react';
import {Button, Col, Divider, Input, Layout, List, Row} from "antd";
import Map from "./map/Map";
import {PointType} from "../types";
import {useDispatch, useSelector} from "react-redux";
import {addNewPoint, getCurrentPoint, getMapPoints, setCurrentPoint} from "../store/ducks/app/actions";
import {State} from "../store/ducks/globalTypes";
import {LatLng, LatLngExpression, LeafletMouseEvent} from "leaflet";
import {getAddress} from "../helpers/getAddress.helper";

const {Sider, Content} = Layout;

type RouteAddressType = {
    name: string,
    latlng: LatLngExpression
}

export default function MapList() {
    const [showRouteCreator, setShowRouteCreator] = useState(false);
    const [routeFrom, setRouteFrom] = useState<RouteAddressType | null>(null);
    const [routeTo, setRouteTo] = useState<RouteAddressType | null>(null);
    const [step, setStep] = useState(0);

    const dispatch = useDispatch()

    const {points, currentPoint} = useSelector((state: State) => state.map)

    function editPoint(id: number) {
        console.log(id)
    }

    function selectedPoint(id: number) {
        const foundPoint = points.find((point: PointType) => point.id === id)

        if (foundPoint) {
            dispatch(setCurrentPoint(foundPoint))
        }
    }

    const callbackMapClickHandler = useCallback((event: LeafletMouseEvent) => clickMapHandler(event), [showRouteCreator, routeTo, routeFrom, step])

    async function clickMapHandler(e: LeafletMouseEvent) {

        if (!showRouteCreator) return

        const {lat, lng}: LatLng = e.latlng

        const address = await getAddress(lat, lng)

        const addressName = address.display_name ?? address.name
        const fullAddress: RouteAddressType = {name: addressName, latlng: [lat, lng]}

        if (step === 0) {
            setRouteFrom(fullAddress)
            setStep(prev => prev + 1)
        } else if (step === 1) {
            setRouteTo(fullAddress)
            setStep(prev => prev + 1)
        }
    }

    useEffect(() => {
        dispatch(getMapPoints())
        dispatch(getCurrentPoint())
    }, []);

    function showRouteClickHandler() {
        setShowRouteCreator((prev) => !prev)
        if (showRouteCreator) {
            clearRoute()
        }
    }

    function clearRoute() {
        setStep(0)
        setRouteFrom(null)
        setRouteTo(null)
    }

    function createPointHandler() {
        if (routeFrom && routeTo && step === 2) {
            const newPoint = {
                id: points.length + 1,
                title: '',
                description: '',
                address: {
                    addressFrom: {
                        latlng: routeFrom.latlng,
                        title: routeFrom.name
                    },
                    addressTo: {
                        latlng: routeTo.latlng,
                        title: routeTo.name
                    }
                }
            }
            dispatch(addNewPoint(newPoint))
            clearRoute()
            setShowRouteCreator(false)
        }
    }

    return (
        <Layout style={{height: '100vh'}}>
            <Sider style={{background: 'none'}} width={500}>
                <h2 style={{textAlign: 'center', margin: '10px 0'}}>Points</h2>
                <div>
                    <Button onClick={showRouteClickHandler}>Show route creator</Button>
                </div>
                {showRouteCreator && <div style={{paddingLeft: 10}}>
                    <h2>Create new route</h2>

                    <div>from: <Input type="text" value={routeFrom?.name}/></div>
                    <div>to: <Input type="text" value={routeTo?.name}/></div>
                    <Button onClick={createPointHandler}
                            style={{marginTop: '10px', background: 'darkseagreen', color: 'white'}}
                            block>Create</Button>
                    <Divider/>
                </div>
                }
                <List>
                    {points.map((item: PointType) => {
                        let isPointSelect = item.id === currentPoint?.id

                        return <List.Item
                            style={{padding: '10px'}}
                            className={isPointSelect ? 'active-item' : ''}
                            key={item.id}>
                            <Row style={{flex: '0 0 100%'}} align={'middle'}>
                                <Col span={17} className='addressName'>
                                    <div><span className='bold'>from:</span> {item.address.addressFrom.title}</div>
                                    <div><span className='bold'>to:</span> {item.address.addressTo.title}</div>
                                </Col>
                                <Col span={7}>
                                    <Row justify={'space-between'}>
                                        <Col>
                                            <Button onClick={() => editPoint(item.id)}>edit</Button>
                                        </Col>
                                        <Col>
                                            <Button className={isPointSelect ? 'selected-button' : ''}
                                                    onClick={() => selectedPoint(item.id)}>{isPointSelect ? 'selected' : 'select'}</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </List.Item>
                    })}
                </List>
            </Sider>
            <Layout>
                <Content className="site-layout-background"
                         style={{
                             paddingLeft: '10px',
                             minHeight: '280px'
                         }}>
                    {currentPoint &&
                        <Map startPoint={currentPoint.address.addressFrom.latlng}
                             endPoint={currentPoint.address.addressTo.latlng}
                             onClickMap={callbackMapClickHandler}
                             step={step}
                             trigger={showRouteCreator}
                        />}
                </Content>
            </Layout>
        </Layout>
    )
}

import React, {useCallback, useEffect, useState} from 'react';
import {Button, Col, Divider, Input, Layout, List, Row, Typography} from "antd";
import Map from "./map/Map";
import {AddressType, PointType} from "../types";
import {useDispatch, useSelector} from "react-redux";
import {addNewPoint, getCurrentPoint, getMapPoints, removePoint, setCurrentPoint} from "../store/ducks/app/actions";
import {State} from "../store/ducks/globalTypes";
import {LatLng, LeafletMouseEvent} from "leaflet";
import {getAddress} from "../helpers/getAddress.helper";
import localStorageService from '../service/localStorage.service'

const {Sider, Content} = Layout;
const {Title} = Typography;

export default function MapList() {
    const RouteAddressState = {
        title: '',
        latlng: null
    }

    const [showRouteCreator, setShowRouteCreator] = useState(false);
    const [routeFrom, setRouteFrom] = useState<AddressType>(RouteAddressState);
    const [routeTo, setRouteTo] = useState<AddressType>(RouteAddressState);
    const [step, setStep] = useState(0);
    const dispatch = useDispatch()
    const {points, currentPoint} = useSelector((state: State) => state.map)

    function selectedPoint(id: number) {
        const foundPoint = points.find((point: PointType) => point.id === id)

        if (foundPoint) {
            dispatch(setCurrentPoint(foundPoint))
        }
    }

    function removePointHandler(id: number) {
        dispatch(removePoint(id))
    }

    const callbackMapClickHandler = useCallback((event: LeafletMouseEvent) => clickMapHandler(event), [showRouteCreator, routeTo, routeFrom, step])

    async function clickMapHandler(e: LeafletMouseEvent) {

        if (!showRouteCreator) return

        const {lat, lng}: LatLng = e.latlng

        const address = await getAddress(lat, lng)

        const addressName = address.display_name ?? address.name
        const fullAddress: AddressType = {
            title: addressName, latlng: [lat, lng]
        }

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
        setRouteFrom(RouteAddressState)
        setRouteTo(RouteAddressState)
    }

    function createPointHandler() {
        if (routeFrom.latlng && routeTo.latlng && step === 2) {
            const newPoint = {
                id: Date.now(),
                title: '',
                description: '',
                address: {
                    addressFrom: {
                        latlng: routeFrom.latlng,
                        title: routeFrom.title
                    },
                    addressTo: {
                        latlng: routeTo.latlng,
                        title: routeTo.title
                    }
                }
            }
            dispatch(addNewPoint(newPoint))
            dispatch(setCurrentPoint(newPoint))
            clearRoute()
            setShowRouteCreator(false)
        }
    }

    return (
        <Layout style={{height: '100vh'}}>
            <Sider style={{background: 'none'}} width={500}>
                <Title level={2} style={{textAlign: 'center', margin: '10px 0'}}>Points</Title>
                <Row style={{marginBottom: '10px'}} justify='end'>
                    <Col>
                        <Button onClick={showRouteClickHandler}>Show route creator</Button>
                    </Col>
                </Row>
                {showRouteCreator && <div style={{paddingLeft: 10}}>
                    <h2>Create new route</h2>

                    <div>from: <Input type="text" value={routeFrom.title}/></div>
                    <div>to: <Input type="text" value={routeTo.title}/></div>
                    <Button onClick={createPointHandler} className='create-button' block>Create</Button>
                    <Divider/>
                </div>
                }
                <List>
                    {points.length > 0 ? points.map((item: PointType) => {
                        let isPointSelect = item.id === currentPoint?.id

                        return <List.Item
                            style={{padding: '10px'}}
                            className={isPointSelect ? 'active-item' : ''}
                            key={item.id}>
                            <Col>
                                <Row>
                                    <Col className='addressName'>
                                        <div><span className='bold'>from:</span> {item.address.addressFrom.title}</div>
                                        <div><span className='bold'>to:</span> {item.address.addressTo.title}</div>
                                    </Col>
                                </Row>
                                <Row justify={"end"} style={{marginTop: '10px'}}>
                                    <Col span={8}>
                                        <Row justify='space-between'>
                                            <Col>
                                                <Button className='remove-button'
                                                        onClick={() => removePointHandler(item.id)}>remove</Button>
                                            </Col>
                                            <Col>
                                                <Button className={isPointSelect ? 'selected-button' : ''}
                                                        onClick={() => selectedPoint(item.id)}>{isPointSelect ? 'selected' : 'select'}</Button>
                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>
                            </Col>

                        </List.Item>
                    }) : <div style={{textAlign: 'center'}}>Маршрутов нет</div>}
                </List>
            </Sider>
            <Layout>
                <Content className="site-layout-background"
                         style={{
                             paddingLeft: '10px',
                             minHeight: '280px'
                         }}>
                    {<Map
                        startPoint={showRouteCreator ? routeFrom.latlng : currentPoint ? currentPoint.address.addressFrom.latlng : null} // showRouteCreator ? routeFrom.latlng : currentPoint!.address.addressFrom.latlng
                        endPoint={showRouteCreator ? routeTo.latlng : currentPoint ? currentPoint.address.addressTo.latlng : null} // showRouteCreator ? routeTo.latlng : currentPoint!.address.addressTo.latlng
                        onClickMap={callbackMapClickHandler}
                        step={step}
                        trigger={showRouteCreator}
                    />}
                </Content>
            </Layout>
        </Layout>
    )
}

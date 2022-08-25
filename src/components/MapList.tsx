import React, {useCallback, useEffect, useState} from 'react';
import {Button, Col, Divider, Grid, Input, Layout, List, Row, Typography} from "antd";
import Map from "./map/Map";
import {AddressType, PointType} from "../types";
import {useDispatch, useSelector} from "react-redux";
import {addNewPoint, getCurrentPoint, getMapPoints, removePoint, setCurrentPoint} from "../store/ducks/app/actions";
import {State} from "../store/ducks/globalTypes";
import {LatLng, LeafletMouseEvent} from "leaflet";
import {getAddress} from "../helpers/getAddress.helper";
import {CloseOutlined, MenuOutlined, PlusOutlined} from '@ant-design/icons';
import {
    AddNewPointButton,
    ColAddressNameStyle,
    ContentStyle,
    ListItemStyle,
    MenuButton,
    PinkButton,
    SelectButton,
    SiderStyle,
    TitleStyle
} from '../styled';

import {getScreenWidth} from "../helpers/getScreen.helper";
import {CreateRouteForm} from "./CreateRouteForm";

const {useBreakpoint} = Grid;


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
    const [collapsed, setCollapsed] = useState(false);
    const [mobileToggle, setMobileToggle] = useState(false);

    const screens = useBreakpoint();

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

    function showRouteClickHandler() {
        setShowRouteCreator((prev) => !prev)

        if (showRouteCreator) {
            clearRoute()
        }
    }

    function toggle() {
        setMobileToggle((prev) => !prev)
        setShowRouteCreator((prev) => !prev)
        if (!collapsed && !showRouteCreator) setCollapsed(true)
    }

    function showMenuClickHandler() {
        setCollapsed(!collapsed)
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

    useEffect(() => {
        dispatch(getMapPoints())
        dispatch(getCurrentPoint())

    }, []);

    useEffect(() => {
        if (collapsed && screens.md) setShowRouteCreator(false)
    }, [collapsed]);

    return (
        <Layout style={{height: '100vh'}}>
            <SiderStyle
                collapsible
                theme={'light'}
                width={getScreenWidth(screens)}
                collapsed={collapsed}
                trigger={null}
                collapsedWidth={0}
            >

                <TitleStyle level={2}>Routes</TitleStyle>
                {screens.md && <>

                    <Row style={{marginBottom: '10px'}} justify='end'>
                        <Col>
                            <Button onClick={showRouteClickHandler}>Show route creator</Button>
                        </Col>
                    </Row>
                    <CreateRouteForm from={routeFrom.title} to={routeTo.title} create={createPointHandler}
                                     show={showRouteCreator}/>
                </>
                }
                <List>
                    {points.length > 0 ? points.map((item: PointType) => {
                        let isPointSelect = item.id === currentPoint?.id

                        return <ListItemStyle
                            className={isPointSelect ? 'active-item' : ''}
                            key={item.id}>
                            <Col>
                                <Row>
                                    <ColAddressNameStyle>
                                        <div><span>from:</span> {item.address.addressFrom.title}
                                        </div>
                                        <div><span>to:</span> {item.address.addressTo.title}</div>
                                    </ColAddressNameStyle>
                                </Row>
                                <Row justify='center' style={{marginTop: '10px'}}>
                                    <Col span={24}>
                                        <Row justify='space-between'>
                                            <Col span={12}>
                                                <PinkButton
                                                    onClick={() => removePointHandler(item.id)}>remove</PinkButton>
                                            </Col>
                                            <Col span={12}>
                                                <SelectButton background={isPointSelect ? '#4b53c3' : '#4d96e1'}
                                                              onClick={() => selectedPoint(item.id)}>{isPointSelect ? 'selected' : 'select'}</SelectButton>
                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>
                            </Col>

                        </ListItemStyle>
                    }) : <div style={{textAlign: 'center'}}>Маршрутов нет</div>}
                </List>
            </SiderStyle>
            <Layout>
                <ContentStyle>
                    <MenuButton background={collapsed ? '#4b53c3' : '#e7768e'}
                                onClick={showMenuClickHandler}>{collapsed ? <MenuOutlined
                    /> : <CloseOutlined/>}</MenuButton>

                    {!screens.md && <>
                        <AddNewPointButton background={mobileToggle ? '#e7768e' : 'darkseagreen'}
                                           onClick={toggle}>{mobileToggle ?
                            <CloseOutlined/> : <PlusOutlined/>}</AddNewPointButton>
                        <CreateRouteForm from={routeFrom.title} to={routeTo.title} create={createPointHandler}
                                         show={showRouteCreator}/>
                    </>}

                    {<Map
                        startPoint={showRouteCreator ? routeFrom.latlng : currentPoint ? currentPoint.address.addressFrom.latlng : null} // showRouteCreator ? routeFrom.latlng : currentPoint!.address.addressFrom.latlng
                        endPoint={showRouteCreator ? routeTo.latlng : currentPoint ? currentPoint.address.addressTo.latlng : null} // showRouteCreator ? routeTo.latlng : currentPoint!.address.addressTo.latlng
                        onClickMap={callbackMapClickHandler}
                        step={step}
                        trigger={showRouteCreator}
                    />}
                </ContentStyle>
            </Layout>
        </Layout>
    )
}

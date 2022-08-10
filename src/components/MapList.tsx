import React, {useEffect} from 'react';
import {Button, Layout, List} from "antd";
import Map from "./map/Map";
import {PointType} from "../types";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPoint, getMapPoints, setCurrentPoint} from "../store/ducks/app/actions";
import {State} from "../store/ducks/globalTypes";

const {Sider, Content} = Layout;

export default function MapList() {
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

    useEffect(() => {
        dispatch(getMapPoints())
        dispatch(getCurrentPoint())
    }, []);


    return (
        <Layout style={{height: '100vh'}}>
            <Sider style={{background: 'none'}} width={500}>
                <h2 style={{textAlign: 'center', margin: '10px 0'}}>Points</h2>
                <List>
                    {points.map((item: PointType) => {
                        let isPointSelect = item.id === currentPoint?.id

                        return <List.Item
                            style={{padding: '10px'}}
                            className={isPointSelect ? 'active-item' : ''}
                            key={item.id}>
                            <div>
                                <div><span className='bold'>from:</span> {item.address.addressFrom.title}</div>
                                <div><span className='bold'>to:</span> {item.address.addressTo.title}</div>
                            </div>
                            <div>
                                <Button onClick={() => editPoint(item.id)}>edit</Button>
                                <Button className={isPointSelect ? 'selected-button' : ''}
                                        onClick={() => selectedPoint(item.id)}>selected</Button>
                            </div>
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
                    {currentPoint && <Map startPoint={currentPoint.address.addressFrom.latlng}
                                          endPoint={currentPoint.address.addressTo.latlng}/>}
                </Content>
            </Layout>
        </Layout>
    )
}

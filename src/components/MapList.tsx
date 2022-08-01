import React, {useRef, useState} from 'react';
import {Button, Layout} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment} from "../store/ducks/app/actions";

const { Sider, Content } = Layout;

function MapList() {
    const {count} = useSelector((state:any) => state.countReducer)
    const [counter, setCounter] = useState(0)
    const dispatch = useDispatch()

    function onIncrement() {
        dispatch(increment(1))
    }

    function onDecrement() {
        dispatch(decrement(1))
    }

    return (
        <Layout style={{height: '100vh'}}>

            {/*<Sider*/}
            {/*</Sider>*/}
            {/*<Layout>*/}
            {/*    <Content>*/}

            {/*    </Content>*/}
            {/*</Layout>*/}


        </Layout>
    );
}

export default MapList;

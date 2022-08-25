import {CreateRouteBlockStyle, GreenButton, InputWrapper} from "../styled";
import {Input, Typography} from "antd";
import React from "react";

const {Title} = Typography;

export function CreateRouteForm({from, to, show, create}: { from: string, to: string, create(): void, show: boolean }) {
    return (
        <CreateRouteBlockStyle show={show}>
            <Title level={4} style={{textAlign: 'center'}}>Create new route</Title>
            <InputWrapper>
                <div>from: <Input type="text" value={from}/></div>
                <div>to: <Input type="text" value={to}/></div>
            </InputWrapper>
            <GreenButton onClick={create} block>Create</GreenButton>
        </CreateRouteBlockStyle>
    )
}

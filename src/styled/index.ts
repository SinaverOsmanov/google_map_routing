import styled from "styled-components";
import {Button, Col, Layout, List, Typography} from "antd";

const {Sider, Content} = Layout;
const {Title} = Typography;


export const ButtonStyle = styled(Button)`
  color: #fff;
  border: 1px solid transparent;
`

export const PurpleButton = styled(ButtonStyle)`
  background: #757de7;
`

export const GreenButton = styled(ButtonStyle)`
  background: darkseagreen;
`

export const PinkButton = styled(ButtonStyle)`
  background: #e7768e;
`

export const MenuButton = styled(ButtonStyle)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background: ${(props: { background: string }) => props.background}
`

export const AddNewPointButton = styled(ButtonStyle)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
  background: ${(props: { background: string }) => props.background}
`

export const SelectButton = styled(ButtonStyle)`
  background: ${(props: { background: string }) => props.background};
  color: #fff;

`

export const SiderStyle = styled(Sider)`

  position: relative;

  //&:after {
  //  content: "";
  //  position: absolute;
  //  top: 0;
  //  right: 0;
  //  background: #ccc;
  //  height: 100vh;
  //  width: 5px;
  //
  //  &:hover + & {
  //    background: #000
  //  }
  //}
`

export const TitleStyle = styled(Title)`
  text-align: center;
  margin: 10px 0;
`

export const ContentStyle = styled(Content)`
  min-height: 280px;
  height: 100vh;
  position: relative;
`

export const ListItemStyle = styled(List.Item)`
  padding: 10px;

  button {
    width: 100%;
  }
`

export const ColAddressNameStyle = styled(Col)`

  & > div > span {
    font-weight: bold;
  }

  & > div {
    overflow: hidden;
    height: 20px;
  }
`

export const CreateRouteBlockStyle = styled.div`
  height: ${(props: { show: boolean }) => props.show ? '230px' : '0px'};
  transition: height 1s ease;
  overflow: hidden;

`

export const InputWrapper = styled.div`
  padding: 0 10px;

  & > div {
    margin-bottom: 10px;
  }
`





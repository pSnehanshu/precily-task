import { get } from "lodash-es";
import styled from "styled-components";
import { DragHandleHorizontal, DragHandleVertical } from "./Handles";

const Win = styled.div`
  display: inline-block;
  margin: 5px;
  position: relative;
  width: ${props => get(props, 'width', '100%')};
  height: ${props => get(props, 'height', '350px')};
`;

export default function WindowBox({ 
  height, 
  width, 
  onIncreaseWidth, 
  onDecreaseWidth ,
  onIncreaseHeight,
  onDecreaseHeight,
}) {
  return <Win height={height} width={width}>
    <DragHandleHorizontal
      type="top"
      dragUp={onIncreaseHeight}
      dragDown={onDecreaseHeight}
    />
    <DragHandleHorizontal
      type="bottom"
      dragUp={onDecreaseHeight}
      dragDown={onIncreaseHeight}
    />
    <DragHandleVertical
      type="right"
      dragRight={onIncreaseWidth}
      dragLeft={onDecreaseWidth}
    />
    <DragHandleVertical
      type="left"
      dragRight={onDecreaseWidth}
      dragLeft={onIncreaseWidth}
    />
  </Win>;
}

import { get, find } from "lodash-es";
import styled from "styled-components";
import { DragHandleHorizontal, DragHandleVertical } from "./Handles";
import store from '../store';

const Win = styled.div`
  display: inline-block;
  margin: 5px;
  padding: 5px;
  position: relative;
  border: solid 4px gray;
  width: ${props => get(props, 'width', '100%')};
  height: ${props => get(props, 'height', '350px')};
`;

export default function WindowBox({
  windowId,
  height,
  width,
  onIncreaseWidth,
  onDecreaseWidth,
  onIncreaseHeight,
  onDecreaseHeight,
}) {
  const loading = store.useState(s => s.contentLoading);
  const content = store.useState(s => get(find(s.contents, { windowId }), 'content'));

  return <Win height={height} width={width}>
    <div>
      {loading ? <b>Loading...</b> : (
        content ? <p>{content}</p> : <b>No content</b>
      )}
    </div>

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

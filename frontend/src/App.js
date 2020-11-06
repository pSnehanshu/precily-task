import { useState } from "react";
import { get, flow } from "lodash-es";
import styled from "styled-components";
import { DragHandleHorizontal, DragHandleVertical } from "./components/Handles";

const Win = styled.div`
  display: inline-block;
  margin: 5px;
  position: relative;
  width: ${props => get(props, 'width', '100%')};
  height: ${props => get(props, 'height', '350px')};
`;

function WindownBox({ 
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

const getPercent = (amount = 1, percent = 100) => (percent/100) * amount;

const winW = getPercent(window.innerWidth, 90);
const winH = getPercent(window.innerHeight, 90);

function App() {  
  const [sizes, setSizes] = useState({
    win1: {
      height: getPercent(winH, 50),
      width: getPercent(winW, 30),
    },
    win2: {
      height: getPercent(winH, 50),
      width: getPercent(winW, 70),
    },
    win3: {
      height: getPercent(winH, 50),
      width: getPercent(winW, 101),
    },
  });

  const increaseWidth = (winid) => (e) => {
    setSizes((s) => ({
      ...s,
      [winid]: {
        ...s[winid],
        width: s[winid].width + 10,
      }
    }));
  };
  const decreaseWidth = (winid) => (e) => {
    setSizes((s) => ({
      ...s,
      [winid]: {
        ...s[winid],
        width: s[winid].width - 10,
      }
    }));
  };
  const increaseHeight = (winid) => (e) => {
    setSizes((s) => ({
      ...s,
      [winid]: {
        ...s[winid],
        height: s[winid].height + 10,
      }
    }));
  };
  const decreaseHeight = (winid) => (e) => {
    setSizes((s) => ({
      ...s,
      [winid]: {
        ...s[winid],
        height: s[winid].height - 10,
      }
    }));
  };

  const row1HeightIncreaseSync = flow([increaseHeight('win1'), increaseHeight('win2'), decreaseHeight('win3')]);
  const row1HeightDecreaseSync = flow([decreaseHeight('win1'), decreaseHeight('win2'), increaseHeight('win3')]);
  const win1WidthIncreaseSync = flow([increaseWidth('win1'), decreaseWidth('win2')]);
  const win1WidthDecreaseSync = flow([decreaseWidth('win1'), increaseWidth('win2')]);

  return (
    <div className="App">
      <div>
        <WindownBox
          width={`${sizes.win1.width}px`}
          height={`${sizes.win1.height}px`}
          onIncreaseWidth={win1WidthIncreaseSync}
          onDecreaseWidth={win1WidthDecreaseSync}
          onIncreaseHeight={row1HeightIncreaseSync}
          onDecreaseHeight={row1HeightDecreaseSync}
        />
        <WindownBox
          width={`${sizes.win2.width}px`}
          height={`${sizes.win2.height}px`}
          onIncreaseWidth={win1WidthDecreaseSync}
          onDecreaseWidth={win1WidthIncreaseSync}
          onIncreaseHeight={row1HeightIncreaseSync}
          onDecreaseHeight={row1HeightDecreaseSync}
        />
      </div>
      <div>
        <WindownBox
          width={`${sizes.win3.width}px`}
          height={`${sizes.win3.height}px`}
          onIncreaseWidth={increaseWidth('win3')}
          onDecreaseWidth={decreaseWidth('win3')}
          onIncreaseHeight={row1HeightDecreaseSync}
          onDecreaseHeight={row1HeightIncreaseSync}
        />
      </div>
    </div>
  );
}

export default App;

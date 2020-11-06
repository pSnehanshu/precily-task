import { useState } from "react";
import { get } from "lodash-es";
import styled from "styled-components";
import { DragHandleHorizontal, DragHandleVertical } from "./components/Handles";

const Container = styled.div`
  display: flex;
`;

const Win = styled.div`
  margin: 5px;
  position: relative;
  width: ${props => get(props, 'width', '100%')};
  height: ${props => get(props, 'height', '350px')};
`;

function WindownBox({ height, width, onIncreaseWidth, onDecreaseWidth }) {
  return <Win height={height} width={width}>
    <DragHandleHorizontal type="top" />
    <DragHandleHorizontal type="bottom" />
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

function App() {
  const [sizes, setSizes] = useState({
    win1: {
      height: 350,
      width: 200,
    },
    win2: {
      height: 350,
      width: 800,
    },
    win3: {
      height: 350,
      width: 1000,
    },
  });

  const onIncreaseWidth = (winid) => (e) => {
    setSizes((s) => ({
      ...s,
      [winid]: {
        ...s[winid],
        width: s[winid].width + 10,
      }
    }));
  };
  const onDecreaseWidth = (winid) => (e) => {
    setSizes((s) => ({
      ...s,
      [winid]: {
        ...s[winid],
        width: s[winid].width - 10,
      }
    }));
  };

  return (
    <div className="App">
      <Container>
        <WindownBox
          width={`${sizes.win1.width}px`}
          height={`${sizes.win1.height}px`}
          onIncreaseWidth={onIncreaseWidth('win1')}
          onDecreaseWidth={onDecreaseWidth('win1')}
        />
        <WindownBox
          width={`${sizes.win2.width}px`}
          height={`${sizes.win2.height}px`}
          onIncreaseWidth={onIncreaseWidth('win2')}
          onDecreaseWidth={onDecreaseWidth('win2')}
        />
      </Container>
      <Container>
        <WindownBox
          width={`${sizes.win3.width}px`}
          height={`${sizes.win3.height}px`}
          onIncreaseWidth={onIncreaseWidth('win3')}
          onDecreaseWidth={onDecreaseWidth('win3')}
        />
      </Container>
    </div>
  );
}

export default App;

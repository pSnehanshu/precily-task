import { get } from "lodash-es";
import styled, { css } from "styled-components";

const getHandleTypeCss = (type) => {
  const cursors = {
    top: 'ns-resize',
    bottom: 'ns-resize',
    left: 'ew-resize',
    right: 'ew-resize',
  };

  return css`
    ${type}: 0px;
    cursor: ${get(cursors, type, 'default')};
  `;
}

const DragHandleVertical = styled.div`
  position: absolute;
  height: 100%;
  width: 5px;
  background: gray;
  ${(props) => {
    const type = get(props, 'type', 'top');
    return getHandleTypeCss(type);
  }}
`;

const DragHandleHorizontal = styled.div`
  position: absolute;
  width: 100%;
  height: 5px;
  background: gray;
  ${(props) => {
    const type = get(props, 'type', 'left');
    return getHandleTypeCss(type);
  }}
`;


const Container = styled.div`
  display: flex;
`;

const Win = styled.div`
  margin: 5px;
  position: relative;
  width: ${props => get(props, 'width', '100%')};
  height: ${props => get(props, 'height', '350px')};
`;

Win.defaultProps = {
  children: <>
    <DragHandleHorizontal type="top" />
    <DragHandleHorizontal type="bottom" />
    <DragHandleVertical type="right" />
    <DragHandleVertical type="left" />
  </>
};

function App() {
  return (
    <div className="App">
      <Container>
        <Win width="20%" />
        <Win width="80%" />
      </Container>
      <Container>
        <Win />
      </Container>
    </div>
  );
}

export default App;

import { get, throttle, invoke } from "lodash-es";
import styled, { css } from "styled-components";

const handleMouseDown = (props, type = 'vertical') => (e) => {
  e.preventDefault();

  let lastCoord = 0;
  const handleMouseMove = throttle((e) => {
    e.preventDefault();
    if (type === 'vertical') {
      if (e.clientX < lastCoord) {
        invoke(props, 'dragLeft', e);
      } else {
        invoke(props, 'dragRight', e);
      }
      lastCoord = e.clientX;
    } else if (type === 'horizontal') {
      if (e.clientY < lastCoord) {
        invoke(props, 'dragUp', e);
      } else {
        invoke(props, 'dragDown', e);
      }
      lastCoord = e.clientY;
    }
  }, 100);

  const handleMouseUp = (e) => {
    e.preventDefault();
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);
};

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

const Vertical = styled.div`
  position: absolute;
  height: 100%;
  width: 5px;
  background: gray;
  ${(props) => {
    const type = get(props, 'type', 'top');
    return getHandleTypeCss(type);
  }}
`;

const Horizontal = styled.div`
  position: absolute;
  width: 100%;
  height: 5px;
  background: gray;
  ${(props) => {
    const type = get(props, 'type', 'left');
    return getHandleTypeCss(type);
  }}
`;

function DragHandleVertical(props) {
  return <Vertical
    {...props}
    onMouseDown={handleMouseDown(props, 'vertical')}
  />
}

function DragHandleHorizontal(props) {
  return <Horizontal
    {...props}
    onMouseDown={handleMouseDown(props, 'horizontal')}
  />
}

export {
  DragHandleVertical,
  DragHandleHorizontal
};

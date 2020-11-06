import { get, throttle, isNull, invoke } from "lodash-es";
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
  const handleMouseDown = (e) => {
    e.preventDefault();
    
    let lastX = null;
    const handleMouseMove = throttle((e) => {
      e.preventDefault();
      if (!isNull(lastX)) {
        if (e.clientX < lastX) {
          invoke(props, 'dragLeft', e);
        } else {
          invoke(props, 'dragRight', e);
        }
      }
      lastX = e.clientX;
    }, 100);

    const handleMouseUp = (e) => {
      e.preventDefault();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return <Vertical
    {...props}
    onMouseDown={handleMouseDown}
  />
}

function DragHandleHorizontal(props) {
  return <Horizontal {...props} />
}

export {
  DragHandleVertical,
  DragHandleHorizontal
};

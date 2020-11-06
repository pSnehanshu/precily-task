import { get, find, findIndex } from "lodash-es";
import styled from "styled-components";
import { DragHandleHorizontal, DragHandleVertical } from "./Handles";
import store from '../store';
import axios from '../axios';

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

  const addContent = () => {
    const newContent = prompt('Write something interesting...');

    if (newContent) {
      axios.post('/add', {
        windowId,
        content: newContent
      }).then(() => store.update(s => {
        const index = findIndex(s.contents, { windowId });
        if (index > -1) {
          s.contents[index].content = newContent;
        } else {
          s.contents.push({ windowId, content: newContent });
        }

        s.counter.add += 1;
      }))
      .catch(err => alert(err.message));
    }
  };

  const updateContent = () => {
    const updatedContent = prompt('Write something interesting...', content);

    if (updatedContent) {
      axios.put('/update', {
        windowId,
        content: updatedContent
      }).then(() => store.update(s => {
        const index = findIndex(s.contents, { windowId });
        if (index > -1) {
          s.contents[index].content = updatedContent;
        }

        s.counter.update += 1;
      }))
      .catch(err => alert(err.message));
    }
  };

  return <Win height={height} width={width}>
    <div>
      {loading ? <b>Loading...</b> : (
        content ? <span>{content}</span> : <b>No content</b>
      )}
    </div>

    <div style={{ marginTop: '10px' }}>
      <button onClick={addContent}>Add content</button>
      {content && <button onClick={updateContent}>Update content</button>}
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

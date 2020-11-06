import { useState } from "react";
import { flow } from "lodash-es";
import WindowBox from './components/WindowBox';

const getPercent = (amount, percent = 100) => (percent / 100) * amount;
const resizeSpeed = 20;
const winW = getPercent(window.innerWidth, 95);
const winH = getPercent(window.innerHeight, 95);

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
        width: s[winid].width + resizeSpeed,
      }
    }));
  };
  const decreaseWidth = (winid) => (e) => {
    setSizes((s) => ({
      ...s,
      [winid]: {
        ...s[winid],
        width: s[winid].width - resizeSpeed,
      }
    }));
  };
  const increaseHeight = (winid) => (e) => {
    setSizes((s) => ({
      ...s,
      [winid]: {
        ...s[winid],
        height: s[winid].height + resizeSpeed,
      }
    }));
  };
  const decreaseHeight = (winid) => (e) => {
    setSizes((s) => ({
      ...s,
      [winid]: {
        ...s[winid],
        height: s[winid].height - resizeSpeed,
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
        <WindowBox
          width={`${sizes.win1.width}px`}
          height={`${sizes.win1.height}px`}
          onIncreaseWidth={win1WidthIncreaseSync}
          onDecreaseWidth={win1WidthDecreaseSync}
          onIncreaseHeight={row1HeightIncreaseSync}
          onDecreaseHeight={row1HeightDecreaseSync}
        />
        <WindowBox
          width={`${sizes.win2.width}px`}
          height={`${sizes.win2.height}px`}
          onIncreaseWidth={win1WidthDecreaseSync}
          onDecreaseWidth={win1WidthIncreaseSync}
          onIncreaseHeight={row1HeightIncreaseSync}
          onDecreaseHeight={row1HeightDecreaseSync}
        />
      </div>
      <div>
        <WindowBox
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

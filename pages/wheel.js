import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import PageHead from 'components/PageHead';
import PageWrapper from 'components/PageWrapper';

const LS_KEY = 'prizes';
const PRIMARY_BTN = 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';
const SECONDARY_BTN = 'py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700';

const WHEEL_STATES = Object.freeze({
  idle: 'idle',
  loading: 'loading',
  spinning: 'spinning',
  needPrizes: 'needPrizes',
  done: 'done',
});

const COLORS = Object.freeze([
  'greenyellow',
  'lightblue',
  'pink',
  'steelblue',
  'springgreen',
  'tan',
  'blueviolet',
  'palegoldenrod',
  'indigo',
  'fuchsia',
  'slategray',
  'darkseagreen',
  'forestgreen',
  'darkred',
  'orange',
  'gold'
]);

const drawIndicator = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const { width } = canvas;
  const centerX = width / 2;

  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'brown';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(centerX - 10, 0);
  ctx.lineTo(centerX + 10, 0);
  ctx.lineTo(centerX, 10);
  ctx.lineTo(centerX - 10 + 1, 0);
  ctx.stroke();
  ctx.fill();
};

const PrizesForm = ({ onComplete }) => {
  const [prizes, setPrizes] = useState([]);
  const [text, setText] = useState('');
  const [percentage, setPercentage] = useState('');

  const addPrize = () => {
    if (!text) return;
    if (typeof percentage === 'number' && (percentage <= 0 || percentage >= 100)) return;

    const newPrizes = [...prizes];
    newPrizes.push({ text, percentage, });
    setText('');
    setPercentage('');
    setPrizes(newPrizes);
  };

  const removePrize = (idx) => {
    const newPrizes = [...prizes];
    newPrizes.splice(idx, 1);
    setPrizes(newPrizes);
  };

  const submit = () => {
    const totalPercentage = prizes.reduce((acc, cur) => {
      const percentage = parseInt(cur.percentage);
      if (!isNaN(percentage)) {
        return acc + percentage;
      }

      return acc;
    }, 0)

    if (totalPercentage > 100 || prizes.length < 2) {
      alert('Invalid. Total percentages must be less than 100 and at least two prizes are required. Please fix and try again.');
      return;
    }

    localStorage.setItem(LS_KEY, JSON.stringify(prizes));
    onComplete();
  };

  return (
    <section>
      <h2 style={{ marginBottom: 20 }}>Choose the "prizes"</h2>
      <table className="table-fixed divide-gray-200 text-left mb-4">
        <thead>
          <tr>
            <th style={{ width: 300 }}>Outcome</th>
            <th>
              Likelihood percentage
              <div className="text-xs"> (optional. leave empty for even distribution)</div>
            </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {prizes.map((prize, idx) => <tr key={idx}>
            <td>{prize.text}</td>
            <td>{prize.percentage}</td>
            <td><button onClick={() => removePrize(idx)}>X</button></td>
          </tr>)}
          <tr>
            <td>
              <input
                className="text-black"
                type="text"
                value={text}
                style={{ width: '97%' }}
                placeholder="Text goes here"
                onChange={({ target }) => setText(target.value)}
              />
            </td>
            <td>
              <input
                className="text-black"
                type="number"
                value={percentage}
                onChange={({ target }) => setPercentage(target.value)}
              />
            </td>

            <td>
              <button
                onClick={addPrize}
                className={`${SECONDARY_BTN} py-2 px-2`}
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <button
        onClick={submit}
        className={PRIMARY_BTN}
      >
        Submit
      </button>
    </section>
  )
};

const Wheel = () => {
  if (typeof window === 'undefined') return <></>;

  const [wheel, setWheel] = useState(null);
  const [hasPrizes, setHasPrizes] = useState(!!localStorage.getItem('prizes'));
  const [wheelState, setWheelState] = useState(WHEEL_STATES.loading);

  const onFinished = (segment) => {
    alert(segment.text);
    setWheelState(WHEEL_STATES.done);
  }

  const spin = () => {
    // Reset wheel
    wheel.stopAnimation(false);
    wheel.rotationAngle = 0;
    wheel.draw();
    drawIndicator();

    // Spin
    setWheelState(WHEEL_STATES.spinning);
    wheel.startAnimation();
  };

  const reset = () => {
    localStorage.removeItem(LS_KEY);
    setHasPrizes(false);
    setWheelState(WHEEL_STATES.needPrizes);
  }

  useEffect(() => {
    if (hasPrizes) {
      setWheelState(WHEEL_STATES.idle);

      (async function() {
        await Promise.resolve({}); // Too lazy to fix this right now
        const prizes = JSON.parse(localStorage.getItem(LS_KEY));
        const segments = prizes.map((prize, idx) => ({
          text: prize.text,
          size: prize.percentage ? window.winwheelPercentToDegrees(prize.percentage) : undefined,
          fillStyle: COLORS[idx % COLORS.length],
        }));

        const winwheel = new window.Winwheel({
          canvasId: 'canvas',
          numSegments: segments.length,
          segments,
          animation: {
            type: 'spinToStop',
            duration: 5,
            spins: 15,
            callbackFinished: onFinished,
            callbackAfter: drawIndicator,
          },
          pointerAngle: 0,
        });
        setWheel(winwheel);
        drawIndicator();
      })();
    } else {
      setWheelState(WHEEL_STATES.needPrizes);
    }
  }, [hasPrizes]);

  if (wheelState === WHEEL_STATES.loading) {
    return <span>Loading...</span>;
  }

  if (wheelState === WHEEL_STATES.needPrizes) {
    return (
      <PrizesForm onComplete={() => setHasPrizes(true)} />
    );
  }

  const areButtonsDisabled = wheelState !== WHEEL_STATES.idle
    && wheelState !== WHEEL_STATES.done;

  return (
    <section>
      <h1>Spin the Wheel</h1>
      <canvas id="canvas" width="800" height="400"></canvas>
      <button
        onClick={spin}
        disabled={areButtonsDisabled}
        className={PRIMARY_BTN}
      >
        Spin!
      </button>
      <button
        onClick={reset}
        disabled={areButtonsDisabled}
        className={SECONDARY_BTN}
      >
        Reset
      </button>
    </section>
  );
};

const Page = () => (
  <PageWrapper>
    <PageHead title="Spin the Wheel" description="It's a wheel. What more do you want?" />
    {/* External dependencies */}
    <Script strategy="beforeInteractive" src="https://cdn.jsdelivr.net/npm/greensock@1.20.2/dist/TweenMax.min.js" />
    <Script strategy="beforeInteractive" src="https://cdn.jsdelivr.net/npm/winwheeljs@2.7.0/dist/Winwheel.min.js" />

    <Wheel />
  </PageWrapper>
)

export default Page;
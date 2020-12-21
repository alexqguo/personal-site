import React, { useEffect, useState } from 'react';

import DefaultLayout from '../layouts/defaultLayout';

const LS_KEY = 'prizes';

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

const addScript = (scriptSrc) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.body.appendChild(script);
  });
};

/**
 * Random libraries.
 * 
 * Including them this way because I want to keep this page as standalone as possible and not
 * end up in a situation where I remove a page from my site but forget to remove its dependencies
 * from package.json
 */
const deps = [
  addScript('https://cdn.jsdelivr.net/npm/greensock@1.20.2/dist/TweenMax.min.js'),
  addScript('https://cdn.jsdelivr.net/npm/winwheeljs@2.7.0/dist/Winwheel.min.js'),
];

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
    
    window.localStorage.setItem(LS_KEY, JSON.stringify(prizes));
    onComplete();
  };

  return (
    <section>
      <h2 style={{ marginBottom: 20 }}>Choose the "prizes"</h2>
      <table style={{ textAlign: 'left' }}>
        <tbody>
          <tr>
            <th style={{ width: 300 }}>Outcome</th>
            <th>
              Likelihood percentage
              <div style={{ fontSize: '.7rem' }}> (optional. leave empty for even distribution)</div>
            </th>
            <th> </th>
          </tr>
          {prizes.map((prize, idx) => <tr key={idx}>
            <td>{prize.text}</td>
            <td>{prize.percentage}</td>
            <td><button onClick={() => removePrize(idx)}>X</button></td>
          </tr>)}
          <tr>
            <td>
              <input
                type="text"
                value={text}
                style={{ width: '97%' }}
                placeholder="Text goes here"  
                onChange={({ target }) => setText(target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                value={percentage}
                onChange={({ target }) => setPercentage(target.value)}
              />
            </td>

            <td><button onClick={addPrize}>Add</button></td>
          </tr>
        </tbody>
      </table>

      <button onClick={submit}>Submit</button>
    </section>
  )
};

const WheelPage = () => {
  const [wheel, setWheel] = useState(null);
  const [hasPrizes, setHasPrizes] = useState(!!window.localStorage.getItem('prizes'));
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
    window.localStorage.removeItem(LS_KEY);
    setHasPrizes(false);
    setWheelState(WHEEL_STATES.needPrizes);
  }

  useEffect(() => {
    if (hasPrizes) {
      (async function() {
        await Promise.all(deps);
        setWheelState(WHEEL_STATES.idle);
  
        const prizes = JSON.parse(window.localStorage.getItem(LS_KEY));
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

  

  const getRenderContent = () => {
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
        <button disabled={areButtonsDisabled} onClick={spin}>Spin!</button>
        <button disabled={areButtonsDisabled} onClick={reset}>Reset</button>
      </section>
    );
  }

  return (
    <DefaultLayout title="Raheed's Wheel">
      {getRenderContent()}
    </DefaultLayout>
  );
};

export default WheelPage;
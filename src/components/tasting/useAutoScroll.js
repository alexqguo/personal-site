import { useState, useEffect, useRef } from "react";

const SPEED = 10; // px/sec
const PAUSE_MS = 5000;
// full slop code
// behavior- given a ref, slowly scroll it downwards
// when at the bottom pause for five seconds, then reset
// when starting (or after restting), wait five seconds before scrolling begins
export default function useAutoScroll(scrollRef) {
  const [scrolling, setScrolling] = useState(false);
  const animFrameRef = useRef(null);
  const prevTimestampRef = useRef(null);
  const subpixelRef = useRef(0);
  const resumeAtRef = useRef(0);
  const jumpPendingRef = useRef(false);

  useEffect(() => {
    if (!scrolling) {
      cancelAnimationFrame(animFrameRef.current);
      prevTimestampRef.current = null;
      subpixelRef.current = 0;
      resumeAtRef.current = 0;
      jumpPendingRef.current = false;
      return;
    }
    const step = (ts) => {
      if (!prevTimestampRef.current) {
        prevTimestampRef.current = ts;
        resumeAtRef.current = ts + PAUSE_MS;
      }
      const elapsed = ts - prevTimestampRef.current;
      prevTimestampRef.current = ts;

      const el = scrollRef.current;
      if (el) {
        if (ts < resumeAtRef.current) {
          // pausing — do nothing
        } else if (jumpPendingRef.current) {
          // bottom pause expired: jump to top, pause again
          el.scrollTop = 0;
          subpixelRef.current = 0;
          jumpPendingRef.current = false;
          resumeAtRef.current = ts + PAUSE_MS;
        } else if (el.scrollTop + el.clientHeight >= el.scrollHeight - 1) {
          // hit bottom: start bottom pause
          jumpPendingRef.current = true;
          resumeAtRef.current = ts + PAUSE_MS;
        } else {
          subpixelRef.current += (SPEED * elapsed) / 1000;
          const whole = Math.floor(subpixelRef.current);
          if (whole > 0) {
            el.scrollTop += whole;
            subpixelRef.current -= whole;
          }
        }
      }
      animFrameRef.current = requestAnimationFrame(step);
    };
    animFrameRef.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      prevTimestampRef.current = null;
    };
  }, [scrolling, scrollRef]);

  return [scrolling, setScrolling];
}

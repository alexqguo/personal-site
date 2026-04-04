import React, { useState } from "react";
import { AD_POOL } from "./adData";

export default function Ad() {
  const [ad] = useState(
    () => AD_POOL[Math.floor(Math.random() * AD_POOL.length)],
  );
  return (
    <div className={`g-ad g-ad-${ad.id}`}>
      <div className={`g-ad-headline${ad.headlineBlink ? " g-blink" : ""}`}>
        {ad.headline}
      </div>
      {ad.lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      {ad.link && <div className="g-ad-link">{ad.link}</div>}
      {ad.disclaimer && <div className="g-ad-disclaimer">{ad.disclaimer}</div>}
    </div>
  );
}

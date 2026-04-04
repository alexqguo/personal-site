import React, { useState } from "react";
import { BANNER_POOL } from "./adData";

export default function AdBanner({ className = "" }) {
  const [banner] = useState(
    () => BANNER_POOL[Math.floor(Math.random() * BANNER_POOL.length)],
  );
  return (
    <div className={`g-banner${banner.pulse ? " g-pulse" : ""} ${className}`.trim()}>
      {banner.text}
    </div>
  );
}

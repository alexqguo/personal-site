import React, { useState } from "react";
import { TAG_DESCRIPTIONS } from "./tastingData";

export default function TagPill({ tag }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const description = TAG_DESCRIPTIONS[tag];

  return (
    <span
      className="__tag-pill"
      onMouseEnter={() => description && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {tag}
      {showTooltip && description && (
        <div className="__tag-tooltip">
          <div className="__tag-tooltip-inner">{description}</div>
        </div>
      )}
    </span>
  );
}

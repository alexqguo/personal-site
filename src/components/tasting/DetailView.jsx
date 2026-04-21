import React, { useState, useEffect, useRef } from "react";
import { formatDate, DEFAULT_YOUTUBE_ID } from "./tastingData";
import Ad from "./gutter/Ad";
import useAutoScroll from "./useAutoScroll";

const GUTTER_YOUTUBE_ID = "UlJHCyUyXCg";

export default function DetailView({ episode, onClose, gutterMode }) {
  const [layout, setLayout] = useState(() =>
    window.innerWidth < 768 ? "bottom" : "sidebar",
  );
  const textContainerRef = useRef(null);
  const [scrolling, setScrolling] = useAutoScroll(textContainerRef);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const videoId = gutterMode
    ? GUTTER_YOUTUBE_ID
    : episode.frontmatter.youtubeId || DEFAULT_YOUTUBE_ID;
  const iframeSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&rel=0&modestbranding=1&controls=0&mute=0`;

  const overlayClass = `__dv-overlay layout-${layout}`;
  const panelClass = `__dv-panel __dv-panel--${layout}`;

  return (
    <div className={overlayClass} data-gutter={gutterMode ? "true" : undefined}>
      <div className="__dv-video">
        <iframe
          src={iframeSrc}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <div className={panelClass}>
        <div className="__dv-panel-inner">
          <div className="__dv-top-bar">
            <button className="__dv-back-btn" onClick={onClose}>
              ← Back
            </button>
            <div className="__dv-layout-toggle">
              <button
                className={`__dv-lt-btn ${scrolling ? "active" : ""}`}
                onClick={() => setScrolling((s) => !s)}
              >
                {scrolling ? "⏸" : "⏵"}
              </button>
              <button
                className={`__dv-lt-btn ${layout === "sidebar" ? "active" : ""}`}
                onClick={() => setLayout("sidebar")}
              >
                ◨
              </button>
              <button
                className={`__dv-lt-btn ${layout === "bottom" ? "active" : ""}`}
                onClick={() => setLayout("bottom")}
              >
                ⬓
              </button>
            </div>
          </div>

          <div className="__dv-content">
            <div className="__dv-info-col">
              <div className="__dv-badge">
                Episode {String(episode.sequentialNum).padStart(2, "0")}
              </div>
              <div className="__dv-title">{episode.frontmatter.title}</div>
              {episode.frontmatter.subtitle && (
                <div className="__dv-subtitle">
                  {episode.frontmatter.subtitle}
                </div>
              )}
              <div className="__dv-meta">
                {formatDate(episode.frontmatter.date)} ·{" "}
                {episode.frontmatter.location}
              </div>
              {gutterMode && (
                <div className="__dv-ads">
                  <Ad />
                  <Ad />
                </div>
              )}
            </div>
            <hr className="__dv-divider" />
            <div className="__dv-desc-col" ref={textContainerRef}>
              <div className="__dv-desc __tasting-post">
                <episode.Component />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

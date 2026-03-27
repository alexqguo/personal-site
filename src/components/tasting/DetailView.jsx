import React, { useState, useEffect } from "react";
import { formatDate, DEFAULT_YOUTUBE_ID } from "./tastingData";

export default function DetailView({ episode, onClose }) {
  const [layout, setLayout] = useState("a");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const videoId = episode.frontmatter.youtubeId || DEFAULT_YOUTUBE_ID;
  const iframeSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&rel=0&modestbranding=1&controls=0&mute=0`;

  const overlayClass = `__dv-overlay ${layout === "b" ? "layout-b" : "layout-a"}`;
  const panelClass = `__dv-panel ${layout === "b" ? "__dv-panel--bottom" : "__dv-panel--sidebar"}`;

  return (
    <div className={overlayClass}>
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
                className={`__dv-lt-btn ${layout === "a" ? "active" : ""}`}
                onClick={() => setLayout("a")}
              >
                ⬜ Sidebar
              </button>
              <button
                className={`__dv-lt-btn ${layout === "b" ? "active" : ""}`}
                onClick={() => setLayout("b")}
              >
                ▬ Bottom
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
            </div>
            <hr className="__dv-divider" />
            <div className="__dv-desc-col">
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

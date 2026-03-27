import React from "react";
import TagPill from "./TagPill";
import { formatDate } from "./tastingData";

export default function EpisodeRow({ episode, onClick }) {
  const { sequentialNum, frontmatter } = episode;
  const tags = frontmatter.tags || [];

  return (
    <div className="__ep-row" onClick={onClick}>
      <span className="__ep-num">
        {String(sequentialNum).padStart(2, "0")}
      </span>
      <div className="__ep-body">
        <div className="__ep-title">
          {frontmatter.title}
          {frontmatter.subtitle && (
            <span className="__ep-subtitle"> — {frontmatter.subtitle}</span>
          )}
        </div>
        <div className="__ep-foot">
          <span className="__ep-meta">
            {formatDate(frontmatter.date)} · {frontmatter.location}
          </span>
          {tags.length > 0 && (
            <div className="__ep-tags">
              {tags.map((tag) => (
                <TagPill key={tag} tag={tag} />
              ))}
            </div>
          )}
        </div>
      </div>
      <span className="__ep-arrow">›</span>
    </div>
  );
}

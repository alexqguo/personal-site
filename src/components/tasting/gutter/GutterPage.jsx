import React, { useState } from "react";
import Ad from "./Ad";
import AdBanner from "./AdBanner";
import { formatDate } from "../tastingData";
import "./gutter.css";

const MARQUEE_TEXT =
  "🍷 SEASON 3 NOW LIVE · CLICK ANY EPISODE TO WATCH · NEW EPISODES EVERY SEASON · JOIN US FOR THE NEXT TASTING ·";

function randomVisitorCount() {
  return (Math.floor(Math.random() * 8000) + 12000).toLocaleString();
}

export default function GutterPage({ episodes, onEpisodeClick }) {
  const [visitors] = useState(randomVisitorCount);

  return (
    <div className="g-wrap">
      <div className="g-header">
        <div>
          <div className="g-title">Tasting Series</div>
          <div className="g-marquee-wrap">
            <span className="g-marquee">{MARQUEE_TEXT}</span>
          </div>
        </div>
        <div className="g-visitor">
          <div>Visitors Today:</div>
          <b>{visitors}</b>
        </div>
      </div>

      <div className="g-left-col">
        <Ad />
        <Ad />
        <Ad />
        <Ad />
      </div>

      <div className="g-center-col">
        <AdBanner />

        <p className="g-tagline">
          Welcome! The Tasting Series is where we drink random alcohols. We're
          having a good time so come join us and see.
        </p>

        <div className="g-sponsors-box">
          <div className="g-sponsors-head">★ Official Sponsors ★</div>
          <div className="g-sc-row">
            <span className="g-sc-label">GOLD:</span>
            {[
              "Shana L",
              "Dave S",
              "Pinghao Q",
              "Nancy H",
              "Raheed A",
              "JT A",
              "Ben H",
              "Gandherva GT",
              "Andrew S",
              "Alex V",
              "Vikas G",
            ].map((n) => (
              <span key={n} className="g-sc-pill g-sc-gold">
                {n}
              </span>
            ))}
          </div>
          <div className="g-sc-row">
            <span className="g-sc-label">SILVER:</span>
            {["Ishan P", "Alberto N", "Sean P"].map((n) => (
              <span key={n} className="g-sc-pill g-sc-silver">
                {n}
              </span>
            ))}
          </div>
          <div className="g-sc-row">
            <span className="g-sc-label">BRONZE:</span>
            {["Dillon C", "Akshay N"].map((n) => (
              <span key={n} className="g-sc-pill g-sc-bronze">
                {n}
              </span>
            ))}
          </div>
        </div>

        <table className="g-ep-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Episode</th>
              <th>Subtitle</th>
              <th>Date / Location</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((ep) => (
              <tr key={ep.id} onClick={() => onEpisodeClick(ep)}>
                <td className="g-ep-num">
                  {String(ep.sequentialNum).padStart(2, "0")}
                </td>
                <td className="g-ep-title">
                  <a>{ep.frontmatter.title}</a>
                  {(ep.frontmatter.tags || []).map((tag) => (
                    <span key={tag} className="g-ep-tag">
                      {tag}
                    </span>
                  ))}
                </td>
                <td className="g-ep-sub">{ep.frontmatter.subtitle}</td>
                <td className="g-ep-meta">
                  {formatDate(ep.frontmatter.date)} · {ep.frontmatter.location}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="g-right-col">
        <Ad />
        <Ad />
        <Ad />
        <Ad />
      </div>

      <div className="g-bottom-banner">
        ⭐ BEST TASTING SERIES BLOG ON THE INTERNET — ATTENDED BY OVER 10,000
        WINE LOVERS ⭐
      </div>
    </div>
  );
}

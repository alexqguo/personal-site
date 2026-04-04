import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHead from "../components/PageHead";
import "../components/tasting/tasting.css";
import { episodes } from "../components/tasting/tastingData";
import SponsorCards from "../components/tasting/SponsorCards";
import EpisodeRow from "../components/tasting/EpisodeRow";
import DetailView from "../components/tasting/DetailView";

export default function TastingSeries() {
  const location = useLocation();
  const navigate = useNavigate();

  const hashNum = location.hash.startsWith("#e")
    ? parseInt(location.hash.slice(2), 10)
    : null;
  const selectedEpisode = Number.isFinite(hashNum)
    ? (episodes.find((ep) => ep.sequentialNum === hashNum) ?? null)
    : null;

  return (
    <>
      <PageHead
        title="Tasting Atelier"
        description="Exploration of typically affordable beverages"
      />

      {selectedEpisode && (
        <DetailView
          episode={selectedEpisode}
          onClose={() => navigate(-1)}
        />
      )}

      <div className="__tasting-list">
        <h1>Tasting Atelier</h1>
        <p className="__tasting-tagline">
          Welcome! The Tasting Atelier is an ongoing series of curated tasting
          events, exploring the world of adult beverages through a unique lense.
          You'll just have to join us to see what I mean.
        </p>

        <SponsorCards />

        {episodes.map((ep) => (
          <EpisodeRow
            key={ep.id}
            episode={ep}
            onClick={() => navigate(`#e${ep.sequentialNum}`)}
          />
        ))}
      </div>

      <footer>
        Written content within The Tasting Atelier is 100% human generated!
      </footer>
    </>
  );
}

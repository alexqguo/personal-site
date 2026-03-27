import React, { useState } from "react";
import PageHead from "../components/PageHead";
import "../components/tasting/tasting.css";
import { episodes } from "../components/tasting/tastingData";
import SponsorCards from "../components/tasting/SponsorCards";
import EpisodeRow from "../components/tasting/EpisodeRow";
import DetailView from "../components/tasting/DetailView";

export default function TastingSeries() {
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  return (
    <>
      <PageHead
        title="Tasting Atelier"
        description="Exploration of typically affordable beverages"
      />

      {selectedEpisode && (
        <DetailView
          episode={selectedEpisode}
          onClose={() => setSelectedEpisode(null)}
        />
      )}

      <div className="__tasting-list">
        <h1>Tasting Atelier</h1>
        <p className="__tasting-tagline">
          Welcome! Tasting Atelier is an ongoing series of curating and
          inclusive tasting experiences for exploring flavor, craft, and
          connection with others. Come join us to deepen your appreciation for
          the artistry behind what you taste and enjoy moments of shared
          discovery!
        </p>

        <SponsorCards />

        {episodes.map((ep) => (
          <EpisodeRow
            key={ep.id}
            episode={ep}
            onClick={() => setSelectedEpisode(ep)}
          />
        ))}
      </div>
    </>
  );
}

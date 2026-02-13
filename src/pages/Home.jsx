import React, { useState, useRef } from "react";
import PageHead from "../components/PageHead";
import "./home.css";

const TOTAL_CARDS = 12;

const Card = ({ card, index, isResetting }) => {
  const isDrawn = card.isDrawn;
  const isJustDrawn = card.isJustDrawn;

  return (
    <div
      className={`card-container ${isDrawn ? "flipped" : ""} ${isJustDrawn ? "animating" : ""} ${isResetting ? "resetting" : ""}`}
      style={{
        "--draw-index": index,
      }}
    >
      <div className="card">
        <div className="card-face card-back">
          <div className="card-pattern" />
        </div>
        <div className="card-face card-front">
          <div className="card-content">Card {card.id}</div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [cards, setCards] = useState(() =>
    Array.from({ length: TOTAL_CARDS }, (_, i) => ({
      id: i + 1,
      isDrawn: false,
      isJustDrawn: false,
    })),
  );
  const [drawnCount, setDrawnCount] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const drawnCardIds = useRef(new Set());

  const drawCard = () => {
    const nextUndrawn = cards.findIndex((c) => !c.isDrawn);
    if (nextUndrawn === -1) return;

    const cardId = cards[nextUndrawn].id;
    drawnCardIds.current.add(cardId);
    setIsDrawing(true);

    setCards((prev) => {
      const next = [...prev];
      next[nextUndrawn] = {
        ...next[nextUndrawn],
        isDrawn: true,
        isJustDrawn: true,
      };
      return next;
    });
    setDrawnCount((prev) => prev + 1);

    // Re-enable hover after a brief delay
    setTimeout(() => {
      setIsDrawing(false);
    }, 300);

    // Clear isJustDrawn after animation completes
    setTimeout(() => {
      setCards((prev) => {
        const next = [...prev];
        const idx = next.findIndex((c) => c.id === cardId);
        if (idx !== -1) {
          next[idx] = { ...next[idx], isJustDrawn: false };
        }
        return next;
      });
    }, 1000);
  };

  const [isResetting, setIsResetting] = useState(false);

  const reset = () => {
    setIsResetting(true);
    setTimeout(() => {
      setCards(
        Array.from({ length: TOTAL_CARDS }, (_, i) => ({
          id: i + 1,
          isDrawn: false,
          isJustDrawn: false,
        })),
      );
      setDrawnCount(0);
      drawnCardIds.current.clear();
      setIsResetting(false);
    }, 600);
  };

  const drawnCards = cards.filter((c) => c.isDrawn);
  const hasCardsRemaining = drawnCount < TOTAL_CARDS;

  return (
    <>
      <PageHead
        title="Alex Guo"
        description="Something something personal website"
      />
      <div className="deck-page">
        <div className="deck-area">
          {hasCardsRemaining && (
            <div
              className={`deck-stack ${isDrawing ? "drawing" : ""}`}
              onClick={drawCard}
            >
              {cards
                .filter((c) => !c.isDrawn)
                .map((card, i) => (
                  <div
                    key={card.id}
                    className="deck-card"
                    style={{ "--stack-index": i }}
                  >
                    <div className="card-face card-back">
                      <div className="card-pattern" />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {drawnCards.length > 0 && (
          <div className="drawn-cards-area">
            {drawnCards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                isResetting={isResetting}
              />
            ))}
          </div>
        )}

        {/* <button onClick={reset} className="reset-btn">
          Reset
        </button>*/}
      </div>
    </>
  );
}

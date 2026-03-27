import React from "react";

export default function SponsorCards() {
  return (
    <div>
      <div className="__sponsors-label">Sponsors</div>
      <div className="__sponsor-cards">
        <div className="__sc __sc-gold">
          <div className="__sc-label">Gold</div>
          <div className="__sc-names">
            Shana L · Dave S · Pinghao Q · Nancy H · Raheed A · JT A · Ben H ·
            Gandherva GT · Andrew S · Alex V · Vikas G
          </div>
        </div>
        <div className="__sc __sc-silver">
          <div className="__sc-label">Silver</div>
          <div className="__sc-names">Ishan P · Alberto N · Sean P</div>
        </div>
        <div className="__sc __sc-bronze">
          <div className="__sc-label">Bronze</div>
          <div className="__sc-names">Dillon C · Akshay N</div>
        </div>
      </div>
    </div>
  );
}

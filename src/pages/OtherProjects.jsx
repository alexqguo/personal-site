import React from "react";
import PageHead from "../components/PageHead";

const featured = {
  title: "The DBG",
  href: "https://drink.alexguo.co",
  repoLink: "https://github.com/alexqguo/yoyoza-games",
  description:
    "A formalized collection and refactor of all prior drinking game projects — the definitive version of an ongoing series spanning four major rewrites. Built for real remote play with friends.",
};

const projects = [
  {
    num: "01",
    title: "Pizza Box Game",
    href: "https://pizza.alexguo.co",
    repoLink: "https://github.com/alexqguo/pizza-box-game",
    description: "Online drinking game based off a Reddit comment",
    tag: "Drinking Games",
  },
  {
    num: "02",
    title: "Drinking Board Game v1",
    href: "https://v1.drink.alexguo.co",
    repoLink: "https://github.com/alexqguo/drinking-board-game",
    description: "Generalized engine for playing drinking board games online",
    tag: "Drinking Games",
    deprecated: false,
  },
  {
    num: "03",
    title: "Drinking Board Game v2",
    href: "https://github.com/alexqguo/drinking-board-game-v2",
    repoLink: "https://github.com/alexqguo/drinking-board-game-v2",
    description: "Better remote play with Firebase",
    tag: "Drinking Games",
    deprecated: true,
  },
  {
    num: "04",
    title: "Drinking Board Game v3",
    href: "https://github.com/alexqguo/drinking-board-game-v3",
    repoLink: "https://github.com/alexqguo/drinking-board-game-v3",
    description: "Multi-tenant, modular architecture",
    tag: "Drinking Games",
    deprecated: true,
  },
  {
    num: "05",
    title: "Sorting Algo Visualizer",
    href: "https://js-ol3vti.stackblitz.io",
    repoLink: "https://github.com/alexqguo/proxy-example",
    description:
      "Algorithm visualization + audio using JS Proxy objects. Inspired by that YouTube video.",
    tag: "Dev",
  },
  {
    num: "06",
    title: "Sunroom Dashboard",
    href: "/sunroom",
    repoLink: null,
    description:
      "DHT22 sensor + Raspberry Pi comparing sunroom vs. outside temperatures",
    tag: "Hardware",
  },
];

export default function OtherProjects() {
  return (
    <>
      <PageHead
        title="Other Projects"
        description="Other things I've worked on"
      />

      <div className="-mx-6 -mt-4 px-6 pb-20 min-h-screen">
        <div className="max-w-[960px] mx-auto pt-10">
          {/* Masthead */}
          <div className="border-t-4 border-[#1a1a1a] border-b border-b-[#1a1a1a] py-4 mb-10 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
            <h1
              className="font-serif text-[48px] sm:text-[56px] font-bold leading-none text-[#1a1a1a]"
              style={{ letterSpacing: "-2px" }}
            >
              Projects
            </h1>
            <p className="text-[11px] tracking-[0.15em] uppercase text-[#666] sm:border-l sm:border-[#ccc] sm:pl-6 leading-relaxed">
              Personal work &amp; side experiments
              <br />
              Alex Guo
            </p>
          </div>

          {/* Featured */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-[#1a1a1a] mb-8">
            <div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#c0392b] font-semibold mb-2.5">
                ● Featured &nbsp;·&nbsp; Drinking Games
              </div>
              <h2 className="font-serif text-[28px] md:text-[36px] leading-[1.1] text-[#1a1a1a] mb-3">
                <a
                  href={featured.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  {featured.title}
                </a>
              </h2>
              <p className="text-[15px] leading-relaxed text-[#444]">
                {featured.description}
              </p>
              <div className="text-[11px] text-[#888] mt-3">
                <a
                  href={featured.repoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#1a1a1a] transition-colors"
                >
                  View repo →
                </a>
              </div>
            </div>
            <div className="hidden md:flex bg-[#e8e0d0] rounded-sm items-center justify-center text-[72px] select-none">
              🍺
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {projects.map((p, i) => {
              const showRightBorder = (i + 1) % 3 !== 0;
              const showTopBorder = i >= 3;
              const showMobileTopBorder = i > 0;
              return (
                <div
                  key={p.title}
                  className={[
                    "py-5 px-5",
                    // mobile: top border on all but first
                    showMobileTopBorder
                      ? "max-md:border-t max-md:border-t-[#d0ccc4]"
                      : "",
                    // desktop: right border for non-last-in-row
                    showRightBorder ? "md:border-r md:border-r-[#d0ccc4]" : "",
                    // desktop: top border for second row
                    showTopBorder ? "md:border-t md:border-t-[#d0ccc4]" : "",
                  ].join(" ")}
                >
                  <div className="text-[10px] tracking-[0.15em] text-[#bbb] mb-1.5">
                    {p.num}
                  </div>
                  <div className="text-[9px] tracking-[0.12em] uppercase font-semibold mb-1.5">
                    <span className="text-[#c0392b]">{p.tag}</span>
                    {p.deprecated && (
                      <span className="text-[#aaa] font-normal ml-1.5">
                        · deprecated
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-[18px] leading-snug text-[#1a1a1a] mb-1.5">
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      {p.title}
                    </a>
                  </h3>
                  <p className="text-[13px] text-[#666] leading-relaxed">
                    {p.description}
                  </p>
                  {p.repoLink && (
                    <div className="mt-2">
                      <a
                        href={p.repoLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-[#888] border-b border-[#ddd] pb-px hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-colors"
                      >
                        {p.repoLink.replace("https://github.com/", "github/")} →
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

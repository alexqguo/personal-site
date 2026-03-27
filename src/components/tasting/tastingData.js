const tastingModules = import.meta.glob("../../mdx/tasting/*.mdx", {
  eager: true,
});

const DEFAULT_YOUTUBE_ID = "mSX3OyW9Rao";

// Tag descriptions — configurable here, not tied to MDX files
const TAG_DESCRIPTIONS = {
  Wine: "The original season. Exploring the wide world of budget wines — from box wine to bum wine, we tasted them all so you don't have to.",
  "Malt Liquor":
    "Technically speaking, many different drinks are made with malted barley. However, what we focused on is malt liquor — beverages that utilize corn or sugar during brewing to increase alcohol percentage, with flavors added on top.",
  "Spiked Seltzers":
    "A year ago, this would never have happened. But with where the spiked seltzer industry was, there was no better choice for the theme of Season Three. So enjoy and taste responsibly!",

};

function formatDate(dateStr) {
  // Handle non-zero-padded dates like "2018-1-12" by splitting and reconstructing
  const parts = dateStr.split("-");
  const year = parts[0];
  const month = parts[1].padStart(2, "0");
  const day = parts[2].padStart(2, "0");
  return new Date(`${year}-${month}-${day}T12:00:00`).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
}

function processEpisodes() {
  const episodes = [];

  for (const [path, module] of Object.entries(tastingModules)) {
    const filename = path.split("/").pop().replace(".mdx", "");
    const [seasonStr, episodeStr] = filename.split("_");
    const season = Number(seasonStr);
    const episode = Number(episodeStr);

    if (episode === 0) continue;

    episodes.push({
      id: filename,
      season,
      episode,
      frontmatter: module.frontmatter,
      Component: module.default,
    });
  }

  episodes.sort((a, b) =>
    a.season !== b.season ? a.season - b.season : a.episode - b.episode
  );
  episodes.forEach((ep, i) => {
    ep.sequentialNum = i + 1;
  });

  return episodes;
}

const episodes = processEpisodes();

export { episodes, DEFAULT_YOUTUBE_ID, TAG_DESCRIPTIONS, formatDate };

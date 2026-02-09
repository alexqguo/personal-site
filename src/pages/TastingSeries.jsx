import React from 'react';
import PageHead from '../components/PageHead';

const tastingPosts = import.meta.glob('../mdx/tasting/*.mdx', { eager: true });

const formatFrontmatterDate = (dateStr) => (
  new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
);

const Post = ({ frontMatter, children, id, episode }) => {
  if (episode === 0) {
    return (
      <section id={id} className="__tasting-post mb-8">
        <h2>{frontMatter.title}</h2>
        {children}
      </section>
    );
  }

  return (
    <section id={id} className="__tasting-post mb-8">
      <h3>{frontMatter.title}</h3>
      {frontMatter.subtitle ? (
        <div className="text-lg italic text-gray-700 dark:text-gray-300">{frontMatter.subtitle}</div>
      ) : null}

      {children}
      <span className="text-xs">
        {formatFrontmatterDate(frontMatter.date)} - {frontMatter.location}
      </span>
    </section>
  );
};

const TOC = ({ postsBySeason }) => (
  <ul className="mb-8">
    {Object.keys(postsBySeason).map(seasonNumber => (
      <TOCSeason key={`s-${seasonNumber}`} posts={postsBySeason[seasonNumber]} />
    ))}
  </ul>
);

const TOCSeason = ({ posts }) => {
  const season = posts[0];
  const episodes = posts.slice(1);

  return (
    <li>
      <a href={`#${season.id}`}>{season.frontMatter.title}</a>
      <ul>
        {episodes.map(episode => (
          <li className="ml-4 text-sm" key={episode.id}>
            <a href={`#${episode.id}`}>
              {episode.season}.{episode.episode}{' '}
              {episode.frontMatter.title}
              {episode.frontMatter.subtitle && ` -- ${episode.frontMatter.subtitle}`}
            </a>
          </li>
        ))}
      </ul>
    </li>
  )
};

export default function TastingSeries() {
  const posts = Object.entries(tastingPosts).map(([path, module]) => {
    const filename = path.split('/').pop();
    const id = filename.replace('.mdx', '');
    const seasonEpisode = id.split('_');
    const Component = module.default;

    return {
      id,
      Component,
      frontMatter: module.frontmatter,
      season: Number(seasonEpisode[0]),
      episode: Number(seasonEpisode[1]),
    };
  });

  const postsBySeason = posts.reduce((acc, cur) => {
    if (!acc[cur.season]) acc[cur.season] = [];
    acc[cur.season].push(cur);
    return acc;
  }, {});

  return (
    <>
      <PageHead
        title="Tasting Series"
        description="Exploration of typically affordable beverages"
      />

      <h1>The Tasting Series</h1>
      <p>
        Welcome! This page is still under construction. A description will be put here shortly.
      </p>

      <section className="mb-4 text-sm">
        <h4>Sponsors</h4>
        <ul>
          <li>
            <strong className="text-yellow-400">Gold: </strong>Shana L, Dave S, Pinghao Q, Nancy H, Raheed A, JT A, Ben H, Gandherva GT, Andrew S, Alex V, Vikas G
          </li>
          <li>
            <strong className="text-gray-400">Silver: </strong>Ishan P, Alberto N, Sean P
          </li>
          <li>
            <strong className="text-orange-600">Bronze: </strong>Dillon C, Akshay N
          </li>
        </ul>
      </section>

      <TOC postsBySeason={postsBySeason} />

      {posts.map((post) => (
        <Post {...post} key={post.id}>
          <post.Component />
        </Post>
      ))}
    </>
  );
}

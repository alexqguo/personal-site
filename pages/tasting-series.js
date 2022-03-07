import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

import PageHead from 'components/PageHead';
import PageWrapper from 'components/PageWrapper';

const formatFrontmatterDate = (dateStr) => (
  new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
);

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('mdx/tasting'));
  const postPromises = files.map(async (filename) => {
    const markdownWithMeta = fs.readFileSync(path.join('mdx/tasting', filename), 'utf-8');
    const { data: frontMatter, content } = matter(markdownWithMeta);
    const mdxSource = await serialize(content);
    const id = filename.split('.')[0];
    const seasonEpisode = id.split('_');

    return {
      id,
      mdxSource,
      frontMatter,
      season: Number(seasonEpisode[0]),
      episode: Number(seasonEpisode[1]),
    };
  });

  const posts = await Promise.all(postPromises);
  const postsBySeason = posts.reduce((acc, cur) => {
    if (!acc[cur.season]) acc[cur.season] = [];
    acc[cur.season].push(cur); // These should already be ordered if the filenames are correct

    return acc;
  }, {});

  return {
    props: {
      posts,
      postsBySeason,
    },
  };
};

const Post = ({
  frontMatter,
  mdxSource,
  id,
  episode,
}) => {
  if (episode === 0) {
    return (
      <section id={id} className="__tasting-post mb-8">
        <h2>{frontMatter.title}</h2>
        <MDXRemote {...mdxSource} />
      </section>
    )
  };

  return (
    <section id={id} className="__tasting-post mb-8">
      <h3>{frontMatter.title}</h3>
      {frontMatter.subtitle ? (
        <div className="text-lg italic text-gray-700 dark:text-gray-300">{frontMatter.subtitle}</div>
      ) : null}

      <MDXRemote {...mdxSource} />
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

const TOCSeason = ({
  posts
}) => {
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

const Tasting = ({
  posts,
  postsBySeason,
}) => {
  return (
    <PageWrapper>
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
            <strong className="text-yellow-400">Gold: </strong>Shana L, Dave S, Pinghao Q, Nancy H, Raheed A, JT A, Ben H, Gandherva GT, Andrew S
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
        <Post {...post} key={post.id} />
      ))}
    </PageWrapper>
  );
};

export default Tasting;
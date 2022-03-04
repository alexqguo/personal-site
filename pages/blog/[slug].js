import React from 'react';
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import PageHead from 'components/PageHead';
import PageWrapper from 'components/PageWrapper';

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('mdx/blog'));
  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }));

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(path.join('mdx/blog', `${slug}.mdx`), 'utf-8');
  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);

  return {
    props: {
      frontMatter,
      slug,
      mdxSource
    }
  }
}

export default ({ frontMatter, mdxSource }) => (
  <PageWrapper>
    <PageHead title={frontMatter.title} />
    <h1>{frontMatter.title}</h1>

    <MDXRemote {...mdxSource} />
  </PageWrapper>
);
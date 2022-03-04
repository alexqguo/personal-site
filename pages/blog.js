import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

import PageHead from 'components/PageHead';
import PageWrapper from 'components/PageWrapper';

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('mdx/blog'));
  const posts = files.map(filename => {
    const markdownWithMeta = fs.readFileSync(path.join('mdx/blog', filename), 'utf-8');
    const { data: frontMatter } = matter(markdownWithMeta);
    return {
      frontMatter,
      slug: `${filename.split('.')[0]}`,
    };
  });

  return {
    props: { posts },
  };
}

export default ({ posts }) => {
  const dateFormatOptions = {
    year: 'numeric', month: 'long', day: 'numeric',
  };

  return (
    <PageWrapper>
      <PageHead
        title="Blog"
        description="My blog"
      />
      <h1>
        All posts
      </h1>

      <ul className="list-inside list-disc">
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <a className="text-blue-600 visited:text-purple-600">
                {post.frontMatter.title}
              </a>
            </Link>

            <span className="text-sm">
              {' '}
              {new Date(post.frontMatter.date).toLocaleDateString('en-US', dateFormatOptions)}
            </span>
          </li>
        ))}
      </ul>
    </PageWrapper>
  )
};
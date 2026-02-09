import React from 'react';
import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead';

const blogPosts = import.meta.glob('../mdx/blog/*.mdx', { eager: true });

export default function Blog() {
  const posts = Object.entries(blogPosts).map(([path, module]) => {
    const slug = path.split('/').pop().replace('.mdx', '');
    return {
      slug,
      frontMatter: module.frontmatter,
    };
  }).sort((a, b) => new Date(b.frontMatter.date) - new Date(a.frontMatter.date));

  const dateFormatOptions = {
    year: 'numeric', month: 'long', day: 'numeric',
  };

  return (
    <>
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
            <Link to={`/blog/${post.slug}`} className="underline">
              {post.frontMatter.title}
            </Link>

            <span className="text-sm">
              {' '}
              {new Date(post.frontMatter.date).toLocaleDateString('en-US', dateFormatOptions)}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

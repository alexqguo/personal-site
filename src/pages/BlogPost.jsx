import React from 'react';
import { useParams } from 'react-router-dom';
import PageHead from '../components/PageHead';

const blogPosts = import.meta.glob('../mdx/blog/*.mdx', { eager: true });

export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug;

  const post = Object.entries(blogPosts).find(([path]) => {
    return path.includes(`/${slug}.mdx`);
  });

  if (!post) {
    return (
      <>
        <PageHead title="Not Found" />
        <h1>Post not found</h1>
      </>
    );
  }

  const [path, module] = post;
  const Component = module.default;
  const { title, description } = module.frontmatter;

  return (
    <>
      <PageHead title={title} description={description} />
      <h1>{title}</h1>
      <Component />
    </>
  );
}

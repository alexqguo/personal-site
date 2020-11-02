import React from 'react';
import { graphql, Link } from 'gatsby';

import DefaultLayout from '../layouts/defaultLayout';

const PostLink = ({ post }) => (
  <li style={{ marginBottom: 5 }}>
    <Link to={post.frontmatter.slug}>
      {post.frontmatter.title}
    </Link> {post.frontmatter.date}
  </li>
);

const Blog = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const posts = edges
    .map(e => <PostLink key={e.node.id} post={e.node} />);

  return (
    <DefaultLayout>
      <h2 style={{ marginBottom: 10 }}>All posts</h2>

      <ul>
        {posts}
      </ul>
    </DefaultLayout>
  );
};

export default Blog;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
          }
        }
      }
    }
  }
`
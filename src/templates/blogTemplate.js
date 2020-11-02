import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';

import '../styles/blog.css';
import Head from '../components/common/head';

const PageContainer = styled.main`
  padding: 60px;
`;

const Date = styled.div`
  font-size: .8em;
`;

const BlogContents = styled.article`
  margin-top: 30px;
`;

const BackLinkContainer = styled.div`
  font-size: .8em;
  padding-top: 60px;
`;

// https://www.gatsbyjs.com/docs/adding-markdown-pages/
export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;

  return (
    <>
      <Head
        title={frontmatter.title}
        description={frontmatter.description}
        keywords={frontmatter.keywords}
      />
      
      <PageContainer className="blog-post-container">
        <div className="blog-post">
          <h1>{frontmatter.title}</h1>
          <Date>{frontmatter.date}</Date>

          <BlogContents
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
        
        <BackLinkContainer>
          <Link to="/blog">See all posts</Link>
        </BackLinkContainer>
      </PageContainer>
    </>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        description
        keywords
      }
    }
  }
`;
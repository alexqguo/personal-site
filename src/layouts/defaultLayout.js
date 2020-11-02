import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import Head from '../components/common/head';
import Header from '../components/common/header';

const SITE_METADATA_QUERY = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        description
        keywords
      }
    }
  }
`;

const Container = styled.div`
  padding: 40px;
`;

const Layout = ({ children, title, description, keywords }) => (
  <StaticQuery
    query={SITE_METADATA_QUERY}
    render={data => (
      <>
        <Head
          title={title || data.site.siteMetadata.title}
          description={description || data.site.siteMetadata.description}
          keywords={keywords || data.site.siteMetadata.keywords} />

        <Header />

        <Container>
          {children}
        </Container>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

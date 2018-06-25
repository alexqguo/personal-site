import React from 'react';
import PropTypes from 'prop-types';

import Head from '../components/head';
import '../styles/index.css';

const Layout = ({ children, data }) => (
  <div>
    <Head title={data.site.siteMetadata.title}
      description={data.site.siteMetadata.description}
      keywords={data.site.siteMetadata.keywords} />

    {children()}
  </div>
);

Layout.propTypes = {
  children: PropTypes.func,
};

export default Layout;

export const query = graphql`
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

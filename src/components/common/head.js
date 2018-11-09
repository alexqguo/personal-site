import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import favicon from '../../images/favicon.png';

const Head = ({ title, description, keywords }) => (
  <Helmet
    title={title}
    meta={[
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
    ]}
    link={[
      { rel: 'shortcut icon', href: favicon }
    ]}
  >
    <html lang="en" />
  </Helmet>
);

Head.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string.isRequired
};

export default Head;

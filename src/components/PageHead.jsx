import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

const PageHead = ({
  title,
  description,
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Helmet>
);

PageHead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

PageHead.defaultProps = {
  description: '',
};

export default PageHead;

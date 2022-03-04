import React from 'react';
import Head from 'next/head'
import PropTypes from 'prop-types';

const PageHead = ({
  title,
  description,
}) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" href="/favicon.png" />
  </Head>
);

PageHead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default PageHead;
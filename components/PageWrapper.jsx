import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/Nav';

const PageWrapper = ({
  children,
}) => (
  <>
    <Nav />
    <main className="py-4 px-6">
      {children}
    </main>
  </>
);

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageWrapper;
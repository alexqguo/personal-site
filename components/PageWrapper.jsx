import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/Nav';

const PageWrapper = ({
  children,
}) => (
  <div>
    <Nav />
    <main className="py-4 px-6 animate-fade-in">
      {children}
    </main>
  </div>
);

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageWrapper;
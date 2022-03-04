import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/Nav';

const PageWrapper = ({
  children,
}) => (
  <div className="min-h-screen bg-white dark:bg-slate-800">
    <Nav />
    <main className="h-full py-4 px-6 animate-fade-in">
      {children}
    </main>
  </div>
);

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageWrapper;
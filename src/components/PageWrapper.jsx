import React from "react";
import PropTypes from "prop-types";
import Nav from "./Nav";
import { useLocation } from "react-router-dom";

const PageWrapper = ({ children }) => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && <Nav />}
      <main key={location.pathname} className="py-4 px-6 animate-fade-in">
        {children}
      </main>
    </div>
  );
};

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageWrapper;

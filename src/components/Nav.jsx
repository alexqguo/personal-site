import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav className="flex flex-col py-4 px-6 shadow w-full">
    <div>
      <Link to="/" className="__nav-link">Home</Link>
      <Link to="/tasting-series" className="__nav-link">Tasting Series</Link>
      <Link to="/other-projects" className="__nav-link">Other Projects</Link>
    </div>
  </nav>
);

export default Nav;

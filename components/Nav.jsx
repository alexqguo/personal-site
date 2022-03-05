import React from 'react';
import Link from 'next/link';

const Nav = () => (
  <nav className="flex flex-col py-4 px-6 shadow dark:shadow-slate-500 w-full">
    <div>
      <Link href="/">
        <a className="nav-link">Home</a>
      </Link>
      <Link href="/blog">
        <a className="nav-link">Blog</a>
      </Link>
      <Link href="/other-projects">
        <a className="nav-link">Other Projects</a>
      </Link>
    </div>
  </nav>
);

export default Nav;
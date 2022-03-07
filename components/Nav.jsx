import React from 'react';
import Link from 'next/link';

const Nav = () => (
  <nav className="flex flex-col py-4 px-6 shadow dark:shadow-slate-500 w-full">
    <div>
      <Link href="/">
        <a className="__nav-link">Home</a>
      </Link>
      <Link href="/blog">
        <a className="__nav-link">Blog</a>
      </Link>
      <Link href="/tasting-series">
        <a className="__nav-link">Tasting Series</a>
      </Link>
      <Link href="/other-projects">
        <a className="__nav-link">Other Projects</a>
      </Link>
    </div>
  </nav>
);

export default Nav;
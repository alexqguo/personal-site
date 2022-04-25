import React from 'react';
import Link from 'next/link';

const Nav = () => (
  <nav className="flex flex-col py-4 px-6 shadow dark:shadow-slate-500 w-full">
    <div>
      <Link href="/">
        <button role="link" className="__nav-link">Home</button>
      </Link>
      <Link href="/tasting-series">
        <button role="link" className="__nav-link">Tasting Series</button>
      </Link>
      <Link href="/other-projects">
        <button role="link" className="__nav-link">Other Projects</button>
      </Link>
    </div>
  </nav>
);

export default Nav;
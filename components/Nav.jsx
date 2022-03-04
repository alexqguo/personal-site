import React from 'react';
import Link from 'next/link';

const Nav = () => (
  <nav className="flex flex-col py-4 px-6 bg-white shadow w-full">
    <div>
      <Link href="/">
        <a className="mr-4">Home</a>
      </Link>
      <Link href="/blog">
        <a className="mr-4">Blog</a>
      </Link>
    </div>
  </nav>
);

export default Nav;
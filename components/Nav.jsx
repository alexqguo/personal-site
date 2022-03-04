import React from 'react';
import Link from 'next/link';

const Nav = () => (
  <nav className="flex flex-col py-4 px-6 shadow dark:shadow-slate-500 w-full">
    <div>
      <Link href="/">
        <a className="mr-4 text-black dark:text-white">Home</a>
      </Link>
      <Link href="/blog">
        <a className="mr-4 text-black dark:text-white">Blog</a>
      </Link>
    </div>
  </nav>
);

export default Nav;
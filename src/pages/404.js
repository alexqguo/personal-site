import React from 'react';
import { Link } from 'gatsby';

import DefaultLayout from '../layouts/defaultLayout';

const NotFoundPage = () => (
  <DefaultLayout>
    <h1>NOT FOUND</h1>
    <p>
      This page does not exist. <Link to="/">Home page</Link>
    </p>
  </DefaultLayout>
);

export default NotFoundPage;

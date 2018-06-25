import React from 'react';
import Helmet from 'react-helmet';

import favicon from '../img/favicon.png';

const Head = ({ title, description, keywords }) => (
  <Helmet
    title={title}
    meta={[
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
    ]}
    link={[
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'preconnect', href: 'https://scontent.cdninstagram.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Titillium+Web:300' },
      { rel: 'shortcut icon', href: favicon },
    ]}
  />
);

export default Head;

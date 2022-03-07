import React, { useState, useEffect } from 'react';
import PageHead from 'components/PageHead';
import PageWrapper from 'components/PageWrapper';

export default () => {
  const [greeting, setGreeting] = useState(null);

  useEffect(() => {
    const date = new Date();

    if (date.getHours() >= 12 && date.getHours() <= 16) {
      setGreeting('Good afternoon');
    } else if (date.getHours() >= 5 && date.getHours() <= 11) {
      setGreeting('Good morning');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  return (
    <PageWrapper>
      <PageHead
        title="Alex Guo"
        description="Something something personal website"
      />
      <h1>
        {greeting}
      </h1>
    </PageWrapper>
  )
};
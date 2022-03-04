import React from 'react';
import PageHead from 'components/PageHead';
import PageWrapper from 'components/PageWrapper';

export default () => {
  const getGreeting = () => {
    const date = new Date();

    if (date.getHours() >= 12 && date.getHours() <= 16) {
      return 'Good afternoon';
    } else if (date.getHours() >= 5 && date.getHours() <= 11) {
      return 'Good morning';
    } else {
      return 'Good evening';
    }
  };

  return (
    <PageWrapper>
      <PageHead
        title="Alex Guo"
        description="Something something personal website"
      />
      <h1>
        {getGreeting()}
      </h1>
    </PageWrapper>
  )
};
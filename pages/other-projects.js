import React from 'react';
import Card from 'components/Card';
import PageHead from 'components/PageHead';
import PageWrapper from 'components/PageWrapper';

export default () => (
  <PageWrapper>
    <PageHead title="Other Projects" />

    <div className="grid grid-cols-2 gap-4">
      <Card
        title="Pizza Box Game"
        href="https://pizza.alexguo.co"
        description="Online blah blah blah blah blah blah blah blah"
      />

      <Card
        title="Drinking Board Game"
        href="https://drink.alexguo.co"
        description="This is a generalized engine for playing drinking board games online"
      />

      <Card
        title="Sorting Algo Viz w/ JS Proxies"
        href="https://js-ol3vti.stackblitz.io/"
        description="Online blah blah blah blah blah blah blah blah"
      />
    </div>
  </PageWrapper>
);
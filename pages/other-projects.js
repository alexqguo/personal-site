import React from 'react';
import Card from 'components/Card';
import PageHead from 'components/PageHead';
import PageWrapper from 'components/PageWrapper';

export default () => (
  <PageWrapper>
    <PageHead title="Other Projects" description="Other things I've worked on" />

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card
        title="Pizza Box Game"
        href="https://pizza.alexguo.co"
        repoLink="https://github.com/alexqguo/pizza-box-game"
        description="Online drinking game based off of a Reddit comment"
      />

      <Card
        title="Drinking Board Game"
        href="https://drink.alexguo.co"
        repoLink="https://github.com/alexqguo/drinking-board-game"
        description="This is a generalized engine for playing drinking board games online"
      />

      <Card
        title="Sorting Algo Viz w/ JS Proxies"
        href="https://js-ol3vti.stackblitz.io"
        repoLink="https://github.com/alexqguo/proxy-example"
        description="Sorting algorithm visualization+audio (inspired from that YouTube video) using JS Proxy objects"
      />
    </div>
  </PageWrapper>
);
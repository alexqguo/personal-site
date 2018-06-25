import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BackgroundTile from '../components/backgroundTile';
import '../styles/home.css';

const Content = styled.div`
  top: 0;
  position: absolute;
  padding: 40px;
  color: white;
  width: 100%;
  box-sizing: border-box;
`;

const Background = styled.div`
  overflow-y: hidden;
  background-color: black;
  filter: brightness(40%);
`;

const Greeting = styled.h1`
  opacity: 0;
  transition: 0.5s;

  &.active {
    opacity: 1;
  }
`;

class HomePage extends React.Component {

  static shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }

    return a;
  }

  static loadImages(images) {
    // All images done loading
    if (images.length === 0) {
      document.querySelector('h1').classList.add('active');
      return;
    }

    const img = images.shift();
    img.src = img.getAttribute('data-src');
    img.removeAttribute('data-src');

    setTimeout(() => { HomePage.loadImages(images) }, 50);
  }

  static getGreeting() {
    let greeting = 'Good evening';
    let date = new Date();

    if (date.getHours() >= 12 && date.getHours() <= 16) {
      greeting = 'Good afternoon';
    } else if (date.getHours() >= 5 && date.getHours() <= 11) {
      greeting = 'Good morning';
    }

    return greeting;
  }

  componentDidMount() {
    const bgImages = document.querySelectorAll('.tile img');
    HomePage.loadImages(Array.from(bgImages)); // I don't care about IE right now
  }

  render() {
    let images = [];
    this.props.data.site.siteMetadata.homePageImages.forEach((img, i) => {
      images.push(<BackgroundTile url={img} key={`tile-${i}`} />);
    });
    images = HomePage.shuffle(images);

    return (
      <div>
        <Background className="background" aria-hidden="true">
          {images}
        </Background>

        <Content>
          <Greeting>{HomePage.getGreeting()}</Greeting>
        </Content>
      </div>
    );
  }
}

export default HomePage;

export const query = graphql`
  query HomePageImageQuery {
    site {
      siteMetadata {
        homePageImages
      }
    }
  }`;

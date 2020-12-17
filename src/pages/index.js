import React, { Component } from 'react';
import DefaultLayout from '../layouts/defaultLayout';

class HomePage extends Component {

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
    // TODO: Not sure if this is required in prod but it's needed in dev mode
    // I need to catch a flight so leaving it like this for now
    setTimeout(() => {
      document.querySelector('.greeting').classList.add('active');
    }, 0);
  }

  render() {
    return (
      <DefaultLayout>
        <h1 className="greeting">
          {HomePage.getGreeting()}
        </h1>
      </DefaultLayout>
    );
  }
}

export default HomePage;

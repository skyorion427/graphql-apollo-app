import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div>
        <LanguageSwitcher />
        <IntlMessage id="title" />
      </div>
    );
  }
}

export default Home;

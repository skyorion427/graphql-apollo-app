import React, { Component } from 'react';
import { Row, Col } from 'antd';

import Bank from '../../components/bank';
import Employee from '../../components/employee';
import LanguageSwitcher from '../../components/languageSwitcher';
import IntlMessage from '../../components/intlMessage';
import './home.css';

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Row gutter={12}>
          <LanguageSwitcher />
        </Row>
        <Row gutter={12}>
          <Col span={18}>
            <Employee className="employee-table" />
          </Col>
          <Col span={6}>
            <Bank />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;

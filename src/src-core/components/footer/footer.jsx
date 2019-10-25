import React, { Component } from 'react';
import PropTypes from 'prop-types';
import  get  from 'lodash/get';
import { Container, Row, Col } from 'react-bootstrap';

const content = {
    premium:{
        ru: 'Приобрести премиум аккаунт',
        ukr: 'Придбати преміум акаунт'
    },
    contacts:{
        ru: 'Контакты',
        ukr: 'Контакти'
    },
};

export default class Footer extends Component {
    static propTypes = {
        store: PropTypes.shape({})
    };

  render(){
    const {siteLang } = this.props.store;
    const premium = get(content, `premium[${siteLang}]`);
    const contacts = get(content, `contacts[${siteLang}]`);

    return (
        <Container>
          <Row>
            <Col>{premium}</Col>
            <Col/>
            <Col md="auto" >{contacts}</Col>
          </Row>
        </Container>
    );
  }
};
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import  get  from 'lodash/get';
import { Container, Row, Col } from 'react-bootstrap';

import '../../../scc/footer.css';

const content = {
    premium:{
        ru: 'Приобрести премиум',
        ukr: 'Придбати преміум'
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
                    <Col className="footerButton">{premium}</Col>
                    <Col/>
                    <Col md="auto"  className="footerButton">{contacts}: +38 (093) 922-49-49</Col>
                  </Row>
                </Container>
    );
  }
};
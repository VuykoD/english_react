import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap'

export default class Header extends Component {
  render(){
    return (
        <Container>
          <Row>
            <Col sm={4}>
              <div>English Is Fun</div>
              <div>Это будет легко</div>
            </Col>
            <Col sm={1}/>
            <Col sm={2}>Курсы</Col>
            <Col sm={2}>Видео</Col>
            <Col sm={2}>Изучение</Col>
            <Col sm={1}>U</Col>
          </Row>
        </Container>
    );
  }
};
import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap";


export default class Course extends Component {
  render(){
    return (
        <Container>
          <Row>
            <Col sm={3} >
              <div><img src="images/color_line-151.png" alt=""/></div>
            </Col>
            <Col sm={6} >
              <div>Книги</div>
            </Col>
            <Col sm={3} >
              <div></div>
            </Col>
          </Row>
        </Container>
    );
  }
};
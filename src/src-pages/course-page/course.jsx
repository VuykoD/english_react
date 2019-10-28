import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap";


export default class Course extends Component {
  render(){
    return (
        <Container>
          <Row>
            <Col md="auto" >
              <div>course</div>
            </Col>
          </Row>
        </Container>
    );
  }
};
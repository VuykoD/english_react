import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap";


export default class Video extends Component {
  render(){
    return (
        <Container>
          <Row>
            <Col md="auto" >
              <div>video</div>
            </Col>
          </Row>
        </Container>
    );
  }
};
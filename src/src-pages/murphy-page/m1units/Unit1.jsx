import React, {Component} from 'react';
import {Col, Container, Row, Button} from "react-bootstrap";


export default class Course extends Component {
    render() {
        return (
            <Container>
                <Row className="text-center">
                    <Col sm={3}>
                        <div><img src="" alt=""/></div>
                    </Col>
                    <Col sm={6}>
                        <h1>Unit 1: Present continuous (I'm doing)</h1>
                    </Col>
                    <Col sm={3}>
                        <div></div>
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col sm={3}>
                        <div><img src="" alt=""/></div>
                    </Col>
                    <Col sm={6}>
                        <Button variant="primary">123</Button>
                    </Col>
                    <Col sm={3}>
                        <div></div>
                    </Col>
                </Row>
            </Container>
        );
    }
};
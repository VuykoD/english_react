import React, {Component} from 'react';
import {Col, Container, Row, ListGroup} from "react-bootstrap";


export default class Course extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col sm={3}>
                        <div><img src="" alt=""/></div>
                    </Col>
                    <Col sm={6}>
                        <h1>Murphy 1</h1>
                        <ListGroup>
                            <ListGroup.Item  action href="/m1unit1" variant="light" children="Unit 1"/>
                            <ListGroup.Item action variant="light">
                                Unit 2
                            </ListGroup.Item>
                            <ListGroup.Item action variant="light">
                                Unit 3
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col sm={3}>
                        <div></div>
                    </Col>
                </Row>
            </Container>
        );
    }
};
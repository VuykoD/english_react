import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap";


export default class Course extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col sm={3}>
                        <div><img src="images/color_line.jpg" alt=""/></div>
                    </Col>
                    <Col sm={6}>
                        <div><img src="images/мёрфи.jpg" alt=""/></div>
                    </Col>
                    <Col sm={3}>
                        <div><img src="images/color_line." alt=""/></div>
                    </Col>
                </Row>
            </Container>
        );
    }
};
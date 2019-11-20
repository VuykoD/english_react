import React, {Component} from 'react';
import map from 'lodash/map';
import {Col, Container, Row, ListGroup} from "react-bootstrap";
import  murphy1Item from "../../../src/dict/murphy1Item"

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
                            {map(murphy1Item, (item, key) => {
                                return(
                                    <ListGroup.Item
                                        key={key}
                                        action
                                        variant="light"
                                        children={item.name}
                                        href={item.href}
                                    />
                                )
                            })}
                        </ListGroup>
                    </Col>
                    <Col sm={3}/>
                </Row>
            </Container>
        );
    }
};
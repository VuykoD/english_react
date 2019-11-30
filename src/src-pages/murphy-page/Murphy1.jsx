import React, {Component} from 'react';
import map from 'lodash/map';
import {Col, Container, Row, ListGroup} from "react-bootstrap";
import  murphy1Item from "../../../src/dict/murphy1Item"

import '../../scc/course.css';

export default class Course extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col sm={1}>
                        {/*<div><img src="../../../english_react/images/paint.png" alt=""className="paint-left"/></div>*/}
                        <div><img src="../../../images/paint.png" alt=""className="paint-left"/></div>
                    </Col>
                    <Col sm={10}>
                        <h1>Murphy 1</h1>
                        <ListGroup>
                            {map(murphy1Item, (item, key) => {
                                const odd = key & 1 ? 'light' : 'primary';
                                return(
                                    <ListGroup.Item
                                        key={key}
                                        action
                                        variant={odd}
                                        children={item.name}
                                        href={`/english_react${item.href}`}
                                    />
                                )
                            })}
                        </ListGroup>
                    </Col>
                    <Col sm={1}>
                        {/*<div><img src="../../../english_react/images/paint.png" alt=""className="paint-right"/></div>*/}
                        <div><img src="../../../images/paint.png" alt=""className="paint-right"/></div>
                    </Col>
                </Row>
            </Container>
        );
    }
};
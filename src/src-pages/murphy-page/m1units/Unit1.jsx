import React, {Component} from 'react';
import {Col, Container, Row, Button, ListGroup} from "react-bootstrap";
import get from 'lodash/get';

import '../../../scc/unit.css';
import FormControl from "react-bootstrap/FormControl";

const content = {
    learning: {
        ru: "Отобрать на изучение",
        ukr: "Відібрати на вивчення",
    }
};

export default class Course extends Component {
    render() {
        const {siteLang = ''} = this.props.store;
        const learning = get(content, `learning[${siteLang}]`);

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
                        <Button variant="primary" blocknn>{learning}</Button>
                    </Col>
                    <Col sm={3}>
                        <div></div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListGroup>
                            <ListGroup.Item variant="light">
                                <Button variant="danger" className="buttons">-</Button>
                                <Button variant="success" className="buttons">+</Button>
                                <FormControl type="text" placeholder="123" className="mr-sm-2 input-left"/>
                                <FormControl type="text" placeholder="123" className="mr-sm-2 input-right"/>
                                <Button variant="primary" className="save">save</Button>
                                <Button variant="danger" className="delete">delete</Button>
                            </ListGroup.Item>
                            <ListGroup.Item variant="primary">
                                <Button variant="danger" className="buttons">-</Button>
                                <Button variant="success" className="buttons">+</Button>
                                <FormControl type="text" placeholder="123" className="mr-sm-2 input-left"/>
                                <FormControl type="text" placeholder="123" className="mr-sm-2 input-right"/>
                                <Button variant="primary" className="save">save</Button>
                                <Button variant="danger" className="delete">delete</Button>
                            </ListGroup.Item>
                            <ListGroup.Item variant="light">
                                <Button variant="danger" className="buttons">-</Button>
                                <Button variant="success" className="buttons">+</Button>
                                <FormControl type="text" placeholder="123" className="mr-sm-2 input-left"/>
                                <FormControl type="text" placeholder="123" className="mr-sm-2 input-right"/>
                                <Button variant="primary" className="save">save</Button>
                                <Button variant="danger" className="delete">delete</Button>
                            </ListGroup.Item>
                            <ListGroup.Item variant="primary">
                                <Button variant="danger" className="buttons">-</Button>
                                <Button variant="success" className="buttons">+</Button>
                                <FormControl type="text" placeholder="123" className="mr-sm-2 input-left"/>
                                <FormControl type="text" placeholder="123" className="mr-sm-2 input-right"/>
                                <Button variant="primary" className="save">save</Button>
                                <Button variant="danger" className="delete">delete</Button>
                            </ListGroup.Item>
                            <ListGroup.Item variant="light">
                                <Button variant="danger" className="buttons">-</Button>
                                <Button variant="success" className="buttons">+</Button>
                                <FormControl type="text" placeholder="123" className="mr-sm-2 input-left"/>
                                <FormControl type="text" placeholder="123" className="mr-sm-2 input-right"/>
                                <Button variant="primary" className="save">save</Button>
                                <Button variant="danger" className="delete">delete</Button>
                            </ListGroup.Item>
                            <ListGroup.Item variant="primary">
                                <Button variant="danger" className="buttons">-</Button>
                                <Button variant="success" className="buttons">+</Button>
                                <FormControl type="text" placeholder="123" className="mr-sm-2 input-left"/>
                                <FormControl type="text" placeholder="123" className="mr-sm-2 input-right"/>
                                <Button variant="primary" className="save">save</Button>
                                <Button variant="danger" className="delete">delete</Button>
                            </ListGroup.Item>
                            <ListGroup.Item variant="light">
                                <Button variant="danger" className="buttons">-</Button>
                                <Button variant="success" className="buttons">+</Button>
                                <FormControl type="text" placeholder="123" className="mr-sm-2 input-left"/>
                                <FormControl type="text" placeholder="123" className="mr-sm-2 input-right"/>
                                <Button variant="primary" className="save">save</Button>
                                <Button variant="danger" className="delete">delete</Button>
                            </ListGroup.Item>
                            <ListGroup.Item variant="primary">
                                <Button variant="danger" className="buttons">-</Button>
                                <Button variant="success" className="buttons">+</Button>
                                <FormControl type="text" placeholder="123" className="mr-sm-2 input-left"/>
                                <FormControl type="text" placeholder="123" className="mr-sm-2 input-right"/>
                                <Button variant="primary" className="save">save</Button>
                                <Button variant="danger" className="delete">delete</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
};
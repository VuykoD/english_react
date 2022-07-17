import React, {Component, Fragment} from 'react';
import map from 'lodash/map';
import {Col, Container, Row, Accordion, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import courseUnits from "../../dict/courseUnits";
import courseNames from "../../dict/courseNames";

import '../../scc/course.css';

export default class Course extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col sm={1}>
                        <div><img src={require("../../images/paint.png")} alt=""className="paint-left"/></div>
                    </Col>
                    <Col sm={10}>
                        {map(courseNames, (course, courseKey) => (
                            <Fragment key={courseKey}>
                                <h1>{course.name}</h1>
                                <Accordion>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="0">
                                            Развернуть содержание
                                        </Accordion.Toggle>
                                        {map(courseUnits, (item, key) => {
                                            if (item.courseId !== course.id) return null;
                                            return (
                                                <Accordion.Collapse
                                                    eventKey="0"
                                                    key={key}
                                                >
                                                    <Link to={`/english_react/course${item.url}`}>
                                                        <Card.Body children={item.name}/>
                                                    </Link>
                                                </Accordion.Collapse>
                                            )
                                        })}
                                    </Card>
                                </Accordion>
                            </Fragment>
                        ))}
                    </Col>
                    <Col sm={1}>
                        <div><img src={require("../../images/paint.png")} alt=""className="paint-right"/></div>
                    </Col>
                </Row>
            </Container>
        );
    }
};

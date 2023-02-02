import React, {Component, Fragment} from 'react';
import map from 'lodash/map';
import findIndex from "lodash/findIndex";
import filter from "lodash/filter";
import {Col, Container, Row, Accordion, Card, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import courseUnits from "../../dict/courseUnits";
import courseNames from "../../dict/courseNames";
import courseItems from "../../dict/courseItems";

import '../../scc/course.css';

export default class Course extends Component {
    constructor(props) {
        super(props);
        this.localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : [];
        const selectedCourses = [];
        map(this.localProgress, (itProgress) =>{
            const unitIndex = findIndex(courseItems, {'id': itProgress.entity_id });
            if (unitIndex !== -1) {
                const unitId = courseItems[unitIndex].unitId;
                const selectedCoursesIndex = findIndex(selectedCourses, it => it === unitId);

                if(selectedCoursesIndex === -1) selectedCourses.push(unitId);
            }
        });

        this.state = {
            selectedCourses
        };
    }

    onChangeCheck = (unitId) => {
        const { selectedCourses } = this.state;
        const selectedCoursesIndex = findIndex(selectedCourses, course => course === unitId);
        if (selectedCoursesIndex === -1) {
            this.setState({selectedCourses: [...selectedCourses, unitId]});
        } else {
            const courses = [];
            map(selectedCourses, course => {
                if (course !== unitId) courses.push(course)
            })
            this.setState({selectedCourses: courses});
        }
    };

    render() {
        const { selectedCourses } = this.state;
        let progress = [];
        map(selectedCourses, unitId => {
            const items = filter(courseItems, {'unitId': unitId });
            progress = [...progress, ...items];
        });
        const localProgress = [];
        map(progress, it => {
            localProgress.push({"entity_id": it.id})
        });
        localStorage.progress = JSON.stringify(localProgress);

        return (
            <Container>
                <Row>
                    <Col sm={1}>
                        <div><img src={require("../../images/paint.png")} alt="" className="paint-left"/></div>
                    </Col>
                    <Col sm={10}>
                        {map(courseNames, (course, courseKey) => (
                            <Fragment key={courseKey}>
                                <h1>{course.name}</h1>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                        Развернуть содержание
                                    </Accordion.Toggle>
                                    {map(courseUnits, (item, key) => {
                                        if (item.courseId !== course.id) return null;

                                        let checked=false;
                                        map(selectedCourses, (course) => {
                                            if (course === item.id) return checked = true;
                                        });
                                        return (
                                            <div key={key} className="main">
                                                <Form.Check
                                                    type="checkbox"
                                                    onChange={() => this.onChangeCheck(item.id)}
                                                    checked={checked}
                                                />
                                                <Link to={`/course${item.url}`}>
                                                    <Card.Body children={item.name}/>
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </Card>
                            </Fragment>
                        ))}
                    </Col>
                    <Col sm={1}>
                        <div><img src={require("../../images/paint.png")} alt="" className="paint-right"/></div>
                    </Col>
                </Row>
            </Container>
        );
    }
};

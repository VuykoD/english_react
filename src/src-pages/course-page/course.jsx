import React, {Component, Fragment} from 'react';
import { map, findIndex, filter, get } from 'lodash';
import {
    Col,
    Container,
    Row,
    Accordion,
    Card,
    Form,
    Button
} from "react-bootstrap";
import {Link} from 'react-router-dom';
import getCourseItems, { getCourseUnits, getCourseNames } from '../../dict/getCourseItems';

import '../../scc/course.css';

let courseItems = getCourseItems();
let courseUnits = getCourseUnits();
let courseNames = getCourseNames();

const content = {
    expandContent: {
        ru: "Развернуть содержание",
        ukr: "Розгорнути зміст",
    },
};

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

            const items = filter(courseItems, { 'unitId': unitId });
            map(items, it => {
                this.localProgress.push({"entity_id": it.id})
            });
            localStorage.progress = JSON.stringify(this.localProgress);
        } else {
            const courses = [];
            map(selectedCourses, course => {
                if (course !== unitId) courses.push(course)
            })
            this.setState({selectedCourses: courses});

            const progress = [];
            const localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : null;
            map(localProgress, (item, key) => {
                const index = findIndex(courseItems, {'id': item.entity_id});
                if (get(courseItems, `[${index}].unitId`) !== unitId) {
                    progress.push({ entity_id: localProgress[key].entity_id });
                }
            })
            this.localProgress = progress;
            localStorage.progress = JSON.stringify(progress);
        }
    };

    collapse (courseKey) {
        console.log(courseKey);
    }

    render() {
        const { siteLang } = this.props.store;
        const expandContent = get(content, `expandContent[${siteLang}]`);
        const { selectedCourses } = this.state;

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
                                <Accordion
                                    defaultActiveKey={courseKey === 1 ? courseKey : null}
                                >
                                    <Card>
                                        <Accordion.Toggle
                                            as={Button}
                                            onClick={() => this.collapse(courseKey)}
                                            variant="info"
                                            eventKey={courseKey}
                                        >
                                            {expandContent}
                                        </Accordion.Toggle>
                                        <Accordion.Collapse
                                            eventKey={courseKey}
                                        >
                                            <Card.Body>
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
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
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

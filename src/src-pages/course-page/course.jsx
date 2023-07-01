import React, {Component, Fragment} from 'react';
import { map, findIndex, filter, get } from 'lodash';
import {Col, Container, Row, Accordion, Card, Form} from "react-bootstrap";
import {Link} from 'react-router-dom';
import courseUnits from '../../dict/courseUnits';
import courseNames from '../../dict/courseNames';
import getCourseItems from '../../dict/getCourseItems';

import '../../scc/course.css';

let courseItems = getCourseItems();

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

    render() {
        const { selectedCourses } = this.state;
        const courseItemsIds = [];
        const uniqueWords = [];
        const phraseWithUniqueWords = [];
        const arrWithNewWords = [];
        const arrWithoutNewWords = [];
        map(courseItems, it => {
            const isIdExist = courseItemsIds.find(element => element === it.id);
            if (!isIdExist) {
                courseItemsIds.push(it.id)
            } else {
                alert('there is duplicate id' + it.id)
            }
            const polCleared = it.pol.replace(/[.,%?!1-9"]/g, '').trim().toLowerCase();
            const words = polCleared.split(' ');
            let noOneNewWords = true;
            map(words, word => {
                let wordCleared = word.replace(/[\s.,%?!1-9"]/g, '').toLowerCase();
                const isWordExist = uniqueWords.find(element => element === wordCleared);
                if (!isWordExist) {
                    noOneNewWords = false;
                    uniqueWords.push(wordCleared);
                    arrWithNewWords.push({id: it.id, word: wordCleared});
                }
                const ispPhraseWithUniqueWordsExist = phraseWithUniqueWords.find(element => element === it.id);
                if (!ispPhraseWithUniqueWordsExist) phraseWithUniqueWords.push(it.id)
            });
            if (noOneNewWords) arrWithoutNewWords.push(it.id)
        })
        console.log(arrWithNewWords, arrWithoutNewWords);

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

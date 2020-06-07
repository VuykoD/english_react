import React, {Component} from 'react';
import {Col, Container, Row, Button, ListGroup} from "react-bootstrap";
import get from 'lodash/get';
import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
import filter from 'lodash/filter';
import FormControl from "react-bootstrap/FormControl";

import '../../scc/unit.css';
import '../../scc/course.css'
import courseUnits from "../../dict/courseUnits";
import courseItems from "../../dict/courseItems";
import {content, getCurrentDate} from '../video-page/video-item'
import learnedCount from "../../src-core/helper/learnedCount/learnedCount";


export default class CourseItem extends Component {
    constructor(props) {
        super(props);

        let url = get(props, `match.url`);
        url = url.replace('/english_react/course', '');
        this.unitIndex = findIndex(courseUnits, {'url': url});
        this.unitId = get(courseUnits, `[${this.unitIndex}].id`);
        this.unitName = get(courseUnits, `[${this.unitIndex}].name`);
        this.localItems = localStorage.course ? JSON.parse(localStorage.course) : [];
        const localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : [];
        let isItemSelected = false;
        for (let i = localProgress.length; i > 0; i--) {
            const index = get(localProgress, `[${i - 1}].entity`) === 'course' ?
                findIndex(courseItems, {'id': get(localProgress, `[${i - 1}].entity_id`)}) :
                -1;
            if (+get(courseItems, `[${index}].unitId`) === +this.unitId) {
                isItemSelected = true;
                break;
            }
        }

        this.items = filter([...courseItems, ...this.localItems], item => {
                return +item.unitId === +this.unitId;
            }
        );

        this.state = {
            courseItems: this.items,
            isItemSelected
        };
    }

    select = () => {
        if (this.state.isItemSelected) {
            const {siteLang} = this.props.store;
            const alreadySelected = get(content, `alreadySelected[${siteLang}]`);
            return alert(alreadySelected);
        }
        const localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : null;
        const currentDate = getCurrentDate();
        const sortOrder = localProgress ?localProgress.length: 0;

        const addedProgress = map(this.items, (item, key) => {
            return (
                {
                    entity: 'course',
                    entity_id: +item.id,
                    quantity: 0,
                    date: currentDate,
                    sortOrder: sortOrder + key
                }
            )
        });
        const newProgress = localProgress ?
            [...localProgress, ...addedProgress] :
            [...addedProgress];
        this.setState({isItemSelected: true});
        localStorage.progress = JSON.stringify(newProgress);
        this.props.onChangeLearnedCount(learnedCount());
    };

    save = (e) => {
        const rowData = this.getRowData(e) || {};
        const {id, eng, transl} = rowData;
        // if (!eng || !transl) return alert('fill in all data');
        const courseItems = this.localItems;
        const newId = courseItems.length ?
            +courseItems[courseItems.length - 1].id + 1 :
            1;
        const index = findIndex(courseItems, {'id': id});

        const courseItem = {
            id: +id || +newId,
            unitId: +this.unitId,
            eng,
            transl
        };
        let newCourseItems = null;
        if (index > -1) {
            newCourseItems = courseItems;
            newCourseItems[index] = courseItem;
        } else {
            newCourseItems = courseItems.length ? [...courseItems, courseItem] : [courseItem];
        }
        this.localItems = newCourseItems;
        this.setState({courseItems: newCourseItems});
        localStorage.course = JSON.stringify(newCourseItems);
        if (index === -1) this.clearRow(e);
    };

    delete = (e) => {
        const rowData = this.getRowData(e) || {};
        const {id} = rowData;
        const {courseItems} = this.state;
        let index = findIndex(courseItems, {'id': +id});
        if (index === -1) index = findIndex(courseItems, {'id': id});
        let newCourseItems = null;
        if (index > -1) {
            newCourseItems = courseItems;
            newCourseItems.splice(index, 1);
            this.setState({courseItems: newCourseItems});
            localStorage.course = JSON.stringify(newCourseItems);
        }
    };

    clearRow = (e) => {
        const rowElem = this.getRowElem(e);
        const {eEng, eTransl} = rowElem;
        eEng.value = null;
        eTransl.value = null;
    };

    getRowData = (e) => {
        const rowElem = this.getRowElem(e);
        const {eId, eEng, eTransl} = rowElem;
        const id = eId ? eId.value : null;
        const eng = eEng ? eEng.value : null;
        const transl = eTransl ? eTransl.value : null;
        return {id, eng, transl};
    };

    getRowElem(e) {
        const elem = e.currentTarget;
        const row = elem.getAttribute('row');
        const eId = document.getElementById(`row${row}_id`);
        const eEng = document.getElementById(`row${row}_eng`);
        const eTransl = document.getElementById(`row${row}_transl`);
        return {eId, eEng, eTransl};
    }

    render() {
        const {siteLang = ''} = this.props.store;
        const select = get(content, `select[${siteLang}]`);
        const alreadySelected = get(content, `alreadySelected[${siteLang}]`);
        const {courseItems, isItemSelected} = this.state;
        return (
            <Container>
                <Row>
                    <Col sm={1}>
                        {/*<div><img src="../../../english_react/images/paint.png" alt="" className="paint-left"/></div>*/}
                        <div><img src="../../../images/paint.png" alt="" className="paint-left"/></div>
                    </Col>
                    <Col sm="10">
                        <Row className="text-center learning">
                            <Col sm={2}/>
                            <Col sm={8}>
                                <h1>{this.unitName}</h1>
                                <Button
                                    variant={isItemSelected ? "success" : "primary"}
                                    onClick={this.select}
                                >
                                    {isItemSelected ? alreadySelected : select}
                                </Button>
                            </Col>
                            <Col sm={2}/>
                        </Row>
                        <ListGroup>
                            {/* {map(courseItems, (item, key) => {
                                return(
                                    <p>{item.eng}"</p>
                                )
                                }
                            )} */}
                            {map(courseItems, (item, key) => {
                                const odd = key & 1 ? 'light' : 'primary';
                                return (
                                    <ListGroup.Item variant={odd} key={item.id}>
                                        <Row className="unit-row">
                                            <Col sm="1" className="display-none">
                                                <FormControl
                                                    wtype="text"
                                                    defaultValue={item.id}
                                                    disabled
                                                    id={`row${key + 1}_id`}
                                                />
                                            </Col>
                                            <Col>
                                                <FormControl type="text" className="mr-sm-2" id={`row${key + 1}_eng`}
                                                             defaultValue={item.eng}/>
                                            </Col>
                                            <Col>
                                                <FormControl type="text" className="mr-sm-2" id={`row${key + 1}_transl`}
                                                             defaultValue={item.transl}/>
                                            </Col>
                                            <Col sm="1">
                                                <Button
                                                    row={key + 1}
                                                    className="buttons"
                                                    variant="primary"
                                                    onClick={this.save}
                                                >
                                                    save
                                                </Button>
                                            </Col>
                                            <Col sm="1">
                                                <Button
                                                    row={key + 1}
                                                    className="buttons"
                                                    variant="dark"
                                                    onClick={this.delete}
                                                >
                                                    Delete
                                                </Button>
                                            </Col>
                                        </Row>

                                    </ListGroup.Item>
                                )
                            })}
                            <ListGroup.Item variant="light">
                                <Row className="unit-row">
                                    <Col sm="1" className="display-none">
                                        <FormControl type="text" disabled id='row_new_id' className="display-none"/>
                                    </Col>
                                    <Col>
                                        <FormControl type="text" className="mr-sm-2" id={`row_new_eng`}/>
                                    </Col>
                                    <Col>
                                        <FormControl type="text" className="mr-sm-2" id={`row_new_transl`}/>
                                    </Col>
                                    <Col sm="1">
                                        <Button
                                            variant="primary"
                                            className="buttons"
                                            onClick={this.save}
                                            row="_new"
                                        >
                                            save
                                        </Button>
                                    </Col>
                                    <Col sm="1"/>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col sm={1}>
                        {/*<div><img src="../../../english_react/images/paint.png" alt="" className="paint-right"/></div>*/}
                        <div><img src="../../../images/paint.png" alt="" className="paint-right"/></div>
                    </Col>
                </Row>
            </Container>
        )
    }
}
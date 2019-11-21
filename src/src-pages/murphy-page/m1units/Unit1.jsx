import React, {Component} from 'react';
import {Col, Container, Row, Button, ListGroup} from "react-bootstrap";
import get from 'lodash/get';
import map from 'lodash/map';
import findIndex from 'lodash/findIndex';

import '../../../scc/unit.css';
import FormControl from "react-bootstrap/FormControl";

const content = {
    learning: {
        ru: "Отобрать на изучение",
        ukr: "Відібрати на вивчення",
    }
};

export default class Course extends Component {
    constructor(props) {
        super(props);

        const localItems = localStorage.course ? JSON.parse(localStorage.course) : {};

        this.state = {
            courseItems: localItems,
        };
    }

    save = (e) => {
        const rowData = this.getRowData(e) || {};
        const {id, eng, transl} = rowData;
        if (!eng || !transl) return alert('fill in all data');
        const {courseItems} = this.state;
        const newId = courseItems.length ?
            +courseItems[courseItems.length - 1].id + 1 :
            1;
        const index = findIndex(courseItems, {'id': id});
        const courseItem = {
            id: id || String(newId),
            idCourse: "1",
            eng,
            transl
        };
        let newCourseItems = null;
        if (index > -1) {
            newCourseItems = courseItems;
            newCourseItems[index] = courseItem;
        } else {
            newCourseItems = [...courseItems, {
                id: id || String(newId),
                idVideoName: "1",
                eng,
                transl
            }];
        }

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
        const learning = get(content, `learning[${siteLang}]`);
        const {courseItems} = this.state;
        return (
            <Container>
                <Row className="text-center">
                    <Col sm={3}/>
                    <Col sm={6}>
                        <h1>Unit 1: Present continuous (I'm doing)</h1>
                    </Col>
                    <Col sm={3}/>
                </Row>
                <Row className="text-center learning">
                    <Col sm={3}>
                        <div><img src="" alt=""/></div>
                    </Col>
                    <Col sm={6}>
                        <Button variant="primary">{learning}</Button>
                    </Col>
                    <Col sm={3}/>
                </Row>
                <ListGroup>
                    {map(courseItems, (item, key) => {
                        const odd = key & 1 ? 'light' : 'primary';
                        return (
                            <ListGroup.Item variant={odd} key={item.id}>
                                <Row className="unit-row">
                                    <Col sm="1" className="display-none">
                                        <FormControl type="text" defaultValue={item.id} disabled
                                                     id={`row${key + 1}_id`}/>
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
            </Container>
        )
    }
}
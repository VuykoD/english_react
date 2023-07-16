import React, {Component} from 'react';
import {Col, Container, Row, Button, ListGroup} from "react-bootstrap";
import get from 'lodash/get';
import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
import filter from 'lodash/filter';
import FormControl from "react-bootstrap/FormControl";

import '../../scc/unit.css';
import '../../scc/course.css'
import courseUnits from '../../dict/courseUnits';
import getCourseItems from '../../dict/getCourseItems';

let courseItems = getCourseItems();

export const content = {
    hideTranslate: {
        ru: "Скрыть перевод",
        ukr: "Скрити переклад",
    },
    firstPhrase: {
        ru: "Составить по словам",
        ukr: "Скласти по словам",
    },
    thirdPhrase: {
        ru: "Написать первые буквы",
        ukr: "Написати перші літери",
    },
    fifthPhrase: {
        ru: "Повторить по озвученному",
        ukr: "Повторити по озвученому",
    },
    train: {
        ru: "Тренировать",
        ukr: "Тренувати",
    },
    select: {
        ru: "Отобрать для изучения",
        ukr: "Відібрати для вивчення",
    },
    alreadySelected: {
        ru: "Уже отобрано для изучения",
        ukr: "Вже відібрано для вивчення",
    },
    clearLocalstorage: {
        ru: "Убрать всё из изучения",
        ukr: "Видалити все з вивчення",
    },
};

export default class CourseItem extends Component {
    constructor(props) {
        super(props);

        let url = get(props, `match.url`);
        url = url.replace('/course', '');
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

        const addedProgress = map(this.items, (item) => {
            return (
                {
                    entity: 'course',
                    entity_id: +item.id
                }
            )
        });
        const newProgress = localProgress ?
            [...localProgress, ...addedProgress] :
            [...addedProgress];
        this.setState({isItemSelected: true});
        localStorage.progress = JSON.stringify(newProgress);
    };

    clearLocalstorage = () => {
        if (this.state.isItemSelected) {
            this.setState({isItemSelected: false});
            // localStorage.progress = ''; TODO remove only current course but not all
        }
    };

    setItem(id, elementId){
        const eng = get(document.getElementById(`row${elementId}_eng`), 'value');
        const pol = get(document.getElementById(`row${elementId}_pol`), 'value');
        const transl = get(document.getElementById(`row${elementId}_transl`), 'value');
        return {
            id,
            unitId: 1042,
            eng,
            pol,
            transl
        };
    }

    add = () => {
        const lastId = courseItems[courseItems.length-1].id;
        const item = this.setItem(lastId, '_new');
        courseItems.push(item);
        localStorage.courseItems = JSON.stringify(courseItems);
        this.items.push(item);
        this.setState({ courseItems: this.items });
        document.getElementById("row_new_eng").value = '';
        document.getElementById("row_new_pol").value = '';
        document.getElementById("row_new_transl").value = '';
    }

    edit = (id) => {
        const item = this.setItem(id, id);
        console.log(item);
        const courseItemsIndex = findIndex(courseItems, {'id': id});
        const thisItemsIndex = findIndex(this.items, {'id': id});
        if (courseItemsIndex > -1) {
            courseItems[courseItemsIndex] = item;
            localStorage.courseItems = JSON.stringify(courseItems);
        }
        if (thisItemsIndex > -1) {
            this.items[thisItemsIndex] = item;
            this.setState({ courseItems: this.items });
        }
    }

    render() {
        const {siteLang = ''} = this.props.store;
        const select = get(content, `select[${siteLang}]`);
        const alreadySelected = get(content, `alreadySelected[${siteLang}]`);
        const clearLocalstorage = get(content, `clearLocalstorage[${siteLang}]`);
        const {courseItems, isItemSelected} = this.state;

        const row = (odd, item, key) => (
            <ListGroup.Item variant={odd} key={item.id || key}>
                <Row className="unit-row">
                    <Col sm="1">
                        <Button
                            variant="info"
                            block
                            onClick={item.id ? () => this.edit(item.id) : this.add}
                        >
                            {item.id ? item.id : '+'}
                        </Button>
                    </Col>
                    <Col>
                        <FormControl
                            type="text"
                            className="mr-sm-2"
                            id={`row${item.id || ''}_eng`}
                            defaultValue={item.eng}
                        />
                    </Col>
                    <Col>
                        <FormControl
                            type="text"
                            className="mr-sm-2"
                            id={`row${item.id || ''}_pol`}
                            defaultValue={item.pol}
                        />
                    </Col>
                    <Col>
                        <FormControl
                            type="text"
                            className="mr-sm-2"
                            id={`row${item.id || ''}_transl`}
                            defaultValue={item.transl}
                        />
                    </Col>
                </Row>
            </ListGroup.Item>
        );

        return (
            <Container>
                <Row className="unit-block">
                    <Col sm={1}>
                        {<div><img src={require("../../images/paint.png")} alt="" className="paint-left"/></div>}
                    </Col>
                    <Col sm="10">
                        <Row className="text-center learning">
                            <Col sm={2}/>
                            <Col>
                                <h1>{this.unitName}</h1>
                                <Row className="text-center learning">
                                    <Col>
                                        <Button
                                            variant={isItemSelected ? "success" : "primary"}
                                            onClick={this.select}
                                        >
                                            {isItemSelected ? alreadySelected : select}
                                        </Button>
                                    </Col>
                                    {isItemSelected &&
                                        <Col sm={6}>
                                            <Button
                                                variant="primary"
                                                onClick={this.clearLocalstorage}
                                            >
                                                {clearLocalstorage}
                                            </Button>
                                        </Col>
                                    }
                                </Row>
                            </Col>
                            <Col sm={2}/>
                        </Row>
                        <ListGroup>
                            {map(courseItems, (item, key) => {
                                const odd = key & 1 ? 'light' : 'primary';
                                return row(odd, item, key);
                            })}
                            {row('light', {}, '_new')}
                        </ListGroup>
                    </Col>
                    <Col sm={1}>
                        <div><img src={require("../../images/paint.png")} alt="" className="paint-right"/></div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

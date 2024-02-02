import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Container, Row, Button, ListGroup} from "react-bootstrap";
import { map, findIndex, filter, get, indexOf, includes } from 'lodash';
import FormControl from "react-bootstrap/FormControl";
import { uniqWords } from './uniqWords';
import setLearnCount from '../../src-core/helper/setLearnCount';
import getCourseItems, {
    getCourseUnits,
    getDefaultProgress
} from '../../dict/getCourseItems';

import '../../scc/unit.css';
import '../../scc/course.css'

let courseItems = getCourseItems();
let courseUnits = getCourseUnits();

export const content = {
    hideTranslate: {
        ru: "Скрыть перевод",
        ukr: "Скрити переклад",
        pol: "Ukryj tłumaczenie",
    },
    firstPhrase: {
        ru: "Составить по словам",
        ukr: "Скласти по словам",
        pol: "Ułożyć według słów",
    },
    thirdPhrase: {
        ru: "Написать первые буквы",
        ukr: "Написати перші літери",
        pol: "Napisać pierwsze litery",
    },
    fifthPhrase: {
        ru: "Повторить по озвученному",
        ukr: "Повторити по озвученому",
        pol: "Powtórz według wymowy",
    },
    train: {
        ru: "Тренировать",
        ukr: "Тренувати",
        pol: "Ćwiczyć",
    },
    select: {
        ru: "Отобрать для изучения",
        ukr: "Відібрати для вивчення",
        pol: "Wybierz do nauki",
    },
    alreadySelected: {
        ru: "Уже отобрано для изучения",
        ukr: "Вже відібрано для вивчення",
        pol: "Już wybrane do nauki",
    },
    clearLocalstorage: {
        ru: "Убрать всё из изучения",
        ukr: "Видалити все з вивчення",
        pol: "Usuń wszystko z nauki",
    },
    uniq: {
        ru: "Уникальность",
        ukr: "Унікальність",
        pol: "Unikalność",
    },
    notAllFieldsAreFilled: {
        ru: "Заполнены не все поля",
        ukr: "Заповнені не всі поля",
        pol: "Nie wszystkie pola są wypełnione",
    },
};

export default class CourseItem extends Component {
    static propTypes = {
        store: PropTypes.shape({}),
        onChangeItemCount: PropTypes.func,
        onChangeToLearnCount: PropTypes.func
    };
    constructor(props) {
        super(props);

        const { learnedLang } = props.store;
        let url = get(props, `match.url`);
        url = url.replace('/course', '');
        this.unitIndex = findIndex(courseUnits, {'url': url});
        this.unitId = get(courseUnits, `[${this.unitIndex}].id`);
        this.unitName = get(courseUnits, `[${this.unitIndex}].name`);
        this.localItems = localStorage.course ? JSON.parse(localStorage.course) : [];
        this.localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : getDefaultProgress();
        let isItemSelected = false;
        if (this.localProgress[learnedLang] && this.localProgress[learnedLang].length) {
            for (let i = this.localProgress[learnedLang].length; i > 0; i--) {
                const index = findIndex(courseItems, {'id': get(this.localProgress[learnedLang], `[${i - 1}]`)});
                if (+get(courseItems, `[${index}].unitId`) === +this.unitId) {
                    isItemSelected = true;
                    break;
                }
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
        const { onChangeToLearnCount } = this.props;
        const { learnedLang, siteLang } = this.props.store;
        if (this.state.isItemSelected) {
            const alreadySelected = get(content, `alreadySelected[${siteLang}]`);
            return alert(alreadySelected);
        }

        if (this.localProgress[learnedLang]){

        }
        map(this.items, (item) => {
            if (item[learnedLang]){
                this.localProgress[learnedLang].push(+item.id);
                this.setState({isItemSelected: true});
                setLearnCount(onChangeToLearnCount, this.localProgress[learnedLang].length);
                localStorage.progress = JSON.stringify(this.localProgress);
            }
        });
    };

    clearLocalstorage = () => {
        const { onChangeToLearnCount } = this.props;
        const { learnedLang } = this.props.store;
        if (this.state.isItemSelected) {
            map(this.items, item => {
                const index = indexOf(this.localProgress[learnedLang], item.id);
                this.localProgress[learnedLang].splice(index,1);
            });
            setLearnCount(onChangeToLearnCount, this.localProgress[learnedLang].length);
            localStorage.progress = JSON.stringify(this.localProgress);
            this.setState({isItemSelected: false});
        }
    };

    setItem = (id, elementId)=> {
        const route = get(this.props, 'match.params.0');
        const unitIndex = findIndex(courseUnits, { 'url': `/${route}` });
        let unitId = get(this.items, '[0].unitId');
        if (unitIndex > -1) {
            unitId = courseUnits[unitIndex].id;
        }
        const eng = get(document.getElementById(`row${elementId}_eng`), 'value');
        const pol = get(document.getElementById(`row${elementId}_pol`), 'value');
        const transl = get(document.getElementById(`row${elementId}_transl`), 'value');
        return {
            id,
            unitId,
            eng,
            pol,
            transl
        };
    }

    add = () => {
        const idsArr= [];
        map(courseItems, it => idsArr.push(+it.id))
        const maxId = Math.max(...idsArr);
        const item = this.setItem(maxId + 1, '_new');
        courseItems.push(item);
        localStorage.courseItems = JSON.stringify(courseItems);
        this.items.push(item);
        this.setState({ courseItems: this.items });
        const engElement = document.getElementById("row_new_eng");
        const polElement = document.getElementById("row_new_pol");
        const translElement = document.getElementById("row_new_transl");
        if (engElement) engElement.value = '';
        if (polElement) polElement.value = '';
        if (translElement) translElement.value = '';
        this.clearUniq();
    }

    edit = (id) => {
        const item = this.setItem(id, id);
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

    clearUniq() {
        const div = document.getElementById('uniqueArr');
        div.innerHTML = '';
        return div
    }

    uniq = () => {
        const { learnedLang } = this.props.store;
        const word = get(document.getElementById(`row_new_${learnedLang}`), 'value');
        const uniqArr = uniqWords(courseItems, word, learnedLang);
        const div = this.clearUniq();
        map(uniqArr, it => {
            const p = document.createElement('p');
            if (it.source === 'unique') {
                p.style.background = '#4696c7';
            }
            p.textContent = `${it.word} => ${it.source}`;
            div.appendChild(p);
        })
    }

    render() {
        const { siteLang = '', learnedLang, userData } = this.props.store;
        const { courseItems, isItemSelected } = this.state;
        const select = get(content, `select[${siteLang}]`);
        const alreadySelected = get(content, `alreadySelected[${siteLang}]`);
        const clearLocalstorage = get(content, `clearLocalstorage[${siteLang}]`);
        const uniq = get(content, `uniq[${siteLang}]`);
        const parsedUserData = userData ? JSON.parse(userData) : {};
        const isAdmin = get(parsedUserData, `isAdmin`);

        const row = (odd, item) => {
            if (!item[learnedLang] && !isAdmin) return;

            const inProgress = includes(this.localProgress[learnedLang], item.id);
            return (
                <ListGroup.Item variant={inProgress  ? "info"  : odd} key={item.id}>
                    <Row className="unit-row">
                        <Col sm="1" className="editButton">
                            <Button
                                variant={inProgress  ? "info" : "light"}
                                block
                                onClick={item.id !== '_new' ? () => this.edit(item.id) : this.add}
                            >
                                {item.id !== '_new' ? item.id : '+'}
                            </Button>
                        </Col>
                        <Col md="5">
                            <FormControl
                                type="text"
                                id={`row${item.id}_${learnedLang}`}
                                defaultValue={item[learnedLang]}
                            />
                        </Col>
                        <Col>
                            <FormControl
                                type="text"
                                id={`row${item.id}_transl`}
                                defaultValue={item.transl}
                            />
                        </Col>
                    </Row>
                </ListGroup.Item>
            );
        }
        const rowWithButtons = (
            <ListGroup.Item variant='primary' key='rowWithButtons'>
                <Row className="unit-row">
                    <Col sm="1"/>
                    <Col>
                        <Button
                            variant="light"
                            block
                            onClick={this.uniq}
                        >
                            {uniq}
                        </Button>
                    </Col>
                    <Col/>
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
                                return row(odd, item);
                            })}
                            {row('light', {id: '_new'})}
                            {isAdmin && rowWithButtons}
                            <div id='uniqueArr'/>
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

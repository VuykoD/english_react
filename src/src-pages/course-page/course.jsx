import React, {Component, Fragment} from 'react';
import { map, findIndex, filter, get, indexOf, includes } from 'lodash';
import {
    Col,
    Container,
    Row,
    Accordion,
    Card,
    Form,
    Button,
    FormControl,
    Modal
} from "react-bootstrap";
import {
    Pen,
    Trash2Fill,
    Save,
    PlusCircle,
    Scissors,
    FlagFill
} from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import getCourseItems, {
    getCourseUnits,
    getCourseNames,
    getDefaultProgress
} from '../../dict/getCourseItems';
import setLearnCount from '../../src-core/helper/setLearnCount';
import langType from '../../dict/langType';

import '../../scc/course.css';

let courseItems = getCourseItems();
let courseUnits = getCourseUnits();
let courseNames = getCourseNames();

const content = {
    unfoldContent: {
        ru: "Развернуть содержание",
        ukr: "Розгорнути зміст",
        pol: "Rozwiń zawartość",
        eng: "Unfold content"
    },
    foldContent: {
        ru: "Свернуть содержание",
        ukr: "Згорнути зміст",
        pol: "Zwiń zawartość",
        eng: "Fold content"
    },
    notAllFieldsAreFilled: {
        ru: "Заполнены не все поля",
        ukr: "Заповнені не всі поля",
        pol: "Nie wszystkie pola są wypełnione",
        eng: "Not all fields are filled"
    },
};

export default class Course extends Component {
    static propTypes = {
        store: PropTypes.shape({}),
        onChangeItemCount: PropTypes.func,
        onChangeToLearnCount: PropTypes.func
    };

    constructor(props) {
        super(props);
        const { learnedLang } = props.store;
        this.localProgress = localStorage.progress ? JSON.parse(localStorage.progress)
            : getDefaultProgress();
        const selectedCourses = [];
        if(this.localProgress[learnedLang]){
            map(this.localProgress[learnedLang], (itProgress) =>{
                const unitIndex = findIndex(courseItems, {'id': itProgress });
                if (unitIndex !== -1) {
                    const unitId = courseItems[unitIndex].unitId;
                    const selectedCoursesIndex = findIndex(selectedCourses, it => it === unitId);

                    if(selectedCoursesIndex === -1) selectedCourses.push(unitId);
                }
            });
        }

        this.state = {
            selectedCourses,
            courseNames,
            courseUnits,
            currentUnitId: 0,
            currentCourseId: 0,
            openedCourses: [],
            showModal: false
        };
    }

    onChangeCheck = (unitId) => {
        const { selectedCourses } = this.state;
        const { onChangeToLearnCount } = this.props;
        const { learnedLang, siteLang } = this.props.store;
        const selectedCoursesIndex = findIndex(selectedCourses, course => course === unitId);
        if (selectedCoursesIndex === -1) {
            this.setState({selectedCourses: [...selectedCourses, unitId]});
            const items = filter(courseItems, { 'unitId': unitId });
            map(items, it => {
                if (it[learnedLang]) {
                    this.localProgress[learnedLang].push(it.id);
                }
                if (it[siteLang]) {
                    this.localProgress[siteLang].push(it.id);
                }
            });
            setLearnCount(onChangeToLearnCount, this.localProgress[learnedLang].length);
            localStorage.progress = JSON.stringify(this.localProgress);
        } else {
            const courses = [];
            map(selectedCourses, course => {
                if (course !== unitId) courses.push(course)
            })
            this.setState({selectedCourses: courses});

            const progress = [];
            const localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : null;
            map(localProgress[learnedLang], (item) => {
                const index = findIndex(courseItems, {'id': item});
                if (get(courseItems, `[${index}].unitId`) !== unitId) {
                    progress.push(item);
                }
            });
            this.localProgress[learnedLang] = progress;

            const progressSiteLang = [];
            map(localProgress[siteLang], (item) => {
                const index = findIndex(courseItems, {'id': item});
                if (get(courseItems, `[${index}].unitId`) !== unitId) {
                    progressSiteLang.push(item);
                }
            });
            this.localProgress[learnedLang] = progress;
            this.localProgress[siteLang] = progressSiteLang;
            setLearnCount(onChangeToLearnCount, progress.length);
            localStorage.progress = JSON.stringify(this.localProgress);
        }
    };

    addCourse =()=> {
        const { siteLang } = this.props.store;
        const idsArr= [];
        map(courseNames, it => idsArr.push(+it.id))
        const courseId = Math.max(...idsArr);
        const courseName = get(document.getElementById("course_name"), 'value');
        if (!courseId || !courseName){
            const { siteLang } = this.props.store;
            const notAllFieldsAreFilled = get(content, `notAllFieldsAreFilled[${siteLang}]`);
            return alert(notAllFieldsAreFilled);
        }
        courseNames.push({
            id: courseId + 1,
            [siteLang]: { name: courseName }
        });
        localStorage.courseNames = JSON.stringify(courseNames);
        document.getElementById("course_name").value = '';
        this.setState({courseNames});
    };

    addEditUnit =(courseId)=> {
        const { currentUnitId } = this.state;
        const idsArr= [];
        map(courseUnits, it => idsArr.push(+it.id))
        const unitId = Math.max(...idsArr);
        const unitName = get(document.getElementById(`unit_name_${courseId}`), 'value');
        const unitUrl = get(document.getElementById(`unit_url_${courseId}`), 'value');
        if (!courseId || !unitId || !unitName || !unitUrl){
            const { siteLang } = this.props.store;
            const notAllFieldsAreFilled = get(content, `notAllFieldsAreFilled[${siteLang}]`);
            return  alert(notAllFieldsAreFilled);
        }
        if (currentUnitId) {
            const index = findIndex(courseUnits, {'id': currentUnitId});
            if (index > -1) {
                courseUnits[index].url = unitUrl;
                courseUnits[index].name = unitName;
            }
        } else {
            courseUnits.push({
                id: unitId + 1,
                courseId,
                url: unitUrl,
                name: unitName
            });
        }
        localStorage.courseUnits = JSON.stringify(courseUnits);
        document.getElementById(`unit_name_${courseId}`).value = '';
        document.getElementById(`unit_url_${courseId}`).value = '';
        this.setState({courseUnits, currentUnitId: 0});
    };

    delete =(unit)=> {
        if (unit?.id) {
            const index = findIndex(courseUnits, {'id': unit.id});
            if (index > -1) {
                courseUnits.splice(index, 1);
                localStorage.courseUnits = JSON.stringify(courseUnits);
                this.setState({courseUnits, currentUnitId: 0});
            }
        }
    };

    deleteCourse =(course)=> {
        if (course?.id) {
            const index = findIndex(courseNames, {'id': course.id});
            if (index > -1) {
                courseNames.splice(index, 1);
                localStorage.courseNames = JSON.stringify(courseNames);
                this.setState({courseNames});
            }
        }
    };

    saveCourse = (courseId)=> {
        if (courseId) {
            const index = findIndex(courseNames, {'id': courseId});
            if (index > -1) {
                const { siteLang } = this.props.store;
                if (!courseNames[index].name) courseNames[index].name = {};
                courseNames[index].name[siteLang] = document.getElementById(`course_name_${courseId}`).value;
                delete courseNames[index][siteLang];

                localStorage.courseNames = JSON.stringify(courseNames);
                this.setState({courseNames});
            }
        }
    };

    selectUnit = (unit)=> {
        document.getElementById(`unit_name_${unit.courseId}`).value = unit.name;
        document.getElementById(`unit_url_${unit.courseId}`).value = unit.url;
        this.setState({ currentUnitId: unit.id})
    };

    cutUnit = (unit)=> {
        this.setState({ currentUnitId: unit.id})
    };

    collapse = (courseKey) => {
        const { openedCourses } = this.state;
        const index = indexOf(openedCourses, courseKey);
        if (index > -1) {
            openedCourses.splice(index, 1);
            this.setState({openedCourses})
        } else {
            openedCourses.push(courseKey);
            this.setState({openedCourses})
        }
    }

    handleClose = () => {
        this.setState( { showModal: false, currentCourseId: 0, currentUnitId: 0 })
    }

    handleShow = (currentCourseId = 0, currentUnitId = 0) => {
        this.setState( { showModal: true, currentCourseId, currentUnitId})
    }

    setLearnedLang = (lang) => {
        const {
            currentUnitId,
            currentCourseId
        } = this.state;

        if (currentCourseId) {
            const index = findIndex(courseNames, {'id': currentCourseId});
            if (index > -1) {
                if (!courseNames[index].learnedLang) {
                    courseNames[index].learnedLang = [];
                }
                const langIndex = indexOf(courseNames[index].learnedLang, lang);

                if (langIndex > -1){
                    courseNames[index].learnedLang.splice(langIndex, 1);
                } else {
                    courseNames[index].learnedLang.push(lang)
                }

                localStorage.courseNames = JSON.stringify(courseNames);
                this.setState({courseNames});
            }
        }

        if (currentUnitId) {
            const index = findIndex(courseUnits, {'id': currentUnitId});
            if (index > -1) {
                if (!courseUnits[index].learnedLang) {
                    courseUnits[index].learnedLang = [];
                }
                const langIndex = indexOf(courseUnits[index].learnedLang, lang);

                if (langIndex > -1){
                    courseUnits[index].learnedLang.splice(langIndex, 1);
                } else {
                    courseUnits[index].learnedLang.push(lang)
                }

                localStorage.courseUnits = JSON.stringify(courseUnits);
                this.setState({courseUnits});
            }
        }
    }

    render() {
        const { siteLang, userData, learnedLang } = this.props.store;
        const {
            selectedCourses,
            currentUnitId,
            currentCourseId,
            openedCourses,
            showModal,
            courseNames
        } = this.state;
        const unfoldContent = get(content, `unfoldContent[${siteLang}]`);
        const foldContent = get(content, `foldContent[${siteLang}]`);
        const parsedUserData = userData ? JSON.parse(userData) : {};
        const isAdmin = get(parsedUserData, `isAdmin`);

        return (
            <>
                <Container className="above-footer">
                    <Row>
                        <Col sm={1}>
                            <div><img src={require("../../images/paint.png")} alt="" className="paint-left"/></div>
                        </Col>
                        <Col sm={10}>
                            {map(courseNames, (course, courseKey) => {
                                if (!isAdmin) {
                                    if (!course.learnedLang || !includes(course.learnedLang, learnedLang)) {
                                        return;
                                    }
                                }
                                return (
                                    <Fragment key={courseKey}>
                                        {!isAdmin && (
                                            <h1>
                                                {course.name[siteLang]}
                                            </h1>
                                        )}
                                        {isAdmin && (
                                            <Row>
                                                <Col sm={2}>
                                                    <Button
                                                        className="button-style course"
                                                        variant="light"
                                                        onClick={() => this.saveCourse(course.id)}
                                                    >
                                                        <Save/>
                                                    </Button>
                                                    <Button
                                                        className="button-style course margin-left"
                                                        variant="outline-success"
                                                        onClick={() => this.handleShow(course.id)}
                                                    >
                                                        <FlagFill/>
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <FormControl
                                                        className="course"
                                                        type="text"
                                                        id={`course_name_${course.id}`}
                                                        defaultValue={course.name[siteLang]}
                                                    />
                                                </Col>`
                                                <Col sm={1}>
                                                    <Button
                                                        className="button-style course"
                                                        variant='danger'
                                                        onClick={() => this.deleteCourse(course)}
                                                    >
                                                        <Trash2Fill/>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        )}
                                        <Accordion>
                                            <Card>
                                                <Accordion.Toggle
                                                    as={Button}
                                                    onClick={() => this.collapse(courseKey)}
                                                    variant="info"
                                                    eventKey={courseKey}
                                                >
                                                    {includes(openedCourses, courseKey) ? foldContent : unfoldContent}
                                                </Accordion.Toggle>
                                                <Accordion.Collapse
                                                    eventKey={courseKey}
                                                >
                                                    <Card.Body>
                                                        {map(courseUnits, (item, key) => {
                                                            if (!isAdmin) {
                                                                if (!item.learnedLang || !includes(item.learnedLang, learnedLang)) {
                                                                    return;
                                                                }
                                                            }
                                                            if (item.courseId !== course.id) return null;

                                                            let checked = false;
                                                            map(selectedCourses, (course) => {
                                                                if (course === item.id) return checked = true;
                                                            });
                                                            const rowClassName = currentUnitId === item.id
                                                                ? "main selected" : "main"
                                                            return (
                                                                <Row
                                                                    key={key}
                                                                    className={rowClassName}
                                                                >
                                                                    {isAdmin &&
                                                                        <Col sm={3}>
                                                                            <Button
                                                                                className="button-style"
                                                                                variant='light'
                                                                                onClick={() => this.selectUnit(item)}
                                                                            >
                                                                                <Pen/>
                                                                            </Button>
                                                                            <Button
                                                                                className="button-style scissors"
                                                                                variant="outline-success"
                                                                                onClick={() => this.handleShow(0, item.id)}
                                                                            >
                                                                                <FlagFill/>
                                                                            </Button>
                                                                            <Button
                                                                                className="button-style scissors"
                                                                                variant='outline-dark'
                                                                                onClick={() => this.cutUnit(item)}
                                                                            >
                                                                                <Scissors/>
                                                                            </Button>
                                                                        </Col>
                                                                    }
                                                                    <Col sm={1}>
                                                                        <Form.Check
                                                                            className="button-style"
                                                                            type="checkbox"
                                                                            onChange={() => this.onChangeCheck(item.id)}
                                                                            checked={checked}
                                                                        />
                                                                    </Col>
                                                                    <Col>
                                                                        <Link to={`/course${item.url}`}>
                                                                            <Card.Body children={item.name}/>
                                                                        </Link>
                                                                    </Col>
                                                                    {isAdmin &&
                                                                        <Col sm={1}>
                                                                            <Button
                                                                                className="button-style"
                                                                                variant='danger'
                                                                                onClick={() => this.delete(item)}
                                                                            >
                                                                                <Trash2Fill/>
                                                                            </Button>
                                                                        </Col>
                                                                    }
                                                                </Row>
                                                            )
                                                        })}
                                                        {isAdmin &&
                                                            <Row
                                                                className="margin-top"
                                                            >
                                                                <Col sm={1}>
                                                                    <Button
                                                                        variant="light"
                                                                        onClick={() => this.addEditUnit(course.id)}
                                                                    >
                                                                        {currentUnitId
                                                                            ? <Save/>
                                                                            : <PlusCircle/>
                                                                        }
                                                                    </Button>
                                                                </Col>
                                                                <Col>
                                                                    <FormControl
                                                                        type="text"
                                                                        id={`unit_name_${course.id}`}
                                                                        placeholder="name"
                                                                    />
                                                                </Col>
                                                                <Col>
                                                                    <FormControl
                                                                        type="text"
                                                                        id={`unit_url_${course.id}`}
                                                                        placeholder="url"
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        }
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                    </Fragment>
                                )
                            })}
                        </Col>
                        <Col sm={1} className="behind">
                            <div><img src={require("../../images/paint.png")} alt="" className="paint-right"/></div>
                        </Col>
                    </Row>
                    {isAdmin && (
                        <Row className="margin-top">
                            <Col sm={1}/>
                            <Col sm={2}>
                                <Button
                                    className="button-style"
                                    variant="light"
                                    onClick={this.addCourse}
                                >
                                    <PlusCircle/>
                                </Button>
                            </Col>
                            <Col>
                                <FormControl
                                    type="text"
                                    id="course_name"
                                />
                            </Col>
                            <Col sm={1}/>
                        </Row>
                    )}
                </Container>

                <Modal show={showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {map(langType, (item, key) => {
                            let checked = false;
                            if (currentCourseId) {
                                const index = findIndex(courseNames, {'id': currentCourseId});
                                if (index > -1) {
                                    checked = includes(courseNames[index].learnedLang, key)
                                }
                            }
                            if (currentUnitId) {
                                const index = findIndex(courseUnits, {'id': currentUnitId});
                                if (index > -1) {
                                    checked = includes(courseUnits[index].learnedLang, key)
                                }
                            }
                            return item.learnedLang
                                ? <Form.Check
                                    key={key}
                                    className="button-style"
                                    type="checkbox"
                                    onChange={() => this.setLearnedLang(key)}
                                    checked={checked}
                                    label={key}
                                />
                                : null
                        })}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
};

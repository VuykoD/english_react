import React, {Component, Fragment} from 'react';
import get from 'lodash/get';
import map from 'lodash/map';
import filter from 'lodash/filter';
import findIndex from 'lodash/findIndex';
import {Badge, Button, Col, Container, Form, ProgressBar, Row} from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl';

import '../../scc/learning.css';

import courseItems from '../../dict/courseItems';
import courseUnits from '../../dict/courseUnits';

const content = {
    new: {
        ru: "Поехали",
        ukr: "Поїхали",
    },
    eng: {
        ru: "Озвучивать английскую",
        ukr: "Озвучувати англійську",
    },
    pol: {
        ru: "Озвучивать польску",
        ukr: "Озвучувати польську",
    },
    countRepeat: {
        ru: "Фраз слов повторять",
        ukr: "Фраз слів повторювати",
    },
    repeatAll: {
        ru: "Повторять всё",
        ukr: "Повторювати все",
    },
    source: {
        ru: "Источник",
        ukr: "Джерело",
    },
};

const initialState = {
    exampleLearning: null,
    cycleLearning: null,
    showTranslation: true,
    learnNumber: 0,
    english: '',
    polish: '',
    translation: '',
    newLearnNumber: +localStorage.newLearnNumber || 5,
    entity: null,
    start: null,
    end: null,
    fileName: '',
    learnEng: true,
    learnPol: true,
    isRepeatAll: false
}

export default class Learning extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...initialState
        };
        this.englishArr = [];
        this.learnArr = [];
        this.timeoutClearState = null;
        this.timeoutNextItem = null;
        this.timeoutResetExampleLearning = null;
    }

    componentDidMount() {
        keyListener.call(this);
        this.getVoices();
    }

    componentWillUnmount() {
        this.clearTimeOut();
    }

    clearTimeOut = () => {
        clearTimeout(this.timeoutClearState);
        clearTimeout(this.timeoutNextItem);
        clearTimeout(this.timeoutResetExampleLearning);
    }

    getVoices() {
        window.speechSynthesis.onvoiceschanged = () => {
            const voices = window.speechSynthesis.getVoices();
            this.filteredEngVoices = filter(voices, voice => {
                    return voice.lang.substr(0, 2) === "en"
                }
            );
            this.filteredPolVoices = filter(voices, voice => {
                    return voice.lang.substr(0, 2) === "pl"
                }
            );
        };
    }

    resetExampleLearning = () => {
        this.setState({exampleLearning: null})
    };

    setInitialData = () => {
        this.englishArr = [];
        this.learnArr = [];
        this.timeoutClearState = null;
        this.timeoutNextItem = null;
        this.timeoutResetExampleLearning = null;
        this.clearTimeOut();
        this.setState({...initialState});
    }

    speakTxt = () => {
        speak.call(this);
    };

    newLearn = () => {
        this.getLearnArray(this.state.newLearnNumber);
        if (!this.learnArr) return;
        this.setEngAndTransl(this.state.learnNumber);
        this.setState({cycleLearning: 'new', exampleLearning: 'phase_5'});
        this.nextItem();
    };

    getLearnArray = (sliceNumber) => {
        const localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : null;
        this.learnArr = localProgress ? localProgress.slice(0, sliceNumber) : null;

        map(this.learnArr, (item, key) => {
            if (item.entity === 'course') {
                const index = findIndex(courseItems, {'id': item.entity_id});
                this.learnArr[key].eng = get(courseItems, `[${index}].eng`);
                this.learnArr[key].pol = get(courseItems, `[${index}].pol`);
                this.learnArr[key].transl = get(courseItems, `[${index}].transl`);
                this.learnArr[key].courseId = get(courseItems, `[${index}].unitId`);
                const courseIndex = findIndex(courseUnits, {'id': this.learnArr[key].courseId});
                this.learnArr[key].topicName = get(courseUnits, `[${courseIndex}].name`);
            }
        })
    };

    setTimeoutTime =(learnNumber)=>{
        const word = get(this.learnArr, `[${learnNumber}].eng`, '');
        const { learnPol, learnEng } = this.state;
        const coef = learnPol && learnEng ? 0.9 : 1.6;
        const wordLength = Math.round(word.length / coef);
        let timeoutTime = wordLength > 10 ? wordLength : 10;
        if(timeoutTime > 45) timeoutTime = 45;
        return timeoutTime;
    }


    nextItem = () => {
        const { learnNumber } = this.state;
        const timeoutTime = this.setTimeoutTime(learnNumber);

        clearTimeout(this.timeoutNextItem);
        if (learnNumber < this.learnArr.length - 1) {
            this.timeoutNextItem = setTimeout(() => {
                const nextNumber = learnNumber + 1;
                this.setEngAndTransl(nextNumber);
                this.nextItem();
            }, timeoutTime * 1000);
        } else {
            this.timeoutNextItem = setTimeout(() => {
                this.setInitialData();
            }, timeoutTime * 1000);
        }
    };

    setEngAndTransl = (learnNumber, changedState) => {
        const entity = get(this.learnArr, `${learnNumber}.entity`);
        let english = get(this.learnArr, `${learnNumber}.eng`, '');
        english = english.replace(/^\s*/, '').replace(/\s*$/, '').replace(/\s+/g, ' ').trim();
        let polish = get(this.learnArr, `${learnNumber}.pol`, '');
        polish = polish.replace(/^\s*/, '').replace(/\s*$/, '').replace(/\s+/g, ' ').trim();
        const translation = get(this.learnArr, `${learnNumber}.transl`);

        this.setState({
            english, polish, translation, entity, learnNumber,
            exampleLearning: changedState || this.state.exampleLearning
        })
    };

    changeNewLearnNumber = (e) => {
        const val = e.target.value;
        localStorage.newLearnNumber = val || 0;
        this.setState({newLearnNumber: +val || 0});
    };

    changeEngCheck = () =>{
        this.setState({learnEng: !this.state.learnEng});
    }

    changePolCheck = () =>{
        this.setState({learnPol: !this.state.learnPol});
    }

    repeatAll = () =>{
        const { isRepeatAll } = this.state;
        if (!isRepeatAll) {
            const localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : null;
            if (localProgress && localProgress.length){
                localStorage.newLearnNumber = localProgress.length;
                this.setState({newLearnNumber: localProgress.length, isRepeatAll: true});
            }
        } else {
            this.setState({isRepeatAll: false});
        }
    }

    getTopic = () => {
        const {siteLang} = this.props.store;
        const {learnNumber} = this.state;
        const source = get(content, `source[${siteLang}]`);
        const topicTxt = get(this.learnArr, `[${learnNumber}].topicName`, '');
        return (
            <h5>
                <Badge variant="light" bsPrefix='source'>
                    {source}: {topicTxt}
                </Badge>
            </h5>
        );
    };

    render() {
        const {
            newLearnNumber,
            exampleLearning, cycleLearning,
            english, polish, translation,
            learnEng, learnPol, isRepeatAll
        } = this.state;
        const {siteLang} = this.props.store;
        const newLearn = get(content, `new[${siteLang}]`);
        const eng = get(content, `eng[${siteLang}]`);
        const pol = get(content, `pol[${siteLang}]`);
        const countRepeat = get(content, `countRepeat[${siteLang}]`);
        const repeatAll = get(content, `repeatAll[${siteLang}]`);

        const isSound = checkIsSound.call(this);
        if (isSound) speak.call(this);

        return (
            <Container className='new-container'>
                {!exampleLearning && !cycleLearning &&
                <Fragment>
                    <Row>
                        <Col>
                            <Form.Group controlId="learnEng">
                                <Form.Check type="checkbox" label={eng} checked={learnEng} onChange={this.changeEngCheck}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="learnPol">
                                <Form.Check type="checkbox" label={pol} checked={learnPol} onChange={this.changePolCheck}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="info" block onClick={this.newLearn}>
                                {newLearn}
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <span children={countRepeat} />
                            <FormControl
                                type="number"
                                value={newLearnNumber}
                                onChange={this.changeNewLearnNumber}
                            />
                        </Col>
                        <Col>
                            <Form.Group controlId="isRepeatAll">
                                <Form.Check type="checkbox" label={repeatAll} checked={isRepeatAll} onChange={this.repeatAll}/>
                            </Form.Group>
                        </Col>
                    </Row>
                </Fragment>
                }
                <Row className="text-center new-row">
                    {exampleLearning &&
                        <Col>
                            {this.getTopic()}
                            {soundButton.call(this)}
                            {getBadge(translation, "secondary")}
                            {getProgressBar.call(this)}
                            {getBadge(english, "light")}
                            {learnPol && getBadge(polish, "light")}
                        </Col>
                    }
                </Row>
            </Container>
        );
    }
}

export function soundButton() {
    let btn = null;
    const isSound = checkIsSound.call(this);
    if (isSound) {
        const {siteLang} = this.props.store;
        const pressButton = get(content, `pressButton[${siteLang}]`);
        btn = (
            <Button
                variant="success"
                className="title_sound"
                title={pressButton}
                onClick={this.speakTxt}
            >
                <img src={require("../../images/Sound.png")} className="title_sound" alt=''/>
            </Button>
        )
    }
    return btn
}

export function getBadge(txt, variant) {
    if (!txt) return null;

    return (
        <h3>
            <Badge variant={variant} className="white-space">{txt}</Badge>
        </h3>
    );
}

export function getProgressBar() {
    const { exampleLearning, learnNumber } = this.state;

    let progress = null;
    const timeoutTime = this.setTimeoutTime(learnNumber);

    if (exampleLearning === 'phase_5' || exampleLearning === 'word_5') {
        progress = (
            <Row>
                <Col sm={3}/>
                <Col>
                    {`${learnNumber + 1}/${timeoutTime}`}
                    <div className="view_port">
                        <ProgressBar id='progressBar' animated now={100} className="c_eye"/>
                    </div>
                </Col>
                <Col sm={3}/>
            </Row>
        )
    }
    return progress
}

export function speak() {
    const {english, polish, learnPol, learnEng} = this.state;

    //comp eng
    if (english && learnEng){
        if (!this.filteredEngVoices || !this.filteredEngVoices.length) this.getVoices();
        const utterance = new SpeechSynthesisUtterance(english);
        const randomVoice = this.filteredEngVoices ? Math.floor(Math.random() * this.filteredEngVoices.length) : null;
        utterance.voice = randomVoice ? this.filteredEngVoices[randomVoice] : null;
        if (!utterance.voice) utterance.lang = 'en';
        speechSynthesis.speak(utterance);
    }

    //comp pol
    if (polish && learnPol){
        if (!this.filteredPolVoices || !this.filteredPolVoices.length) this.getVoices();
        const utterance = new SpeechSynthesisUtterance(polish);
        utterance.voice = get(this.filteredPolVoices, '[0]');
        if (!utterance.voice) utterance.lang = 'en';
        speechSynthesis.speak(utterance);
    }
}

export function checkIsSound() {
    const {exampleLearning} = this.state;

    return exampleLearning === 'word_5' || exampleLearning === 'phase_5';
}

export function keyListener() {
    document.addEventListener('keydown', (event) => {
        const exampleLearningState = this.state.exampleLearning;
        const keyCode = event.keyCode;

        if (keyCode === 32) this.speakTxt();
        if (keyCode === 49 && !exampleLearningState && get(document, 'activeElement.tagName') !== 'INPUT') this.newLearn();

    });
}

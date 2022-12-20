import React, {Component, Fragment} from 'react';
import get from 'lodash/get';
import map from 'lodash/map';
import filter from 'lodash/filter';
import findIndex from 'lodash/findIndex';
import {Badge, Button, Col, Container, Form, ProgressBar, Row} from 'react-bootstrap';
//
import '../../scc/learning.css';

import courseItems from '../../dict/courseItems';
import courseUnits from '../../dict/courseUnits';

const content = {
    repeat: {
        ru: "Слушать и повторять",
        ukr: "Слухати і повторювати",
    },
    write: {
        ru: "Писать",
        ukr: "Писати",
    },
    eng: {
        ru: "Озвучивать английскую",
        ukr: "Озвучувати англійську",
    },
    pol: {
        ru: "Озвучивать польску",
        ukr: "Озвучувати польську",
    },
    translEng: {
        ru: "Показать английский",
        ukr: "Показати англійську",
    },
    translRus: {
        ru: "Показать русский",
        ukr: "Показати російську",
    },
    translPol: {
        ru: "Показать польский",
        ukr: "Показати польську",
    },
    countRepeat: {
        ru: "Фраз слов повторять",
        ukr: "Фраз слів повторювати",
    },
    source: {
        ru: "Источник",
        ukr: "Джерело",
    },
    selectAll: {
        ru: "Выбрать все",
        ukr: "Вибрати все",
    },
};

const initialState = {
    exampleLearning: null,
    cycleLearning: null,
    showRus: false,
    showEng: true,
    showPol: false,
    learnNumber: 0,
    english: '',
    polish: '',
    rus: '',
    start: null,
    end: null,
    fileName: '',
    learnEng: false,
    learnPol: true,
    isRepeatAll: false,
    mistake: 0,
    mistakeRewrite: 0
}

const MAX_WORD_LENGTH = 20;

export default class Learning extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...initialState
        };
    }

    componentDidMount() {
        this.getVoices();
        this.repeatAll();
        this.setInitialData();
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

    onChangeInput = () => {
        changedInput.call(this);
    };

    setInitialData = () => {
        this.mistakeArr = [];
        this.learnArr = [];
        this.timeoutClearState = null;
        this.timeoutNextItem = null;
        this.timeoutResetExampleLearning = null;
        this.repeatMistakes = false;
        this.clearTimeOut();
        this.setState({...initialState});
    }

    speakTxt = () => {
        speak.call(this);
    };

    soundAndRepeat = () => {
        this.getVoices();
        this.getLearnArray(this.state.newLearnNumber);
        if (!this.learnArr) return;
        this.setEngAndTransl(this.state.learnNumber);
        this.setState({cycleLearning: 'new', exampleLearning: 'example_sound_repeat'});
        this.nextSoundAndRepeatItem();
    };

    write = () => {
        this.getLearnArray(this.state.newLearnNumber);
        if (!this.learnArr) return;
        this.setState({cycleLearning: 'new', exampleLearning: 'write'});
        this.setEngAndTransl(this.state.learnNumber, MAX_WORD_LENGTH);
    };

    getLearnArray = (sliceNumber) => {
        const localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : null;
        this.learnArr = localProgress ? localProgress.slice(0, sliceNumber) : null;

        map(this.learnArr, (item, key) => {
            const index = findIndex(courseItems, {'id': item.entity_id});
            this.learnArr[key].eng = get(courseItems, `[${index}].eng`);
            this.learnArr[key].pol = get(courseItems, `[${index}].pol`);
            this.learnArr[key].transl = get(courseItems, `[${index}].transl`);
            this.learnArr[key].courseId = get(courseItems, `[${index}].unitId`);
            const courseIndex = findIndex(courseUnits, {'id': this.learnArr[key].courseId});
            this.learnArr[key].topicName = get(courseUnits, `[${courseIndex}].name`);
        })
    };

    setTimeoutTime =(learnNumber)=>{
        const word = get(this.learnArr, `[${learnNumber}].eng`, '');
        const wordLength = Math.round(word.length / 1.3);
        let timeoutTime = wordLength > 10 ? wordLength : 10;
        if(timeoutTime > 45) timeoutTime = 45;
        return timeoutTime;
    }


    nextSoundAndRepeatItem = () => {
        const { learnNumber } = this.state;
        const timeoutTime = this.setTimeoutTime(learnNumber);

        clearTimeout(this.timeoutNextItem);
        if (learnNumber < this.learnArr.length - 1) {
            this.timeoutNextItem = setTimeout(() => {
                const nextNumber = learnNumber + 1;
                this.setEngAndTransl(nextNumber);
                this.nextSoundAndRepeatItem();
            }, timeoutTime * 1000);
        } else {
            this.timeoutNextItem = setTimeout(() => {
                this.setInitialData();
            }, timeoutTime * 1000);
        }
    };

    setEngAndTransl = (learnNumber, maxLength) => {
        const {learnPol} = this.state;
        let english = get(this.learnArr, `${learnNumber}.eng`, '');
        english = english.replace(/^\s*/, '').replace(/\s*$/, '').replace(/\s+/g, ' ').trim();
        let polish = get(this.learnArr, `${learnNumber}.pol`, '');
        polish = polish.replace(/^\s*/, '').replace(/\s*$/, '').replace(/\s+/g, ' ').trim();
        const rus = get(this.learnArr, `${learnNumber}.transl`);
        if (!rus){
            this.repeatMistakes = true;
        }
        if (maxLength){
            let wordToLearn = english;
            if (learnPol) wordToLearn = polish;
            wordToLearn = wordToLearn.toUpperCase();

            if (wordToLearn.length > maxLength){
                const nextNumber = learnNumber + 1;
                this.setEngAndTransl(nextNumber, MAX_WORD_LENGTH);
                return;
            }
        }

        this.setState({
            english,
            polish,
            rus,
            learnNumber,
            mistake: 0
        });
    };

    changeEngCheck = () =>{
        this.setState({learnEng: true, learnPol: false});
    }

    changePolCheck = () =>{
        this.setState({learnEng: false, learnPol: true});
    }

    repeatAll = () =>{
        const localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : null;
        if (localProgress && localProgress.length){
            this.setState({
                newLearnNumber: localProgress.length || 0,
                learnNumber: localProgress.length || 0,
            });
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

    showEng = () => {
        this.setState({showEng: true, showPol: false, showRus: false});
    }

    showPol = () => {
        this.setState({showEng: false, showPol: true, showRus: false});
    }

    showRus = () => {
        this.setState({showEng: false, showPol: false, showRus: true});
    }

    render() {
        const {
            newLearnNumber,
            exampleLearning,
            cycleLearning,
            english,
            polish,
            rus,
            learnEng,
            learnPol,
            mistake,
            showRus,
            showEng,
            showPol
        } = this.state;
        const {siteLang} = this.props.store;
        const repeat = get(content, `repeat[${siteLang}]`);
        const write = get(content, `write[${siteLang}]`);
        const eng = get(content, `eng[${siteLang}]`);
        const pol = get(content, `pol[${siteLang}]`);
        const translEng = get(content, `translEng[${siteLang}]`);
        const translRus = get(content, `translRus[${siteLang}]`);
        const translPol = get(content, `translPol[${siteLang}]`);
        const countRepeat = get(content, `countRepeat[${siteLang}]`);
        let badge = '';
        if (showRus) badge = rus;
        if (showEng) badge = english;
        if (showPol) badge = polish;

        const isSound = checkIsSound.call(this);
        if (isSound) speak.call(this);

        return (
            <Container className='new-container'>
                {!exampleLearning && !cycleLearning &&
                <Fragment>
                    <Row className="rows">
                        <Col>
                            <Form.Group controlId="learnEng">
                                <Form.Check type="radio" label={eng} checked={learnEng} onChange={this.changeEngCheck}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="learnPol">
                                <Form.Check type="radio" label={pol} checked={learnPol} onChange={this.changePolCheck}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <span children={`${countRepeat} ${newLearnNumber}`} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="info" block onClick={this.soundAndRepeat}>
                                {repeat}
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="info" block onClick={this.write}>
                                {write}
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="translEng">
                                <Form.Check type="radio" label={translEng} checked={showEng} onChange={this.showEng}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="translRus">
                                <Form.Check type="radio" label={translRus} checked={showRus} onChange={this.showRus}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="translPol">
                                <Form.Check type="radio" label={translPol} checked={showPol} onChange={this.showPol}/>
                            </Form.Group>
                        </Col>
                    </Row>
                </Fragment>
                }
                <Row className="text-center new-row rows">
                    {exampleLearning &&
                        <Col>
                            {this.getTopic()}
                            {soundButton.call(this)}
                            {getBadge(badge, "secondary")}
                            {getProgressBar.call(this)}
                            {(exampleLearning === 'example_sound_repeat' || mistake > 2) &&
                                <>
                                    {learnEng && getBadge(english, "light")}
                                    {learnPol && getBadge(polish, "light")}
                                </>
                            }
                            {exampleLearning === 'write' && getInput.call(this)}
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

    if (exampleLearning === 'example_sound_repeat') {
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

    return exampleLearning === 'example_sound_repeat';
}

export function getInput() {
    return (
        <Row>
            <Col sm={3}/>
            <Col>
                <Form.Control
                    id='formInput'
                    type="text"
                    className="mr-sm-2 search"
                    onChange={this.onChangeInput}
                />
            </Col>
            <Col sm={3}/>
        </Row>
    );
}

export function changedInput() {
    const {english, polish, learnPol, mistake, learnNumber, mistakeRewrite} = this.state;
    const formInput = document.getElementById('formInput');
    let word = get(formInput, 'value');
    word = word.toUpperCase();
    let wordToLearn = english;
    if (learnPol) wordToLearn = polish;
    wordToLearn = wordToLearn.toUpperCase();
    if (!wordToLearn) this.repeatMistakes = true;

    if (wordToLearn === word || wordToLearn.length > MAX_WORD_LENGTH || !wordToLearn) {
        document.getElementById("formInput").value = '';
        this.setEngAndTransl(learnNumber + 1, MAX_WORD_LENGTH);
        if (learnNumber >= this.learnArr.length || this.repeatMistakes) {
            this.repeatMistakes = true;
            if(mistakeRewrite < this.mistakeArr.length) {
                const nextNumber = this.mistakeArr[mistakeRewrite];
                this.setState({mistakeRewrite: mistakeRewrite + 1});
                this.setEngAndTransl(nextNumber);
            }

            if (mistakeRewrite >= this.mistakeArr.length) {
                this.setInitialData();
            }
        }

    }

    if (wordToLearn.slice(0, word.length) !== word){
        word = (word.slice(0, word.length - 1));
        document.getElementById("formInput").value = word;
        this.setState({mistake: mistake + 1});
        if (this.mistakeArr[this.mistakeArr.length - 1] !== learnNumber){
            this.mistakeArr.push(learnNumber);
            console.log(this.mistakeArr);
        }
        this.mistakeArr = this.mistakeArr.filter(onlyUnique);
    }
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

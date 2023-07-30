import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import map from 'lodash/map';
import filter from 'lodash/filter';
import findIndex from 'lodash/findIndex';
import {Badge, Button, Col, Container, Form, ProgressBar, Row} from 'react-bootstrap';
//
import '../../scc/learning.css';
import courseItemsJson from '../../dict/courseItems';
import getCourseItems, { getCourseUnits } from '../../dict/getCourseItems';
import { shuffle } from '../user-page/user-data/user-dictionary';

let courseItems = getCourseItems();
let courseUnits = getCourseUnits();

const content = {
    repeat: {
        ru: "Слушать и повторять",
        ukr: "Слухати і повторювати",
    },
    write: {
        ru: "Писать",
        ukr: "Писати",
    },
    sort: {
        ru: "Сортировать",
        ukr: "Сортувати",
    },
    eng: {
        ru: "Озвучивать английскую",
        ukr: "Озвучувати англійську",
    },
    pol: {
        ru: "Озвучивать польску",
        ukr: "Озвучувати польську",
    },
    soundRus: {
        ru: "Озвучивать русский",
        ukr: "Озвучувати російську",
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
        ru: "На изучении",
        ukr: "На вивченні",
    },
    source: {
        ru: "Источник",
        ukr: "Джерело",
    },
    selectAll: {
        ru: "Выбрать все",
        ukr: "Вибрати все",
    },
    recordWithoutHints: {
        ru: "рекорд без подсказок",
        ukr: "рекорд без підказок",
    },
    speedRepeat: {
        ru: "Ускоренное повторение",
        ukr: "Прискорене повторення",
    },
    resetRecord: {
        ru: "Обнулить рекорд",
        ukr: "Обнулити рекорд",
    },
    saveTranslation: {
        ru: "Сохранить перевод",
        ukr: "Зберегти переклад",
    },
};

const initialState = {
    exampleLearning: null,
    cycleLearning: null,
    showRus: !!localStorage.showRus,
    showEng: !!localStorage.showEng,
    showPol: !!localStorage.showPol,
    learnNumber: 0,
    english: '',
    polish: '',
    rus: '',
    start: null,
    end: null,
    fileName: '',
    learnEng: !!localStorage.learnEng,
    learnPol: !!localStorage.learnPol,
    soundRus: !!localStorage.soundRus,
    isRepeatAll: false,
    mistake: 0,
    mistakeRewrite: 0,
    record: 0,
    changeToInput: false
}

const MAX_WORD_LENGTH = 100;

class LearningClass extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            ...initialState
        };
    }

    componentDidMount() {
        this.updateLP();
        this.setInitialData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {showRus, showEng, showPol, learnEng, learnPol, soundRus} = this.state;
        if (
            showRus !== !!localStorage.showRus ||
            showEng !== !!localStorage.showEng ||
            showPol !== !!localStorage.showPol ||
            learnEng !== !!localStorage.learnEng ||
            learnPol !== !!localStorage.learnPol ||
            soundRus !== !!localStorage.soundRus
        ){
            this.setState({
                showRus: !!localStorage.showRus,
                showEng: !!localStorage.showEng,
                showPol: !!localStorage.showPol,
                learnEng: !!localStorage.learnEng,
                learnPol: !!localStorage.learnPol,
                soundRus: !!localStorage.soundRus
            });
        }
    }

    componentWillUnmount() {
        this.clearTimeOut();
    }

    clearTimeOut = () => {
        clearTimeout(this.timeoutClearState);
        clearTimeout(this.timeoutNextItem);
        clearTimeout(this.timeoutResetExampleLearning);
    }

    handleKeyDown = (e) => {
        if (e.keyCode === 18) speak.call(this)
    }

    updateLP = () => {
        this.getVoices();
        this.repeatAll();
    }

    getVoices() {
        const voices = window.speechSynthesis.getVoices();
        this.filteredEngVoices = filter(voices, voice => {
                return voice.lang.substr(0, 2) === "en"
            }
        );
        this.filteredPolVoices = filter(voices, voice => {
                return voice.lang.substr(0, 2) === "pl"
            }
        );
        this.filteredRusVoices = filter(voices, voice => {
                return voice.lang.substr(0, 2) === "ru"
            }
        );
    }

    onChangeInput = () => {
        changedInput.call(this);
    };

    onSaveRus = () => {
        const changeRus = document.getElementById('changeRus');
        let newRus = get(changeRus, 'value');
        const { rus } = this.state;

        const index = findIndex(courseItems, {'transl': rus});
        if (index > -1) {
            courseItems[index].transl = newRus;
            localStorage.courseItems = JSON.stringify(courseItems);
        }

        const indexLearnArray = findIndex(this.learnArr, {'transl': rus});
        if (indexLearnArray > -1 && this.learnArr[indexLearnArray]) {
            this.learnArr[indexLearnArray].transl = newRus;
        }

        this.setState({
            changeToInput: false,
            rus: newRus
        });
    };

    onSavePol = () => {
        const formInput = document.getElementById('formInput');
        let newPol = get(formInput, 'value');
        const { polish } = this.state;

        const index = findIndex(courseItems, {'pol': polish});
        if (index > -1) {
            courseItems[index].pol = newPol;
            localStorage.courseItems = JSON.stringify(courseItems);
            document.getElementById("formInput").value = '';
        }

        const indexLearnArray = findIndex(this.learnArr, {'pol': polish});
        if (indexLearnArray > -1 && this.learnArr[indexLearnArray]) {
            this.learnArr[indexLearnArray].pol = newPol;
        }

        this.setState({
            changeToInput: false,
            polish: newPol
        });
    };

    onChangeLengthArray = (event) => {
        const arrLength = event.target.value;
        const localLength = this.localProgress?.length || 0;

        if (arrLength) {
            const newLength = +arrLength < localLength ? +arrLength : localLength
            localStorage.newLearnNumber = newLength;
            this.setState({ newLearnNumber: newLength })
        }
    };

    setInitialData = () => {
        this.mistakeArr = [];
        this.learnArr = [];
        this.timeoutClearState = null;
        this.timeoutNextItem = null;
        this.timeoutResetExampleLearning = null;
        this.repeatMistakes = false;
        this.soundAndRepeatCoef = 1.6;
        this.clearTimeOut();
        this.setState({...initialState});
    }

    speakTxt = () => {
        speak.call(this);
    };

    soundAndRepeat = (arrayLength = this.state.newLearnNumber) => {
        this.getVoices();
        this.getLearnArray(arrayLength);
        if (!this.learnArr) return;
        this.setEngAndTransl(this.state.learnNumber);
        this.setState({cycleLearning: 'new', exampleLearning: 'example_sound_repeat'});
        this.nextSoundAndRepeatItem();
    };

    resetRecord = () => {
        const { record } = this.state;
        this.setState({ record: 0 });
        this.setState({ record });
        localStorage.record = 0;
    };

    speedRepeat = (arrayLength  = this.state.newLearnNumber) => {
        this.soundAndRepeatCoef = 2.6;
        this.soundAndRepeat(arrayLength);
    }

    setSpeedRepeat = () => {
        this.sort();
        localStorage.showPol = '1';
        localStorage.showEng = '';
        localStorage.showRus = '1';
        localStorage.learnPol = '1';
        localStorage.learnEng = '';
        localStorage.soundRus = '';
        localStorage.newLearnNumber = '50';
        document.getElementById("lengthArray").value = '50';
        this.setState({
            showPol: true,
            showEng: false,
            showRus: true,
            learnPol: true,
            learnEng: false,
            soundRus: false,
            newLearnNumber: 50
        });
        this.speedRepeat(50);
    }

    setWrite = () => {
        this.sort();
        localStorage.showPol = '';
        localStorage.showEng = '';
        localStorage.showRus = '1';
        localStorage.learnPol = '1';
        localStorage.learnEng = '';
        localStorage.soundRus = '';
        localStorage.newLearnNumber = '10';
        document.getElementById("lengthArray").value = '10';
        this.setState({
            showPol: false,
            showEng: false,
            showRus: true,
            learnPol: true,
            learnEng: false,
            soundRus: false,
            newLearnNumber: 10
        });
        this.write(10);
    }

    write = (arrayLength = this.state.newLearnNumber) => {
        this.getLearnArray(arrayLength);
        if (!this.learnArr) return;
        this.setState({cycleLearning: 'new', exampleLearning: 'write'});
        this.setEngAndTransl(this.state.learnNumber, MAX_WORD_LENGTH);
    };

    sort = () => {
        let lP = localStorage.progress ? JSON.parse(localStorage.progress) : null;
        if (!lP) return null;
        lP = shuffle(lP);

        localStorage.progress = JSON.stringify(lP);
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
        const word = get(this.learnArr, `[${learnNumber}].pol`, '');
        const wordLength = Math.round(word.length / this.soundAndRepeatCoef);
        const minTime = 13 / this.soundAndRepeatCoef;
        let timeoutTime = wordLength > minTime ? wordLength : minTime;
        if(timeoutTime > 40) timeoutTime = 40;
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
        localStorage.learnEng = this.state.learnEng ? '': '1' ;
        this.setState({ learnEng: !this.state.learnEng });
    }

    changePolCheck = () =>{
        localStorage.learnPol = this.state.learnPol ? '': '1' ;
        this.setState({ learnPol: !this.state.learnPol });
    }

    changeRusCheck = () =>{
        localStorage.soundRus = this.state.soundRus ? '': '1' ;
        this.setState({ soundRus: !this.state.soundRus });
    }

    repeatAll = () =>{
        this.localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : null;

        if (this.localProgress && this.localProgress.length){
            this.setState({
                newLearnNumber: +localStorage.newLearnNumber || this.localProgress.length || 0,
                learnNumber: this.localProgress.length || 0,
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

    record = () => {
        const {siteLang} = this.props.store;
        const resetRecord = get(content, `resetRecord[${siteLang}]`);
        const recordWithoutHints = get(content, `recordWithoutHints[${siteLang}]`);
        const {record} = this.state;
        if (localStorage.record < record || !localStorage.record) {
            localStorage.record = record;
        }

        return (
            <Row className="new-row">
                <Col sm={3}/>
                <Col>
                    <div children={`${recordWithoutHints} - ${record}/${localStorage.record || 0}`} className="record"/>
                </Col>
                <Col sm={3}>
                    <Button variant="info" block onClick={this.resetRecord}>
                        {resetRecord}
                    </Button>
                </Col>
                <Col sm={3}/>
            </Row>
        );
    }

    showEng = () => {
        localStorage.showEng = this.state.showEng ? '' : '1';
        this.setState({showEng: !this.state.showEng});
    }

    showPol = () => {
        localStorage.showPol = this.state.showPol ? '' : '1';
        this.setState({showPol: !this.state.showPol});
    }

    showRus = () => {
        localStorage.showRus = this.state.showRus ? '' : '1';
        this.setState({showRus: !this.state.showRus});
    }

    changeToInput = () => {
        this.setState({changeToInput: true});
    }

    render() {
        const {
            exampleLearning,
            cycleLearning,
            english,
            polish,
            rus,
            learnEng,
            learnPol,
            soundRus,
            mistake,
            showRus,
            showEng,
            showPol,
            changeToInput
        } = this.state;
        const {siteLang} = this.props.store;
        // const repeat = get(content, `repeat[${siteLang}]`);
        const write = get(content, `write[${siteLang}]`);
        const sort = get(content, `sort[${siteLang}]`);
        const eng = get(content, `eng[${siteLang}]`);
        const pol = get(content, `pol[${siteLang}]`);
        const speakRus = get(content, `soundRus[${siteLang}]`);
        const translEng = get(content, `translEng[${siteLang}]`);
        const translRus = get(content, `translRus[${siteLang}]`);
        const translPol = get(content, `translPol[${siteLang}]`);
        const countRepeat = get(content, `countRepeat[${siteLang}]`);
        const speedRepeat = get(content, `speedRepeat[${siteLang}]`);
        const difference = courseItemsJson.length - (this.localProgress?.length || 0);

        const isSound = checkIsSound.call(this);
        if (isSound) speak.call(this);

        return (
            <Container className='new-container'>
                {!exampleLearning && !cycleLearning &&
                <Fragment>
                    <Row className="rows">
                        <Col>
                            <Form.Group controlId="learnEng">
                                <Form.Check label={eng} checked={learnEng} onChange={this.changeEngCheck}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="learnPol">
                                <Form.Check label={pol} checked={learnPol} onChange={this.changePolCheck}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="soundRus">
                                <Form.Check label={speakRus} checked={soundRus} onChange={this.changeRusCheck}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <span children={`${countRepeat} ${this.localProgress?.length || 0}/${courseItemsJson.length} (${difference})`} />
                            <Form.Control
                                id='lengthArray'
                                type="number"
                                onChange={this.onChangeLengthArray}
                                // value={newLearnNumber}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="info" block onClick={this.speedRepeat}>
                                {speedRepeat}
                            </Button>
                        </Col>
                        <Col sm={1} >
                            <Button variant="info" block onClick={this.setSpeedRepeat}>
                                {50}
                            </Button>
                        </Col>
                        {/*<Col>*/}
                        {/*    <Button variant="info" block onClick={this.soundAndRepeat}>*/}
                        {/*        {repeat}*/}
                        {/*    </Button>*/}
                        {/*</Col>*/}
                        <Col>
                            <Button variant="info" block onClick={this.write}>
                                {write}
                            </Button>
                        </Col>
                        <Col sm={1} >
                            <Button variant="info" block onClick={this.setWrite}>
                                {10}
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="info" block onClick={this.sort}>
                                {sort}
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Check type="checkbox" label={translEng} checked={showEng} onChange={this.showEng}/>
                        </Col>
                        <Col>
                            <Form.Check type="checkbox" label={translRus} checked={showRus} onChange={this.showRus}/>
                        </Col>
                        <Col>
                            <Form.Check type="checkbox" label={translPol} checked={showPol} onChange={this.showPol}/>
                        </Col>
                    </Row>
                </Fragment>
                }
                <Row className="text-center new-row rows">
                    {exampleLearning &&
                        <Col>
                            {this.getTopic()}
                            {soundButton.call(this)}
                            {showRus && getBadge.call(this, rus, "light")}
                            {getProgressBar.call(this)}
                            {showEng && getBadge(english, "secondary")}
                            {showPol && getBadge(polish, "secondary")}
                            {(mistake > 2 || changeToInput) &&
                                <>
                                    {learnEng && getBadge(english, "info")}
                                    {learnPol && getBadge(polish, "info")}
                                </>
                            }
                            {exampleLearning === 'write' &&
                                <>
                                    {getInput.call(this)}
                                    {this.record()}
                                </>
                            }
                        </Col>
                    }
                </Row>
            </Container>
        );
    }
}

const Learning = withRouter(LearningClass);

export default Learning;

export function soundButton() {
    const {siteLang} = this.props.store;
    const pressButton = get(content, `pressButton[${siteLang}]`);

    return (
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

export function getBadge(txt, variant) {
    if (!txt) return null;
    const badge = (
        <h3>
            <Badge
                variant={variant}
                className="white-space"
                onDoubleClick={this ? this.changeToInput : null}
            >
                {txt}
            </Badge>
        </h3>
    );

    if (!this) return badge;

    const {siteLang} = this.props.store;
    const saveTranslation = get(content, `saveTranslation[${siteLang}]`);
    const { changeToInput } = this.state;
    const input = (
        <Row>
            <Col sm={1}/>
            <Col>
                <Form.Control
                    id='changeRus'
                    type="text"
                    className="mainInput"
                />
            </Col>
            <Col sm={1}/>
        </Row>
    );
    const saveButton = (
        <Row>
            <Col sm={4}/>
            <Col>
                <Button
                    variant="info"
                    block
                    onClick={this.onSaveRus}
                    className="record"
                >
                    {saveTranslation}
                </Button>
            </Col>
            <Col sm={4}/>
        </Row>
    );

    return changeToInput
        ? (
            <>
                {badge}
                {input}
                {saveButton}
            </>
        )
        : badge;
}

export function getProgressBar() {
    const { exampleLearning, learnNumber, newLearnNumber } = this.state;

    let progress = null;
    const timeoutTime = this.setTimeoutTime(learnNumber);

    if (exampleLearning === 'example_sound_repeat') {
        progress = (
            <Row>
                <Col sm={3}/>
                <Col>
                    {`${learnNumber + 1}(${newLearnNumber})/${timeoutTime}`}
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
    const {english, polish, rus, learnPol, learnEng, soundRus} = this.state;

    //comp eng
    if (english && learnEng){
        if (!this.filteredEngVoices || !this.filteredEngVoices.length) this.getVoices();
        const utterance = new SpeechSynthesisUtterance(english);
        const randomVoice = this.filteredEngVoices ? Math.floor(Math.random() * this.filteredEngVoices.length) : null;
        utterance.voice = randomVoice ? this.filteredEngVoices[randomVoice] : null;
        if (!utterance.voice) utterance.lang = 'en';
        speechSynthesis.speak(utterance);
    }
    if (polish && learnPol){
        if (!this.filteredPolVoices || !this.filteredPolVoices.length) this.getVoices();
        const utterance = new SpeechSynthesisUtterance(polish);
        utterance.voice = get(this.filteredPolVoices, '[0]');
        if (!utterance.voice) utterance.lang = 'en';
        speechSynthesis.speak(utterance);
    }

    //comp rus
    if (soundRus){
        if (!this.filteredRusVoices || !this.filteredRusVoices.length) this.getVoices();
        const utterance = new SpeechSynthesisUtterance(rus);
        utterance.voice = get(this.filteredRusVoices, '[0]');
        if (!utterance.voice) utterance.lang = 'ru';
        speechSynthesis.speak(utterance);
    }
}

export function checkIsSound() {
    const {exampleLearning} = this.state;

    return exampleLearning === 'example_sound_repeat';
}

export function getInput() {
    const { learnNumber, newLearnNumber, changeToInput } = this.state;
    const {siteLang} = this.props.store;
    const saveTranslation = get(content, `saveTranslation[${siteLang}]`);
    const saveButton = (
        <Row>
            <Col sm={4}/>
            <Col>
                <Button
                    variant="info"
                    block
                    onClick={this.onSavePol}
                    className="record"
                >
                    {saveTranslation}
                </Button>
            </Col>
            <Col sm={4}/>
        </Row>
    );

    return (
        <>
            <Row>
                <Col sm={3}/>
                <Col>
                    {`${learnNumber + 1}(${newLearnNumber})`}
                    <Form.Control
                        id='formInput'
                        type="text"
                        className="mainInput"
                        onChange={this.onChangeInput}
                        onKeyDown={this.handleKeyDown}
                        autoFocus
                    />
                </Col>
                <Col sm={3}/>
            </Row>
            {!!changeToInput &&
                saveButton
            }
        </>
    );
}

export function changedInput() {
    const {
        english,
        polish,
        learnPol,
        mistake,
        learnNumber,
        mistakeRewrite,
        record,
        changeToInput
    } = this.state;
    if (changeToInput) return;
    const formInput = document.getElementById('formInput');
    let word = get(formInput, 'value');
    word = word.toUpperCase();
    let wordToLearn = english;
    if (learnPol) wordToLearn = polish;
    wordToLearn = wordToLearn.toUpperCase();
    if (!wordToLearn) this.repeatMistakes = true;
    if (word.length === 1 && !mistake && wordToLearn.slice(0, word.length) === word) {
        speak.call(this);
    }

    if (wordToLearn === word || wordToLearn.length > MAX_WORD_LENGTH || !wordToLearn) {
        const isInMistake = this.mistakeArr.indexOf(learnNumber) > -1
        if (!mistake && !isInMistake){
            const localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : null;
            map(localProgress, (item, key) => {
                const index = findIndex(courseItems, {'id': item.entity_id});
                localProgress[key].pol = get(courseItems, `[${index}].pol`);
            })
            const index = findIndex(localProgress, {'pol': polish});
            if (index > -1) {
                localProgress.splice(index, 1);
                map(localProgress, (item, key) => {
                    localProgress[key] = { entity_id: localProgress[key].entity_id };
                })
                localStorage.progress = JSON.stringify(localProgress);
            }
        }
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

    if (wordToLearn.slice(0, word.length) !== word) {
        word = (word.slice(0, word.length - 1));
        document.getElementById("formInput").value = word;
        if (mistake >= 2) {
            this.setState({record: 0});
        }
        if (!mistake) speak.call(this)
        this.setState({mistake: mistake + 1});
        if (this.mistakeArr[this.mistakeArr.length - 1] !== learnNumber){
            this.mistakeArr.push(learnNumber);
        }
        this.mistakeArr = this.mistakeArr.filter(onlyUnique);
    }else{
        this.setState({record: record + 1});
    }
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

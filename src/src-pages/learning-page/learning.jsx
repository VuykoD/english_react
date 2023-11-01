import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import map from 'lodash/map';
import filter from 'lodash/filter';
import findIndex from 'lodash/findIndex';
import {Badge, Button, Col, Container, Form, ProgressBar, Row} from 'react-bootstrap';
import getCourseItems, { getCourseUnits } from '../../dict/getCourseItems';
import { shuffle } from '../user-page/user-data/user-dictionary';
import setLearnCount from '../../src-core/helper/setLearnCount';

import '../../scc/learning.css';

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
    firstLettersByText: {
        ru: "Первые буквы по тексту",
        ukr: "Перші букви по тексту",
    },
    firstLettersBySound: {
        ru: "Первые буквы по звуку",
        ukr: "Перші букви по звуку",
    },
    resetRecord: {
        ru: "Обнулить рекорд",
        ukr: "Обнулити рекорд",
    },
    saveTranslation: {
        ru: "Сохранить перевод",
        ukr: "Зберегти переклад",
    },
    games: {
        ru: "Тренажеры",
        ukr: "Тренажери",
    },
    automaticSort: {
        ru: "Сортировать автоматически",
        ukr: "Сортувати автоматично",
    },
};

const MAX_WORD_LENGTH = 100;
const MAX_SOUND_LENGTH = 121;

const initialState = {
    exampleLearning: null,
    cycleLearning: null,
    learnNumber: 0,
    english: '',
    polish: '',
    rus: '',
    start: null,
    end: null,
    fileName: '',
    isRepeatAll: false,
    mistake: 0,
    mistakeRewrite: 0,
    record: 0,
    changeToInput: false,
    automaticChange: localStorage.automaticChange ? JSON.parse(localStorage.automaticChange) : false
}

class LearningClass extends Component {
    static propTypes = {
        store: PropTypes.shape({}),
        location: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        onChangeItemCount: PropTypes.func,
        onChangeToLearnCount: PropTypes.func
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
        const changePol = document.getElementById('changePol');
        let newPol = get(changePol, 'value');
        const { polish } = this.state;

        const index = findIndex(courseItems, {'pol': polish});
        if (index > -1) {
            courseItems[index].pol = newPol;
            localStorage.courseItems = JSON.stringify(courseItems);
            document.getElementById("changePol").value = '';
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
        this.setLearnArr(arrayLength);
        this.setTranslInLearnArray();
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

    speedRepeat = () => {
        const { automaticChange } = this.state;
        if (automaticChange) {
            this.sort();
        }
        this.soundAndRepeatCoef = 2.6;
        this.soundAndRepeat(50);
    }

    write = () => {
        const { automaticChange } = this.state;
        if (automaticChange) {
            this.sort();
        }
        this.setLearnArr(10);
        this.setTranslInLearnArray();
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

    firstLettersBySound = () => {
        let learnArr = getCourseItems();
        learnArr = shuffle(learnArr);
        this.learnArr = learnArr.slice(0, 70);
        this.setCourseNameInLearnArray();
        if (!this.learnArr) return;
        this.setState({
            cycleLearning: 'new',
            exampleLearning: 'first_letters_by_sound'
        });
        this.setEngAndTransl(this.state.learnNumber);
    }

    firstLettersByText = () => {
        const { automaticChange } = this.state;
        if (automaticChange) {
            this.sort();
        }
        this.setLearnArr(50);
        this.setTranslInLearnArray();
        if (!this.learnArr) return;
        this.setState({cycleLearning: 'new', exampleLearning: 'first_letters_by_text'});
        this.setEngAndTransl(this.state.learnNumber);
    }

    setTranslInLearnArray = () => {
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

    setCourseNameInLearnArray = () => {
        map(this.learnArr, (item, key) => {
            const courseIndex = findIndex(courseUnits, {'id': this.learnArr[key].unitId});
            this.learnArr[key].topicName = get(courseUnits, `[${courseIndex}].name`);
        })
    };

    setLearnArr = (sliceNumber) => {
        const localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : null;
        this.learnArr = localProgress ? localProgress.slice(0, sliceNumber) : null;
    }

    setTimeoutTime =(learnNumber)=>{
        const word = get(this.learnArr, `[${learnNumber}].pol`, '');
        const wordLength = Math.round(word.length / this.soundAndRepeatCoef);
        const minTime = 13 / this.soundAndRepeatCoef;
        let timeoutTime = wordLength > minTime ? wordLength : minTime;
        if(timeoutTime > 60) timeoutTime = 60;
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

    onChangeCheck = () => {
        localStorage.automaticChange = !this.state.automaticChange;
        this.setState({automaticChange: !this.state.automaticChange});
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
            mistake,
            changeToInput,
            automaticChange
        } = this.state;
        const { siteLang, learnedLang } = this.props.store;
        const write = get(content, `write[${siteLang}]`) || '';
        const speedRepeat = get(content, `speedRepeat[${siteLang}]`) || '';
        const firstLettersByText = get(content, `firstLettersByText[${siteLang}]`) || '';
        const firstLettersBySound = get(content, `firstLettersBySound[${siteLang}]`) || '';
        const games = get(content, `games[${siteLang}]`) || '';
        const automaticSort = get(content, `automaticSort[${siteLang}]`) || '';

        const isSound = checkIsSound.call(this);
        if (isSound) speak.call(this);

        const isFirstLetters = exampleLearning === 'first_letters_by_text'
            || exampleLearning === 'first_letters_by_sound';

        return (
            <Container className='new-container'>
                {!exampleLearning && !cycleLearning && (
                    <Fragment>
                        <Row>
                            <h3 className="new-row rows" children={games}/>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="info" block onClick={this.speedRepeat} children={`${speedRepeat} (50)`}/>
                            </Col>
                            <Col>
                                <Button variant="info" block onClick={this.write} children={`${write} (max 10)`}/>
                            </Col>
                            <Col>
                                <Button variant="info" block onClick={this.firstLettersByText}>
                                    {`${firstLettersByText} (50)`}
                                </Button>
                            </Col>
                            <Col>
                                <Button variant="info" block onClick={this.firstLettersBySound}>
                                    {`${firstLettersBySound} (70)`}
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Check
                                    type="checkbox"
                                    onChange={this.onChangeCheck}
                                    checked={automaticChange}
                                    label={automaticSort}
                                    id='sort-checkbox'
                                />
                            </Col>
                        </Row>
                    </Fragment>
                )}
                <Row className="text-center new-row rows">
                    {exampleLearning &&
                        <Col>
                            {this.getTopic()}
                            {exampleLearning !== 'first_letters_by_text' && soundButton.call(this)}
                            {exampleLearning !== 'first_letters_by_sound' &&  getBadge.call(
                                this,
                                rus,
                                "light",
                                this.onSaveRus,
                                'changeRus'
                            )}
                            {getProgressBar.call(this)}
                            {(exampleLearning === 'example_sound_repeat' || (mistake > 2 || changeToInput)) && getBadge.call(
                                this,
                                learnedLang === 'pol' ? polish : english,
                                "secondary",
                                learnedLang === 'pol' ? this.onSavePol : null,
                                learnedLang === 'pol' ? 'changePol' : null
                            )}
                            {isFirstLetters && getDotBadge.call(this,"secondary")}
                            {(
                                exampleLearning === 'write'
                                || exampleLearning === 'first_letters_by_text'
                                || exampleLearning === 'first_letters_by_sound'
                            ) && (
                                <>
                                    {getInput.call(this)}
                                    {this.record()}
                                </>
                            )}
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

export function getBadge(txt, variant, saveFunc, inputId) {
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
                    id={inputId}
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
                    onClick={saveFunc}
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

export function getDotBadge(variant) {
    const { english, polish } = this.state;
    const { learnedLang } = this.props.store;
    let wordToLearn = getWordToLearn(english, polish, learnedLang === 'pol');
    wordToLearn = wordToLearn.replace(/[A-ZŚĄŻŹÓŁĆĘŃ0-9]/gi, ".");

    return (
        <h3>
            <Badge
                variant={variant}
                className="white-space"
            >
                {wordToLearn}
            </Badge>
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
                    {`${learnNumber + 1}(${this.learnArr?.length})/${timeoutTime}`}
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
    const { english, polish, rus } = this.state;
    const { learnedLang } = this.props.store;

    //comp eng
    if (english && learnedLang === 'eng' && english.length < MAX_SOUND_LENGTH){
        if (!this.filteredEngVoices || !this.filteredEngVoices.length) this.getVoices();
        const utterance = new SpeechSynthesisUtterance(english);
        const randomVoice = this.filteredEngVoices ? Math.floor(Math.random() * this.filteredEngVoices.length) : null;
        utterance.voice = randomVoice ? this.filteredEngVoices[randomVoice] : null;
        if (!utterance.voice) utterance.lang = 'en';
        speechSynthesis.speak(utterance);
    }
    if (polish && learnedLang === 'pol' && polish.length < MAX_SOUND_LENGTH){
        if (!this.filteredPolVoices || !this.filteredPolVoices.length) this.getVoices();
        const utterance = new SpeechSynthesisUtterance(polish);
        utterance.voice = get(this.filteredPolVoices, '[0]');
        if (!utterance.voice) utterance.lang = 'en';
        speechSynthesis.speak(utterance);
    }

    //comp rus
    if (rus && learnedLang === 'rus' && rus.length < MAX_SOUND_LENGTH){
        if (!this.filteredRusVoices || !this.filteredRusVoices.length) this.getVoices();
        const utterance = new SpeechSynthesisUtterance(rus);
        utterance.voice = get(this.filteredRusVoices, '[0]');
        if (!utterance.voice) utterance.lang = 'ru';
        speechSynthesis.speak(utterance);
    }
}

export function checkIsSound() {
    const {exampleLearning} = this.state;
    const formInput = document.getElementById('formInput');
    const word = get(formInput, 'value');

    return exampleLearning === 'example_sound_repeat'
        || (exampleLearning === 'first_letters_by_sound' && !word);
}

export function getInput() {
    const { learnNumber, changeToInput } = this.state;
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
                    {`${learnNumber + 1}(${this.learnArr?.length})`}
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

function getWordToLearn (
    english,
    polish,
    learnPol
) {
    let wordToLearn = english;
    if (learnPol) wordToLearn = polish;
    return wordToLearn.toUpperCase();
}

export function changedInput() {
    const {
        english,
        polish,
        mistake,
        learnNumber,
        mistakeRewrite,
        record,
        changeToInput,
        exampleLearning
    } = this.state;
    const { learnedLang } = this.props.store;
    if (changeToInput) return;
    const isFirstLetters = exampleLearning === 'first_letters_by_text'
        || exampleLearning === 'first_letters_by_sound';
    const formInput = document.getElementById('formInput');
    let word = get(formInput, 'value');
    word = word.toUpperCase();
    const wordToLearn = getWordToLearn(english, polish, learnedLang === 'pol');
    if (!wordToLearn) this.repeatMistakes = true;
    if (
        word.length === 1
        && !mistake
        && wordToLearn.slice(0, word.length) === word
        && !mistakeRewrite
        && exampleLearning === 'write'
    ) {
        speak.call(this);
    }

    if (wordToLearn === word || wordToLearn.length > MAX_WORD_LENGTH || !wordToLearn) {
        allIsCorrect.call(this);
        if (learnNumber >= this.learnArr.length || this.repeatMistakes) {
            this.repeatMistakes = true;
            if(mistakeRewrite < this.mistakeArr.length) {
                const nextNumber = this.mistakeArr[mistakeRewrite];
                this.setState({mistakeRewrite: mistakeRewrite + 1});
                this.setEngAndTransl(nextNumber);
            }

            if (mistakeRewrite >= this.mistakeArr.length) {
                const statistic = localStorage.statistic ? JSON.parse(localStorage.statistic) : [];
                const options = {
                    year: 'numeric', month: 'numeric', day: 'numeric',
                    hour: 'numeric', minute: 'numeric',
                    hour12: false
                };
                const date = new Date().toLocaleDateString("en-IN", options);
                statistic.push(date);
                localStorage.statistic = JSON.stringify(statistic);
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
        if (!mistake && !mistakeRewrite && exampleLearning === 'write') {
            speak.call(this);
        }
        this.setState({mistake: mistake + 1});
        if (this.mistakeArr[this.mistakeArr.length - 1] !== learnNumber){
            this.mistakeArr.push(learnNumber);
        }
        this.mistakeArr = this.mistakeArr.filter(onlyUnique);
    }else{
        const words = wordToLearn.split(' ');
        if (
            isFirstLetters
        ) {
            let wordsLength = 0;
            let slicedLength = 0;
            let isNewWord = false;
            words.map( item => {
                wordsLength = wordsLength + item.length + 1
                if (word.length < wordsLength && !isNewWord) {
                    isNewWord = true;
                    slicedLength = wordsLength;
                }
                return slicedLength;
            })
            document.getElementById("formInput").value = wordToLearn.slice(0, slicedLength);
            if (slicedLength >= wordToLearn.length){
                if (learnNumber === this.learnArr.length - 1) {
                    this.setInitialData();
                }
                allIsCorrect.call(this);
            }
        }
        this.setState({record: record + 1});
    }
}

function allIsCorrect() {
    const {
        polish,
        mistake,
        learnNumber,
        exampleLearning
    } = this.state;
    const { onChangeToLearnCount } = this.props;
    const isInMistake = this.mistakeArr.indexOf(learnNumber) > -1

    if (!mistake && !isInMistake && exampleLearning === 'write'){
        const localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : null;
        const statistic = localStorage.statistic ? JSON.parse(localStorage.statistic) : [];
        map(localProgress, (item, key) => {
            const index = findIndex(courseItems, {'id': item.entity_id});
            localProgress[key].pol = get(courseItems, `[${index}].pol`);
        })
        const index = findIndex(localProgress, {'pol': polish});
        if (index > -1) {
            statistic.push({
                id: localProgress[index].entity_id
            })
            localProgress.splice(index, 1);
            map(localProgress, (item, key) => {
                localProgress[key] = { entity_id: localProgress[key].entity_id };
            })
            setLearnCount(onChangeToLearnCount, localProgress.length);
            localStorage.progress = JSON.stringify(localProgress);
            localStorage.statistic = JSON.stringify(statistic);
        }
    }
    document.getElementById("formInput").value = '';
    this.setEngAndTransl(learnNumber + 1, MAX_WORD_LENGTH);
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

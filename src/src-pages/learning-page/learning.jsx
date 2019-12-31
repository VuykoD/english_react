import React, {Component, Fragment} from 'react';
import get from 'lodash/get';
import map from 'lodash/map';
import filter from 'lodash/filter';
import findIndex from 'lodash/findIndex';
import {Button, Col, Container, Form, Row, Badge, ProgressBar} from "react-bootstrap";
import {TiTick, TiTimes} from "react-icons/ti";

import '../../scc/learning.css';
import warn from '../../src-core/helper/warn/warn';
import isDateBegin from '../../src-core/helper/dates/isDateBegin';
import Timer from "../../src-core/components/timer/timer";
import getNewDate from '../../src-core/helper/dates/getNewDate';
import videoItems from '../../dict/videoItems';
import FormControl from "react-bootstrap/FormControl";
import videoNames from "../../dict/videoNames";
import arrFalseWords from "../../dict/falseWords";
import {getCurrentDate, playVideo} from "../video-page/video-item";
import courseItems from "../../dict/courseItems";
import courseNames from "../../dict/courseNames";
import learnedCount from "../../src-core/helper/learnedCount/learnedCount";

const content = {
    firstWord: {
        ru: "Составить по буквам по озвученному",
        ukr: "Скласти по буквам по озвученому",
    },
    secondWord: {
        ru: "Составить по буквам - перевод",
        ukr: "Скласти по буквам - переклад",
    },
    thirdWord: {
        ru: "Написать слово по озвученному",
        ukr: "Написати слово по озвученому",
    },
    fourthWord: {
        ru: "Написать слово - перевод",
        ukr: "Написати слово - переклад",
    },
    fifthWord: {
        ru: "Повторить по озвученному",
        ukr: "Повторити по озвученому",
    },
    firstPhrase: {
        ru: "Составить по словам по озвученному (новое)",
        ukr: "Скласти по словам по озвученому (нове)",
    },
    secondPhrase: {
        ru: "Составить по словам - перевод (повтор)",
        ukr: "Скласти по словам - переклад (повтор)",
    },
    thirdPhrase: {
        ru: "Написать первые буквы по озвученному (повтор)",
        ukr: "Написати перші літери по озвученому (повтор)",
    },
    fourthPhrase: {
        ru: "Написать первые буквы - перевод (экзамен)",
        ukr: "Написати перші літери - переклад (екзамен)",
    },
    fifthPhrase: {
        ru: "Повторить по озвученному (новое)",
        ukr: "Повторити по озвученому (нове)",
    },
    new: {
        ru: "1 Новое",
        ukr: "1 Нове",
    },
    repeat: {
        ru: "2 Повтор",
        ukr: "2 Повтор",
    },
    exam: {
        ru: "3 Экзамен",
        ukr: "3 Екзамен",
    },
    words: {
        ru: "Слова и фразы",
        ukr: "Слова та фрази",
    },
    course: {
        ru: "Курси",
        ukr: "Курси",
    },
    video: {
        ru: "Видео",
        ukr: "Відео",
    },
    examples: {
        ru: "Примеры тренировок",
        ukr: "Приклади тренувань",
    },
    forPhrases: {
        ru: "Для фраз, курсов и видео",
        ukr: "Для фраз, курсів та відео",
    },
    forWords: {
        ru: "Для слов",
        ukr: "Для слів",
    },
    justRepeat: {
        ru: "Повторите сколько успеете",
        ukr: "Повторіть скільки встигнете",
    },
    yesNo: {
        ru: "4 Да/нет на слух",
        ukr: "4 Так/ні на слух",
    },
    randomExam: {
        ru: "5 Рандомный экзамен",
        ukr: "5 Рандомний екзамен",
    },
    mistakesOrder: {
        ru: "Отчёт по ошибкам. Правильно",
        ukr: "Звіт по помилкам. Правильно",
    },
    mistakesDesc: {
        ru: "Предложение/слово считается правильным, если в нём допущено не более 2 ошибок",
        ukr: "Речення/слово вважається правильним, якщо в ньому допущено не більше 2 помилок",
    },
    source: {
        ru: "Источник",
        ukr: "Джерело",
    },
    pressButton: {
        ru: "Для повторения нажмите пробел",
        ukr: "Для повтору натисніть пробіл",
    },
    addedPoint: {
        ru: "приплюсуется",
        ukr: "добавиться",
    },
    currentRecord: {
        ru: "Текущий рекорд",
        ukr: "Поточний рекорд",
    },
};

export default class Learning extends Component {
    constructor(props) {
        super(props);

        this.getLocalProgress();

        this.state = {
            exampleLearning: null,
            cycleLearning: null,
            showTranslation: true,
            learnNumber: 0,
            english: '',
            translation: '',
            newCount: this.newCount,
            newCountFrom: this.newCountFrom,
            repeatCount: this.repeatCount,
            repeatCountFrom: this.repeatCountFrom,
            examCount: this.examCount,
            examCountFrom: this.examCountFrom,
            newLearnNumber: 5,
            repeatNumber: 10,
            examNumber: 10,
            entity: null,
            start: null,
            end: null,
            fileName: '',
            addedPoint: 1,
            randomExamPoints: 0
        };
        this.englishArr = [];
        this.learnArr = [];
        this.mistakesArr = [];
        this.timeoutClearState = null;
        this.timeoutNextItem = null;
        this.timeoutResetExampleLearning = null;
        this.timeoutEndRandomExam = null;
        this.learnedNumber = 3;
    }

    componentDidMount() {
        keyListener.call(this);
        this.getVoices();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        focusInput();
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutClearState);
        clearTimeout(this.timeoutNextItem);
        clearTimeout(this.timeoutResetExampleLearning);
        clearTimeout(this.timeoutEndRandomExam);
        clearTimeout(this.timeoutClearState);
    }

    getLocalProgress = () => {
        const localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : null;
        this.newCount = 0;
        this.newCountFrom = 0;
        this.repeatCount = 0;
        this.repeatCountFrom = 0;
        this.examCount = 0;
        this.examCountFrom = 0;
        map(localProgress, item => {
            if (+item.quantity === 0) {
                if (isDateBegin(item.date)) this.newCount += 1;
                this.newCountFrom += 1;
            }
            if (+item.quantity === 1 ) {
                if (isDateBegin(item.date)) this.repeatCount += 1;
                this.repeatCountFrom += 1;
            }
            if (+item.quantity === 2) {
                if (isDateBegin(item.date)) this.examCount += 1;
                this.examCountFrom += 1;
            }
        });
    };

    getVoices() {
        window.speechSynthesis.onvoiceschanged = () => {
            const voices = window.speechSynthesis.getVoices();
            this.filteredVoices = filter(voices, voice => {
                    return voice.lang.substr(0, 2) === "en"
                }
            );
        };
    }

    exampleLearning = (e) => {
        const elem = e.currentTarget;
        const id = elem.getAttribute('id');
        let english = '';
        let translation = '';
        if (id.substr(0, 4) === 'word') {
            english = "inspiration";
            translation = "вдохновение";
        } else {
            this.getLearnArray(1);
            if (!this.learnArr) return;
            this.setEngAndTransl(this.state.learnNumber);
            english = get(this.learnArr, '[0].eng') || '';
            english = english.replace(/^\s*/, '').replace(/\s*$/, '');
            translation = get(this.learnArr, '[0].transl');
        }
        this.setState({exampleLearning: id, english, translation});
        if (id === 'word_5' || id === 'phase_5') {
            clearTimeout(this.timeoutResetExampleLearning);
            this.timeoutResetExampleLearning = setTimeout(this.resetExampleLearning, 10000);
        }
    };

    resetExampleLearning = () => {
        this.setState({exampleLearning: null})
    };

    wordClick = (e) => {
        wordClicked.call(this, e);
    };

    rightClick = (rightTxt) => {
        const {cycleLearning, exampleLearning, start, end} = this.state;
        rightClicked.call(this, rightTxt);
        if (this.englishArr.length === 0) {
            let timeoutSec = .5;
            if (exampleLearning === 'word_4' || exampleLearning === 'phase_4') {
                speak.call(this);
                const difference = +end - start;
                timeoutSec = difference;
            }

            if (cycleLearning) {
                let nextNumber = this.state.learnNumber + 1;
                if (nextNumber >= this.learnArr.length) {
                    if (cycleLearning === 'repeat' && exampleLearning === 'phase_2') {
                        this.setEngAndTransl(0, 'phase_3');
                        clearTranslation();
                        return;
                    } else {
                        this.setState({exampleLearning: 'mistakesOrder', learnNumber: 0});
                        return;
                    }
                }
                clearTimeout(this.timeoutSetEngAndTransl);
                this.timeoutSetEngAndTransl = setTimeout(() => {
                    this.setEngAndTransl(nextNumber);
                    clearTranslation();
                }, timeoutSec * 1000);
                return;
            }
            clearTimeout(this.timeoutClearState);
            this.timeoutClearState = setTimeout(() => this.setState({exampleLearning: null, learnNumber: 0}), 1000)
        }
    };

    speakTxt = () => {
        focusInput();
        speak.call(this);
    };

    onChangeInput = () => {
        changedInput.call(this);
    };

    warn = () => {
        const {siteLang} = this.props.store;
        warn(siteLang, 'inProgress')
    };

    newLearn = () => {
        this.getLearnArray(this.state.newLearnNumber, 0);//0 is count for new
        if (!this.learnArr) return;
        this.setEngAndTransl(this.state.learnNumber);
        this.setState({cycleLearning: 'new', exampleLearning: 'phase_5'});
        this.nextItem();
    };

    getLearnArray = (sliceNumber, quantity) => {
        const localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : null;
        if (quantity || quantity === 0) {
            const filteredArr = localProgress ?
                filter(localProgress, item => {
                    if (isDateBegin(item.date) && quantity < this.learnedNumber) return +item.quantity === quantity;
                    if (quantity >= this.learnedNumber) {  return +item.quantity >= quantity; }
                }) : null;
            if (filteredArr){
                this.learnArr = !sliceNumber ?
                    filteredArr.sort(() => { return .5 - Math.random(); }) :
                    filteredArr.slice(0, sliceNumber);
            }
        } else {
            this.learnArr = localProgress ? localProgress.slice(0, sliceNumber) : null;
        }

        if (!this.learnArr) {
            const currentDate = getCurrentDate();
            const videoItemsKeyArr = Object.keys(videoItems);
            const videoItemsLength = videoItemsKeyArr.length;
            let learnArr = [];
            let i = sliceNumber;
            while (i) {
                const randomNumber = Math.floor(Math.random() * videoItemsLength);
                const videoItemId = videoItemsKeyArr[randomNumber];
                learnArr.push({
                    entity: 'video',
                    entity_id: videoItems[videoItemId].id,
                    quantity: 0,
                    date: currentDate
                });
                i--;
            }
            this.learnArr = learnArr.length ? learnArr.slice(0, sliceNumber) : null;
        }

        this.mistakesArr = [];
        map(this.learnArr, (item, key) => {
            if (item.entity === 'video') {
                this.learnArr[key].eng = get(videoItems, `[${item.entity_id}].eng`);
                this.learnArr[key].transl = get(videoItems, `[${item.entity_id}].transl`);
                this.learnArr[key].courseId = get(videoItems, `[${item.entity_id}].idVideoName`);
                const courseIndex = findIndex(videoNames, {'id': this.learnArr[key].courseId});
                this.learnArr[key].topicName = get(videoNames, `[${courseIndex}].songName`);
            }

            if (item.entity === 'course') {
                const index = findIndex(courseItems, {'id': item.entity_id});
                this.learnArr[key].eng = get(courseItems, `[${index}].eng`);
                this.learnArr[key].transl = get(courseItems, `[${index}].transl`);
                this.learnArr[key].courseId = get(courseItems, `[${item.entity_id}].unitId`);
                const courseIndex = findIndex(courseNames, {'id': this.learnArr[key].courseId});
                this.learnArr[key].topicName = get(courseNames, `[${courseIndex}].name`);
            }

            this.mistakesArr.push({item: key, mistakes: 0});
        })
    };

    repeat = () => {
        this.getLearnArray(this.state.repeatNumber, 1);//1 is count for repeat
        if (!this.learnArr) return;
        this.setEngAndTransl(this.state.learnNumber);
        this.setState({cycleLearning: 'repeat', exampleLearning: 'phase_2'});
    };

    exam = () => {
        this.getLearnArray(this.state.examNumber, 2);//2 is count for exam
        if (!this.learnArr) return;
        this.setEngAndTransl(this.state.learnNumber);
        this.setState({cycleLearning: 'exam', exampleLearning: 'phase_4'});
    };

    randomExam =() => {
        this.getLearnArray(null, 3);//3 is count for learned
        if (!this.learnArr) return;
        this.setEngAndTransl(this.state.learnNumber);
        this.setState({cycleLearning: 'randomExam', exampleLearning: 'phase_4'});
        clearTimeout(this.timeoutClearState);
        this.timeoutClearState = setTimeout(() => this.clearRandomExam(), 60000)
    };

    clearRandomExam = () => {
        if (!localStorage.maxRandomExam || localStorage.maxRandomExam<this.state.randomExamPoints){
            localStorage.maxRandomExam = this.state.randomExamPoints
        }
        this.learnArr = this.learnArr.slice(0, this.state.learnNumber+1);
        this.mistakesArr = this.mistakesArr.slice(0, this.state.learnNumber+1);

        // this.setState({
        //     exampleLearning: 'mistakesOrder',
        //     learnNumber: 0,
        //     cycleLearning: null,
        //     addedPoint: 1,
        //     randomExamPoints: 0
        // })
    };

    nextItem = () => {
        if (this.state.learnNumber < this.learnArr.length - 1) {
            clearTimeout(this.timeoutNextItem);
            this.timeoutNextItem = setTimeout(() => {
                const nextNumber = this.state.learnNumber + 1;
                this.setEngAndTransl(nextNumber);
                this.nextItem();
            }, 10000);
        } else {
            clearTimeout(this.timeoutNextItem);
            this.timeoutNextItem = setTimeout(() => {
                this.setEngAndTransl(0, 'phase_1');
            }, 10000);
        }
    };

    setEngAndTransl = (learnNumber, changedState) => {
        const entity = get(this.learnArr, `${learnNumber}.entity`);
        const entityId = get(this.learnArr, `${learnNumber}.entity_id`);
        const courseId = get(this.learnArr, `${learnNumber}.courseId`);
        let english = get(this.learnArr, `${learnNumber}.eng`, '');
        english = english.replace(/^\s*/, '').replace(/\s*$/, '');
        const translation = get(this.learnArr, `${learnNumber}.transl`);
        const start = get(videoItems, `[${entityId}].start`);
        const end = get(videoItems, `[${entityId}].end`);

        const index = findIndex(videoNames, {'id': courseId});
        const fileName = get(videoNames, `[${index}].fileName`);
        const {exampleLearning} = this.state;
        if (exampleLearning !== 'phase_5') hideHint();
        this.setState({
            english, translation, entity, start, end, fileName, learnNumber,
            exampleLearning: changedState || this.state.exampleLearning
        })
    };

    changeNewLearnNumber = (e) => {
        const val = e.target.value;
        if (!(+val)) return e.target.value = this.state.newLearnNumber;
        this.setState({newLearnNumber: +val});
    };

    changeRepeatNumber = (e) => {
        const val = e.target.value;
        if (!(+val)) return e.target.value = this.state.repeatNumber;
        this.setState({repeatNumber: +val});
    };

    changeExamNumber = (e) => {
        const val = e.target.value;
        if (!(+val)) return e.target.value = this.state.examNumber;
        this.setState({examNumber: +val});
    };

    changeCheck() {
        return null;
    }

    renderVideo() {
        const {fileName, start, end} = this.state;
        const autoPlay = checkIsSound.call(this);

        if (
            !fileName || !start || !end
        ) return;
        // const src = `../../../english_react/video/${fileName}#t=${start},${end}`;
        const src = `../../../video/${fileName}#t=${start},${end}`;
        return (
            <video
                className="video-hide"
                id='player'
                src={src}
                autoPlay={autoPlay}
            />
        )
    }

    getTopic = () => {
        const {siteLang} = this.props.store;
        const {learnNumber} = this.state;
        const source = get(content, `source[${siteLang}]`);
        const topicTxt = get(this.learnArr, `[${learnNumber}].topicName`, '');
        const topic = (
            <h5>
                <Badge variant="light" bsPrefix='source'>
                    {source}: {topicTxt}
                </Badge>
            </h5>
        );
        return topic;
    };

    resetCycle = () => {
        this.setState({
            newCount: this.newCount,
            newCountFrom: this.newCountFrom,
            repeatCount: this.repeatCount,
            repeatCountFrom: this.repeatCountFrom,
            examCount: this.examCount,
            examCountFrom: this.examCountFrom,
            exampleLearning: null,
            cycleLearning: null,
            learnNumber: 0,
            addedPoint: 1,
            randomExamPoints: 0
        });
        this.props.onChangeLearnedCount(learnedCount());
    };

    render() {
        const {
            newLearnNumber, repeatNumber, examNumber,
            exampleLearning, cycleLearning,
            newCount, newCountFrom, repeatCount, repeatCountFrom, examCount, examCountFrom
        } = this.state;
        const {siteLang} = this.props.store;
        const firstWord = get(content, `firstWord[${siteLang}]`);
        const secondWord = get(content, `secondWord[${siteLang}]`);
        const thirdWord = get(content, `thirdWord[${siteLang}]`);
        const fourthWord = get(content, `fourthWord[${siteLang}]`);
        const fifthWord = get(content, `fifthWord[${siteLang}]`);
        const firstPhrase = get(content, `firstPhrase[${siteLang}]`);
        const secondPhrase = get(content, `secondPhrase[${siteLang}]`);
        const thirdPhrase = get(content, `thirdPhrase[${siteLang}]`);
        const fourthPhrase = get(content, `fourthPhrase[${siteLang}]`);
        const fifthPhrase = get(content, `fifthPhrase[${siteLang}]`);
        const newLearn = get(content, `new[${siteLang}]`);
        const repeat = get(content, `repeat[${siteLang}]`);
        const exam = get(content, `exam[${siteLang}]`);
        const words = get(content, `words[${siteLang}]`);
        const course = get(content, `course[${siteLang}]`);
        const video = get(content, `video[${siteLang}]`);
        const examples = get(content, `examples[${siteLang}]`);
        const forPhrases = get(content, `forPhrases[${siteLang}]`);
        const forWords = get(content, `forWords[${siteLang}]`);
        const yesNo = get(content, `yesNo[${siteLang}]`);
        const randomExam = get(content, `randomExam[${siteLang}]`);
        const currentRecord = get(content, `currentRecord[${siteLang}]`);

        const isSound = checkIsSound.call(this);
        if (isSound) speak.call(this);
        const newCountTxt = newCountFrom ? ` - ${newCount}/${newCountFrom}` : null;
        const repeatCountTxt = repeatCountFrom ? ` - ${repeatCount}/${repeatCountFrom}` : null;
        const examCountTxt = examCountFrom ? ` - ${examCount}/${examCountFrom}` : null;

        return (
            <Container className='new-container'>
                {this.renderVideo()}
                {!exampleLearning && !cycleLearning &&
                <Fragment>
                    <Row>
                        <Col sm={1}/>
                        <Col sm={8}>
                            <Row>
                                <Col sm={1}/>
                                <Col sm={2}>
                                    <FormControl
                                        type="text"
                                        defaultValue={newLearnNumber}
                                        onChange={this.changeNewLearnNumber}
                                    />
                                </Col>
                                <Col>
                                    <Button variant="info" block onClick={this.newLearn}>
                                        {newLearn}{newCountTxt}
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={1}/>
                                <Col sm={2}>
                                    <FormControl
                                        type="text"
                                        defaultValue={repeatNumber}
                                        onChange={this.changeRepeatNumber}
                                    />
                                </Col>
                                <Col>
                                    <Button variant="info" block onClick={this.repeat}>
                                        {repeat}{repeatCountTxt}
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={1}/>
                                <Col sm={2}>
                                    <FormControl
                                        type="text"
                                        defaultValue={examNumber}
                                        onChange={this.changeExamNumber}
                                    />
                                </Col>
                                <Col>
                                    <Button variant="success" block onClick={this.exam}>
                                        {exam}{examCountTxt}
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={2}>
                            <Form.Group controlId="words">
                                <Form.Check type="checkbox" label={words} checked onChange={this.changeCheck}/>
                            </Form.Group>
                            <Form.Group controlId="course">
                                <Form.Check type="checkbox" label={course} checked onChange={this.changeCheck}/>
                            </Form.Group>
                            <Form.Group controlId="video">
                                <Form.Check type="checkbox" label={video} checked onChange={this.changeCheck}/>
                            </Form.Group>
                        </Col>
                        <Col sm={1}/>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            <Button
                                variant="secondary"
                                block
                                onClick={this.warn}
                                children={yesNo}
                            />
                        </Col>
                        <Col>
                            <Button
                                variant="secondary"
                                block
                                onClick={this.randomExam}
                                children={`${randomExam}. ${currentRecord} - ${localStorage.maxRandomExam || 0}`}
                            />
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <h3 className='new-row' children={examples}/>
                    </Row>
                </Fragment>
                }
                <Row className="text-center new-row">
                    {!exampleLearning && !cycleLearning &&
                    <Fragment>
                        <Col>
                            <h5 children={forWords}/>
                            <Button
                                id="word_1"
                                variant="light"
                                block onClick={this.exampleLearning}
                            >
                                {firstWord}
                            </Button>
                            <Button
                                id="word_2"
                                variant="light"
                                block onClick={this.exampleLearning}
                            >
                                {secondWord}
                            </Button>
                            <Button
                                id="word_3"
                                variant="light"
                                block
                                onClick={this.exampleLearning}
                            >
                                {thirdWord}
                            </Button>
                            <Button
                                id="word_4"
                                variant="light"
                                block
                                onClick={this.exampleLearning}
                            >
                                {fourthWord}
                            </Button>
                            <Button
                                id="word_5"
                                variant="light"
                                block
                                onClick={this.exampleLearning}
                            >
                                {fifthWord}
                            </Button>
                        </Col>
                        <Col>
                            <h5 children={forPhrases}/>
                            <Button
                                id="phase_1"
                                variant="light"
                                block onClick={this.exampleLearning}
                            >
                                {firstPhrase}
                            </Button>
                            <Button
                                id="phase_2"
                                variant="light"
                                block
                                onClick={this.exampleLearning}
                            >
                                {secondPhrase}
                            </Button>
                            <Button
                                id="phase_3"
                                variant="light"
                                block
                                onClick={this.exampleLearning}
                            >
                                {thirdPhrase}
                            </Button>
                            <Button
                                id="phase_4"
                                variant="light"
                                block
                                onClick={this.exampleLearning}
                            >
                                {fourthPhrase}
                            </Button>
                            <Button
                                id="phase_5"
                                variant="light"
                                block
                                onClick={this.exampleLearning}
                            >
                                {fifthPhrase}
                            </Button>
                        </Col>
                    </Fragment>
                    }
                    {exampleLearning &&
                    <Fragment>
                        <Col>
                            {this.getTopic()}
                            {soundButton.call(this)}
                            {getBadgeTranslation.call(this)}
                            {getBadgeAnswer.call(this)}
                            {getInput.call(this)}
                            {getWordsArr.call(this)}
                            {getProgressBar.call(this)}
                            {getEngBadge.call(this)}
                            {getMistakesOrder.call(this)}
                            {getRandomExam.call(this)}
                        </Col>
                    </Fragment>
                    }
                </Row>
            </Container>
        );
    }
};

export function getWordsArr() {
    const {exampleLearning} = this.state;
    if (!this.state.english || !exampleLearning) return null;
    let english = this.state.english || '';
    english = english.replace(/^\s*/, '').replace(/\s*$/, '').replace(/\./g, "");
    let wordsArr = null;
    getEngArr.call(this, english);
    if (
        exampleLearning === 'phase_1' || exampleLearning === 'phase_2' ||
        (exampleLearning === 'phase_3' && !this.isWord) ||
        exampleLearning === 'word_1' || exampleLearning === 'word_2'
    ) {
        const disabled = exampleLearning === 'phase_3' || exampleLearning === 'word_3';
        const variant = disabled ? 'light' : 'info';
        const randArr = this.isWord ? english.split('') : english.split(' ');
        if (!disabled) {
            const randomCountFalseWord = Math.floor(Math.random() * 3);
            for (let i = randomCountFalseWord; i > 0; i--) {
                const randomNumber = Math.floor(Math.random() * arrFalseWords.length);
                randArr.push(arrFalseWords[randomNumber]);
            }
            randArr.sort(() => {
                return .5 - Math.random();
            });
        }
        const className = disabled ? "words-hint" : 'words';

        wordsArr = (
            <div>
                {map(randArr, (word, index) => {
                    const d = Date.now();
                    let points = word;
                    if (disabled) {
                        points = '(' + word.replace(/[A-Za-z]/g, '.') + ')';
                    }
                    return (
                        <Button
                            variant={variant}
                            key={index + word + d}
                            onClick={this.wordClick}
                            className={`${className}`}
                            size="lg"
                            disabled={disabled}
                            name={word}
                        >
                            {points}
                        </Button>
                    )
                })}
            </div>
        )
    }
    return wordsArr
}

function getEngArr(english, isWord) {
    this.isWord = english.replace(/ /g, "") === english;
    if (this.english !== english.replace(/^\s*/, '').replace(/\s*$/, '').replace(/\./g, "")) {
        this.englishArr = isWord ? english.split('') : english.split(' ');
    }
    this.english = english.replace(/^\s*/, '').replace(/\s*$/, '').replace(/\./g, "");;
}

export function getInput() {
    const {exampleLearning, english} = this.state;
    if (!english || !exampleLearning) return null;

    let input = null;
    getEngArr.call(this, english);
    if (
        exampleLearning === 'phase_3' || exampleLearning === 'phase_4' ||
        exampleLearning === 'word_3' || exampleLearning === 'word_4'
    ) {
        input = (
            <Row>
                <Col sm={3}/>
                <Col>
                    <Form.Control
                        id='formInput'
                        type="text"
                        placeholder={"Треба писати тільки перші літери"}
                        className="mr-sm-2 search"
                        onChange={this.onChangeInput}
                    />
                </Col>
                <Col sm={3}/>
            </Row>
        )
    }
    return input
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
                {/*<img src="../../../english_react/images/Sound.png" className="title_sound" alt=''/>*/}
                <img src="../../../images/Sound.png" className="title_sound" alt=''/>
            </Button>
        )
    }
    return btn
}

export function getBadgeTranslation() {
    const {showTranslation, translation, exampleLearning} = this.state;
    let badgeTranslation = null;
    if (showTranslation && translation && exampleLearning !== 'mistakesOrder') {
        let className = '';
        let variant = 'secondary';

        if (exampleLearning === 'phase_1' || exampleLearning === 'word_1' ||
            exampleLearning === 'phase_3' || exampleLearning === 'word_3'
        ) {
            className = 'bad-visible';
            variant = 'light';
        }

        badgeTranslation = (
            <h3>
                <Badge variant={variant} className={className}>{translation}</Badge>
            </h3>
        )
    }
    return badgeTranslation;
}

export function getBadgeAnswer() {
    const {exampleLearning} = this.state;
    let badgeAnswer = null;
    if (exampleLearning !== 'mistakesOrder') {
        badgeAnswer = (
            <h2 className='translation'><Badge variant="light" id='translation'></Badge></h2>
        )
    }
    return badgeAnswer;
}

export function getEngBadge() {
    const {exampleLearning, english} = this.state;
    if (!exampleLearning || !english) return null;
    let className = 'display-none';

    if (exampleLearning === 'phase_5' || exampleLearning === 'word_5') className = '';
    const badge = (
        <h3 className={className} id='errorHint'>
            <Badge variant="light">{english}</Badge>
        </h3>
    );

    return badge;
}

export function getProgressBar() {
    const {exampleLearning} = this.state;
    const {siteLang} = this.props.store;
    const justRepeat = get(content, `justRepeat[${siteLang}]`);
    let progress = null;

    if (exampleLearning === 'phase_5' || exampleLearning === 'word_5') {
        progress = (
            <Row>
                <Col sm={3}/>
                <Col>
                    <div className="hint">{justRepeat}</div>
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

export function getMistakesOrder() {
    const {exampleLearning} = this.state;
    const {siteLang} = this.props.store;
    const mistakesOrderTxt = get(content, `mistakesOrder[${siteLang}]`);
    const mistakesDesc = get(content, `mistakesDesc[${siteLang}]`);

    let mistakesOrder = null;
    const localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : null;
    if (exampleLearning === 'mistakesOrder') {
        if (localProgress) {
            map(this.learnArr, (item, key) => {
                const entityId = item.entity_id;
                const quantity = item.quantity;
                const isMistake = this.mistakesArr[key].mistakes > 2;
                const newDateAndQuantity = getNewDate(quantity, isMistake);
                const index = findIndex(localProgress, {'entity_id': entityId});
                if (index > -1) {
                    localProgress[index].date = newDateAndQuantity.newDate;
                    localProgress[index].quantity = newDateAndQuantity.newQuantity;
                }
            });
        }
        localStorage.progress = JSON.stringify(localProgress);
        this.getLocalProgress();
        const trueAnswerCount = filter(this.mistakesArr, item =>  item.mistakes < 3 );

        mistakesOrder = (
            <Fragment>
                <h3 children={`${mistakesOrderTxt} - ${trueAnswerCount.length}/${this.mistakesArr.length}`}/>
                {map(this.learnArr, (item, key) => {
                    const mistakesCount = get(this.mistakesArr, `[${key}].mistakes`);
                    const icon = mistakesCount > 2 ?
                        <TiTimes className='mistakes-error'/> :
                        <TiTick className='mistakes-right'/>;
                    return (
                        <p key={key} className='mistakes-string'>
                            {item.eng} - {item.transl} - {mistakesCount} {icon}
                        </p>
                    )
                })}
                <p className="hint" children={mistakesDesc}/>
                <Button
                    variant='info'
                    onClick={this.resetCycle}
                >
                    Ok
                </Button>
            </Fragment>
        )
    }
    return mistakesOrder;
}

export function getRandomExam() {
    const {cycleLearning, addedPoint, randomExamPoints } = this.state;
    if (cycleLearning !== "randomExam") return null;
    const {siteLang} = this.props.store;
    const addedPointTxt = get(content, `addedPoint[${siteLang}]`);
    const currentRecordTxt = get(content, `currentRecord[${siteLang}]`);
    const currentRecord = localStorage.maxRandomExam || 0;

    return (
        <div className='randomExam'>
            <Timer
                time={60}
                siteLang={siteLang}
            />
            <span children={`, ${addedPointTxt} - ${addedPoint}`}/>
            <h4 children={randomExamPoints}/>
            <span children={`${currentRecordTxt} - ${currentRecord}`}/>
        </div>
    );
}

export function speak() {
    const {english, entity, end, start} = this.state;
    if (entity === 'video' && end && start) return playVideo.call(this, start, end);
    if (entity === 'video' && (!start || !end)) return;
    if (!this.filteredVoices || !this.filteredVoices.lenght) this.getVoices();

    const utterance = new SpeechSynthesisUtterance(english);
    const randomVoice = this.filteredVoices ? Math.floor(Math.random() * this.filteredVoices.length) : null;
    utterance.voice = randomVoice ? this.filteredVoices[randomVoice] : null;
    if (!utterance.voice) utterance.lang = 'en';
    speechSynthesis.speak(utterance);
}

export function checkIsSound() {
    const {exampleLearning} = this.state;
    if (
        exampleLearning === 'word_1' || exampleLearning === 'word_2' || exampleLearning === 'word_3' ||
        exampleLearning === 'word_5' || exampleLearning === 'phase_1' || exampleLearning === 'phase_2' ||
        exampleLearning === 'phase_3' || exampleLearning === 'phase_5'
    ) {
        return true;
    }

    return false;
}

export function wordClicked(e) {
    const elem = e.currentTarget;
    if (elem) elem.blur();
    const currentTxt = get(elem, 'innerText');
    const rightTxt = get(this, 'englishArr[0]');
    if (rightTxt && currentTxt === rightTxt.replace(/\./g, "")) {
        this.rightClick(rightTxt);
        if (elem) elem.style.display = 'none'
    } else {
        if (this.mistakesArr) {
            this.mistakesArr[this.state.learnNumber].mistakes += 1;
            showHint.call(this);
        }
        elem.className += " blink-2";
        setTimeout(() => {
            if (elem) elem.classList.remove('blink-2')
        }, 500)
    }
}

export function showHint() {
    if (this.mistakesArr[this.state.learnNumber].mistakes > 2) {
        const errorHint = document.getElementById('errorHint');
        if (errorHint) errorHint.className = '';
    }
}

export function hideHint() {
    const errorHint = document.getElementById('errorHint');
    if (errorHint) errorHint.className = 'display-none';
}

export function rightClicked(rightTxt) {
    this.englishArr.shift();
    const {cycleLearning, addedPoint, randomExamPoints} = this.state;
    if (cycleLearning === "randomExam") {
        this.setState({
            randomExamPoints: randomExamPoints + addedPoint,
            addedPoint: addedPoint + 1
        });
    }
    const badge = document.getElementById('translation');
    if (badge) badge.innerText += ` ${rightTxt}`;
}

export function changedInput() {
    const formInput = document.getElementById('formInput');
    const letter = get(formInput, 'value') ? formInput.value.substr(0, 1) : null;
    if (letter === ' ') return formInput.value = '';
    const letterUp = letter.toUpperCase();
    const rightTxt = get(this, 'englishArr[0]');
    if (rightTxt && letterUp === rightTxt.substr(0, 1).toUpperCase()) {
        this.rightClick(rightTxt);
        const rightButtons = document.getElementsByName(rightTxt.replace(/\./g, ""));
        if (rightButtons && rightButtons.length) rightButtons[0].style.display = 'none';
        formInput.value = '';
    } else {
        if (this.state.cycleLearning === "randomExam") this.setState({addedPoint: 1});
        if (this.mistakesArr) {
            this.mistakesArr[this.state.learnNumber].mistakes += 1;
            showHint.call(this);
        }
        formInput.value = '';
        formInput.className += " blink-2";
        setTimeout(() => {
            if (formInput) formInput.classList.remove('blink-2')
        }, 500)
    }
}

export function focusInput() {
    const elem = document.getElementById("formInput");
    if (elem) elem.focus();
}

export function clearTranslation() {
    const badge = document.getElementById('translation');
    if (badge) badge.innerText = '';
}

export function keyListener() {
    document.addEventListener('keydown', (event) => {
        const exampleLearningState = this.state.exampleLearning;
        const keyCode = event.keyCode;
        // const key = event.key;
        // const rightTxt = get(this, 'englishArr[0]');
        // const letter = rightTxt ? rightTxt.substr(0, 1) : null;
        //
        // if ((exampleLearningState === 'phase_2' || exampleLearningState === 'phase_1' ||
        //     exampleLearningState === 'word_2' || exampleLearningState === 'word_1') &&
        //     key === letter){
        //     const rightButtons = document.getElementsByName(rightTxt);
        //     if (rightButtons && rightButtons.length) rightButtons[0].style.display = 'none';
        //     this.rightClick(rightTxt);
        // }

        if (keyCode === 13 && exampleLearningState === 'mistakesOrder') {this.resetCycle();}

        if (keyCode === 32) this.speakTxt();
        if (keyCode === 49 && !exampleLearningState && get(document, 'activeElement.tagName') !== 'INPUT') this.newLearn();
        if (keyCode === 50 && !exampleLearningState && get(document, 'activeElement.tagName') !== 'INPUT') this.repeat();
        if (keyCode === 51 && !exampleLearningState && get(document, 'activeElement.tagName') !== 'INPUT') this.exam();
        // if (keyCode === 52 && !exampleLearningState && get(document, 'activeElement.tagName') !== 'INPUT') this.exam();
        if (keyCode === 53 && !exampleLearningState && get(document, 'activeElement.tagName') !== 'INPUT') this.randomExam();

    });
}
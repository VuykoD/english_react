import React, {Component, Fragment} from 'react';
import get from 'lodash/get';
import map from 'lodash/map';
import filter from 'lodash/filter';
import findIndex from 'lodash/findIndex';
import {Button, Col, Container, Form, Row, Badge, ProgressBar} from "react-bootstrap";
import {TiTickOutline, TiTimesOutline} from "react-icons/ti";

import '../../scc/learning.css';
import warn from '../../src-core/helper/warn/warn';
import isDateBegin from '../../src-core/helper/dates/isDateBegin';
import getNewDate from '../../src-core/helper/dates/getNewDate';
import videoItems from '../../dict/videoItems';
import FormControl from "react-bootstrap/FormControl";
import videoNames from "../../dict/videoNames";
import arrFalseWords from "../../dict/falseWords";
import {getCurrentDate, playVideo} from "../video-page/video-item";

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
        ru: "Новое",
        ukr: "Нове",
    },
    repeat: {
        ru: "Повтор",
        ukr: "Повтор",
    },
    exam: {
        ru: "Экзамен",
        ukr: "Екзамен",
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
        ru: "Да/нет на слух",
        ukr: "Так/ні на слух",
    },
    randomExam: {
        ru: "Рандомный экзамен",
        ukr: "Рандомний екзамен",
    },
    mistakesOrder: {
        ru: "Отчёт по ошибкам",
        ukr: "Звіт по помилкам",
    },
    mistakesDesc: {
        ru: "Предложение/слово считается правильным, если в нём допущено не более 2 ошибок",
        ukr: "Речення/слово вважається правильним, якщо в ньому допущено не більше 2 помилок",
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
            newLearnNumber: 3,
            repeatNumber: 10,
            examNumber: 10,
            entity: null,
            start: null,
            end: null,
            fileName: ''
        };
        this.englishArr = [];
        this.learnArr = [];
        this.mistakesArr = [];
    }

    componentDidMount() {
        this.getVoices();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        focusInput();
    }

    getLocalProgress = () => {
        this.localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : null;
        this.newCount = 0;
        this.newCountFrom = 0;
        this.repeatCount = 0;
        this.repeatCountFrom = 0;
        this.examCount = 0;
        this.examCountFrom = 0;
        map(this.localProgress, item => {
            if (+item.quantity === 0) {
                if (isDateBegin(item.date)) this.newCount += 1;
                this.newCountFrom += 1;
            }
            if (+item.quantity === 1 || +item.quantity === 2) {
                if (isDateBegin(item.date)) this.repeatCount += 1;
                this.repeatCountFrom += 1;
            }
            if (+item.quantity === 3) {
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
            english = english.replace(/^\s*/,'').replace(/\s*$/,'');
            translation = get(this.learnArr, '[0].transl');
        }
        this.setState({exampleLearning: id, english, translation});
        if (id === 'word_5' || id === 'phase_5') {
            setTimeout(this.resetExampleLearning, 7000);
        }
    };

    resetExampleLearning = () => {
        this.setState({exampleLearning: null})
    };

    wordClick = (e) => {
        wordClicked.call(this, e);
    };

    rightClick = (rightTxt) => {
        const {cycleLearning, exampleLearning} = this.state;
        rightClicked.call(this, rightTxt);
        if (this.englishArr.length === 0) {
            if (cycleLearning) {
                let nextNumber = this.state.learnNumber + 1;
                if (nextNumber >= this.learnArr.length) {
                    if (cycleLearning === 'repeat' && exampleLearning === 'phase_2') {
                        this.setState({exampleLearning: 'phase_3', learnNumber: 0});
                        this.setEngAndTransl(0);
                        clearTranslation();
                        return;
                    } else {
                        this.setState({exampleLearning: 'mistakesOrder', learnNumber: 0});
                        return;
                    }
                }
                this.setEngAndTransl(nextNumber);
                this.setState({learnNumber: nextNumber});
                clearTranslation();
                return;
            }
            setTimeout(() => this.setState({exampleLearning: null, learnNumber: 0}), 1000)
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
        if (quantity || quantity === 0) {
            const filteredArr = this.localProgress ?
                filter(this.localProgress, item => {
                    if (typeof (quantity) === 'number' && isDateBegin(item.date)) return +item.quantity === quantity;
                    if (typeof (quantity) === 'object' && isDateBegin(item.date)) {
                        return +item.quantity >= quantity[0] && +item.quantity <= quantity[1]
                    }
                }) : null;

            this.learnArr = filteredArr ? filteredArr.slice(0, sliceNumber) : null;
        } else {
            this.learnArr = this.localProgress ? this.localProgress.slice(0, sliceNumber) : null;
        }

        if (this.learnArr) {
            this.mistakesArr = [];
            map(this.learnArr, (item, key) => {
                this.learnArr[key].eng = get(videoItems, `[${item.entity_id}].eng`);
                this.learnArr[key].transl = get(videoItems, `[${item.entity_id}].transl`);
                this.mistakesArr.push({item: key, mistakes: 0});
            })
        }

        if (!this.learnArr) {
            const currentDate = getCurrentDate();
            const videoItemsKeyArr = Object.keys(videoItems);
            const videoItemsLength = videoItemsKeyArr.length;
            let learnArr = [];
            let mistakesArr = [];
            let i = sliceNumber;
            while (i) {
                const randomNumber = Math.floor(Math.random() * videoItemsLength);
                const videoItemId = videoItemsKeyArr[randomNumber];
                learnArr.push(
                    {
                        entity: 'video',
                        entity_id: videoItems[videoItemId].id,
                        videoId: videoItems[videoItemId].idVideoName,
                        eng: videoItems[videoItemId].eng,
                        transl: videoItems[videoItemId].transl,
                        quantity: 0,
                        date: currentDate
                    }
                );
                mistakesArr.push({item: i, mistakes: 0});
                i--;
            }
            this.mistakesArr = mistakesArr.length ? mistakesArr.slice(0, sliceNumber) : null;
            this.learnArr = learnArr.length ? learnArr.slice(0, sliceNumber) : null;
        }
    };

    repeat = () => {
        this.getLearnArray(this.state.repeatNumber, [1, 2]);//1,2 is count for new
        if (!this.learnArr) return;
        this.setEngAndTransl(this.state.learnNumber);
        this.setState({cycleLearning: 'repeat', exampleLearning: 'phase_2'});
    };

    exam = () => {
        this.getLearnArray(this.state.examNumber, 3);//0 is count for exam
        if (!this.learnArr) return;
        this.setEngAndTransl(this.state.learnNumber);
        this.setState({cycleLearning: 'exam', exampleLearning: 'phase_4'});
    };

    nextItem = () => {
        if (this.state.learnNumber < this.learnArr.length - 1) {
            setTimeout(() => {
                const nextNumber = this.state.learnNumber + 1;
                this.setEngAndTransl(nextNumber);
                this.setState({learnNumber: nextNumber});
                this.nextItem();
            }, 7000);
        } else {
            setTimeout(() => {
                this.setEngAndTransl(0);
                this.setState({exampleLearning: 'phase_1', learnNumber: 0});
            }, 7000);
        }
    };

    setEngAndTransl = (learnNumber) => {
        const entity = get(this.learnArr, `${learnNumber}.entity`);
        const entityId = get(this.learnArr, `${learnNumber}.entity_id`);
        const videoId = get(this.learnArr, `${learnNumber}.videoId`);
        let english = get(videoItems, `[${entityId}].eng`) ||'';
        english = english.replace(/^\s*/,'').replace(/\s*$/,'');
        const translation = get(videoItems, `[${entityId}].transl`);
        const start = get(videoItems, `[${entityId}].start`);
        const end = get(videoItems, `[${entityId}].end`);

        const videoIndex = findIndex(videoNames, {'id': videoId});
        const fileName = get(videoNames, `[${videoIndex}].fileName`);
        hideHint();
        this.setState({english, translation, entity, start, end, fileName})
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
        const {fileName, start, end, exampleLearning} = this.state;
        if (
            !fileName || !start || !end ||
            exampleLearning === 'phase_2' || exampleLearning === 'phase_4' ||
            exampleLearning === 'word_2' || exampleLearning === 'word_4'
        ) return;
        // const src = `../../../english_react/video/${fileName}#t=${start},${end}`;
        const src = `../../../video/${fileName}#t=${start},${end}`;
        return (
            <video
                className="video-hide"
                id='player'
                src={src}
                autoPlay
            />
        )
    }

    resetCycle = () => {
        this.setState({
            newCount: this.newCount,
            newCountFrom: this.newCountFrom,
            repeatCount: this.repeatCount,
            repeatCountFrom: this.repeatCountFrom,
            examCount: this.examCount,
            examCountFrom: this.examCountFrom,
            exampleLearning: null,
            cycleLearning: null
        });
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

        const isSound = checkIsSound.call(this);
        if (isSound) speak.call(this);
        const newCountTxt = newCountFrom ? ` - ${newCount}/${newCountFrom}` : null;
        const repeatCountTxt = repeatCountFrom ? ` - ${repeatCount}/${repeatCountFrom}` : null;
        const examCountTxt = examCountFrom ? ` - ${examCount}/${examCountFrom}` : null;

        return (
            <Container className='new-container'>
                {!cycleLearning &&
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
                                onClick={this.warn}
                                children={randomExam}
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
                            {this.renderVideo()}
                            {soundButton.call(this)}
                            {getBadgeTranslation.call(this)}
                            {getBadgeAnswer.call(this)}
                            {getInput.call(this)}
                            {getWordsArr.call(this)}
                            {getProgressBar.call(this)}
                            {getBadge.call(this)}
                            {getMistakesOrder.call(this)}
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
    english = english.toLowerCase().replace(/^\s*/, '').replace(/\s*$/, '').replace(/\./g, "");
    let wordsArr = null;
    const isWord = english.replace(/ /g, "") === english;
    this.englishArr = isWord ? english.split('') : english.split(' ');

    if (
        exampleLearning === 'phase_1' || exampleLearning === 'phase_2' ||
        (exampleLearning === 'phase_3' && !isWord) ||
        exampleLearning === 'word_1' || exampleLearning === 'word_2'
    ) {
        const disabled = exampleLearning === 'phase_3' || exampleLearning === 'word_3';
        const variant = disabled ? 'light' : 'info';
        const randArr = isWord ? english.split('') : english.split(' ');
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
                        points = '(' + word.replace(/[a-z]/g, '.') + ')';
                    }
                    return (
                        <Button
                            variant={variant}
                            key={index + word + d}
                            onClick={this.wordClick}
                            className={className}
                            size="lg"
                            disabled={disabled}
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

export function getInput() {
    const {exampleLearning, english} = this.state;
    if (!english || !exampleLearning) return null;

    let input = null;
    const isWord = english.replace(/ /g, "") === english;
    this.englishArr = isWord ? english.split('') : english.split(' ');

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
        btn = (
            <Button
                variant="success"
                className="title_sound"
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
        badgeTranslation = (
            <h3><Badge variant="secondary">{translation}</Badge></h3>
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

export function getBadge() {
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
    if (exampleLearning === 'mistakesOrder') {
        if (this.localProgress) {
            map(this.learnArr, (item, key) => {
                const entityId = item.entity_id;
                const quantity = item.quantity;
                const isMistake = this.mistakesArr[key].mistakes > 2;
                const newDateAndQuantity = getNewDate(quantity, isMistake);
                const index = findIndex(this.localProgress, {'entity_id': entityId});
                if (index > -1) {
                    this.localProgress[index].date = newDateAndQuantity.newDate;
                    this.localProgress[index].quantity = newDateAndQuantity.newQuantity;
                }
                localStorage.progress = JSON.stringify(this.localProgress);
                this.getLocalProgress();
            });
        }
        mistakesOrder = (
            <Fragment>
                <h3 children={mistakesOrderTxt}/>
                {map(this.learnArr, (item, key) => {
                    const mistakesCount = get(this.mistakesArr, `[${key}].mistakes`);
                    const icon = mistakesCount > 2 ?
                        <TiTimesOutline className='mistakes-error'/> :
                        <TiTickOutline className='mistakes-right'/>;
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

export function speak() {
    if (!this.filteredVoices || !this.filteredVoices.lenght) this.getVoices();
    const {english, entity, end, start} = this.state;
    if (entity === 'video') return playVideo.call(this, start, end);
    ;
    const text = english;

    const utterance = new SpeechSynthesisUtterance(text);
    const randomVoice = this.filteredVoices ? Math.floor(Math.random() * this.filteredVoices.length) : null;
    utterance.voice = randomVoice ? this.filteredVoices[randomVoice] : null;
    if (!utterance.voice) utterance.lang = 'en';
    speechSynthesis.speak(utterance);
}

export function checkIsSound(text) {
    const {exampleLearning} = this.state;
    if (
        exampleLearning === 'word_1' || exampleLearning === 'word_3' || exampleLearning === 'word_5' ||
        exampleLearning === 'phase_1' || exampleLearning === 'phase_3' || exampleLearning === 'phase_5'
    ) {
        return true;
    }

    return false;
}

export function wordClicked(e) {
    const elem = e.currentTarget;
    const currentTxt = get(elem, 'innerText');
    const rightTxt = get(this, 'englishArr[0]');
    if (currentTxt === rightTxt) {
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
    const badge = document.getElementById('translation');
    if (badge) badge.innerText += ` ${rightTxt}`;
}

export function changedInput() {
    const formInput = document.getElementById('formInput');
    const letter = get(formInput, 'value') ? formInput.value.substr(0, 1) : null;
    const letterUp = letter.toUpperCase();
    const rightTxt = get(this, 'englishArr[0]');
    if (rightTxt && letterUp === rightTxt.substr(0, 1).toUpperCase()) {
        this.rightClick(rightTxt);
        formInput.value = '';
    } else {
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
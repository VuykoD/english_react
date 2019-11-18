import React, {Component, Fragment} from 'react';
import get from 'lodash/get';
import map from 'lodash/map';
import filter from 'lodash/filter';
import {Button, Col, Container, Form, Row, Badge, ProgressBar} from "react-bootstrap";

import '../../scc/learning.css';

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
};

export default class Learning extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exampleLearning: null,
            showTranslation: true
        };
        this.englishArr = [];
        this.english = '';
    }

    componentDidMount() {
        this.getVoices();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        focusInput();
    }

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
        this.english = id.substr(0, 4) === 'word' ? "inspiration" : 'my name is Dmitriy';
        this.setState({exampleLearning: id});
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
        rightClicked.call(this, rightTxt);
        if (this.englishArr.length === 0) setTimeout(() => this.setState({exampleLearning: null}), 1000)
    };

    speakTxt = () => {
        focusInput();
        speak.call(this);
    };

    onChangeInput = () => {
        changedInput.call(this);
    };

    render() {
        const {exampleLearning} = this.state;
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

        const formControl = (
            <Form.Control as="select">
                <option>3</option>
                <option>4</option>
            </Form.Control>
        );

        const translation = exampleLearning && exampleLearning.substr(0, 4) === 'word' ?
            'натхнення' : 'Мене звати Дмитро';

        const isSound = checkIsSound.call(this);
        if (isSound) speak.call(this);

        return (
            <Container className='new-container'>
                <Row>
                    <Col sm={1}/>
                    <Col sm={8}>
                        <Row>
                            <Col sm={3}>
                                {formControl}
                            </Col>
                            <Col>
                                <Button variant="info" block>{newLearn}</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={3}>
                                {formControl}
                            </Col>
                            <Col>
                                <Button variant="info" block>{repeat}</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={3}>
                                {formControl}
                            </Col>
                            <Col>
                                <Button variant="success" block>{exam}</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={2}>
                        <Form.Group controlId="words">
                            <Form.Check type="checkbox" label={words}/>
                        </Form.Group>
                        <Form.Group controlId="course">
                            <Form.Check type="checkbox" label={course}/>
                        </Form.Group>
                        <Form.Group controlId="video">
                            <Form.Check type="checkbox" label={video}/>
                        </Form.Group>
                    </Col>
                    <Col sm={1}/>
                </Row>
                <Row>
                    <h3 className='new-row' children={examples}/>
                </Row>
                <Row className="text-center new-row">
                    {!exampleLearning &&
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
                            {soundButton.call(this)}
                            {getBadgeTranslation.call(this, translation)}
                            <h2 className='translation'><Badge variant="light" id='translation'></Badge></h2>
                            {getInput.call(this)}
                            {getWordsArr.call(this)}
                            {getProgressBar.call(this)}
                        </Col>
                    </Fragment>
                    }
                </Row>
            </Container>
        );
    }
};

export function getWordsArr() {
    const english = this.english.toLowerCase();
    const {exampleLearning} = this.state;
    let wordsArr = null;

    if (
        exampleLearning === 'phase_1' || exampleLearning === 'phase_2' ||
        exampleLearning === 'word_1' || exampleLearning === 'word_2'
    ) {
        const isWord = english.replace(/ /g, "") === english;
        this.englishArr = isWord ? english.split('') : english.split(' ');
        const randArr = isWord ? english.split('') : english.split(' ');
        randArr.sort(() => {
            return .5 - Math.random();
        });

        wordsArr = (
            <div>
                {map(randArr, (word, index) => {
                    return (
                        <Button
                            variant="info"
                            key={index + word}
                            onClick={this.wordClick}
                            className="words"
                            size="lg"
                        >
                            {word}
                        </Button>
                    )
                })}
            </div>
        )
    }
    return wordsArr
}

export function getInput() {
    const {exampleLearning} = this.state;
    let input = null;
    const english = this.english;
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
                <img src="images/Sound.png" className="title_sound" alt=''/>
            </Button>
        )
    }
    return btn
}

export function getBadgeTranslation(translation) {
    const {showTranslation} = this.state;

    return showTranslation? (<h3><Badge variant="secondary">{translation}</Badge></h3>): null;
}

export function getBadge() {
    const {exampleLearning} = this.state;
    let badge = null;

    if (exampleLearning === 'phase_5' || exampleLearning === 'word_5') {
        badge = (<h3><Badge variant="light">{this.english}</Badge></h3>);
    }

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

export function speak() {
    if (!this.filteredVoices || !this.filteredVoices.lenght) this.getVoices();
    const text = this.english;
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
        elem.className += " blink-2";
        setTimeout(() => {
            if (elem) elem.classList.remove('blink-2')
        }, 500)
    }
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
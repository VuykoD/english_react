import React, {Component, Fragment} from 'react';
import get from 'lodash/get';
import map from 'lodash/map';
import {Button, Col, Container, Form, Row, Badge, FormControl} from "react-bootstrap";

import '../../scc/learning.css';

const content = {
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
};

export default class Learning extends Component {
    constructor(props) {
        super(props);

        this.state = {exampleLearning: null};
        this.englishArr = [];
    }

    exampleLearning = (e) => {
        const elem = e.currentTarget;
        const id = elem.getAttribute('id');
        this.setState({exampleLearning: id})
    };

    wordClick = (e) => {
        const elem = e.currentTarget;
        const currentTxt = get(elem, 'innerText');
        const rightTxt = get(this, 'englishArr[0]');
        if (currentTxt === rightTxt) {
            this.englishArr.shift();
            const badge = document.getElementById('translation');
            const translationTxt = get(badge, 'innerText');
            badge.innerText += ` ${currentTxt}`;
            e.currentTarget.remove();
            if (this.englishArr.length === 0) setTimeout(() => this.setState({exampleLearning: null}), 1000)
        }
    };

    render() {
        const {exampleLearning} = this.state;
        const {siteLang} = this.props.store;
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
        const english = exampleLearning && exampleLearning.substr(0, 4) === 'word' ?
            "inspiration" : 'my name is Dima';
        const translation = exampleLearning && exampleLearning.substr(0, 4) === 'word' ?
            'натхнення' : 'Мене звати Дмитро';

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
                                Скласти по буквам по озвученому
                            </Button>
                            <Button
                                id="word_2"
                                variant="light"
                                block onClick={this.exampleLearning}
                            >
                                Скласти по буквам - переклад
                            </Button>
                            <Button variant="light" block>Написати слово по озвученому</Button>
                            <Button variant="light" block>Написати слово - переклад</Button>
                            <Button variant="light" block>Повторити по озвученому</Button>
                        </Col>
                        <Col>
                            <h5 children={forPhrases}/>
                            <Button
                                id="phase_1"
                                variant="light"
                                block onClick={this.exampleLearning}
                            >
                                Скласти по словам по озвученому
                            </Button>
                            <Button
                                id="phase_2"
                                variant="light"
                                block
                                onClick={this.exampleLearning}
                            >
                                Скласти по словам - переклад
                            </Button>
                            <Button variant="light" block>Написати перші літери по озвученому</Button>
                            <Button variant="light" block>Написати перші літери - переклад</Button>
                            <Button variant="light" block>Повторити по озвученому</Button>
                        </Col>
                    </Fragment>
                    }
                    {exampleLearning &&
                    <Fragment>
                        <Col>
                            {getBadgeTranslation.call(this, translation)}
                            <h2 className='translation'><Badge variant="dark" id='translation'></Badge></h2>
                            {getInput.call(this)}
                            {getWordsArr.call(this, english)}
                        </Col>
                    </Fragment>
                    }
                </Row>
            </Container>
        );
    }
};

function getWordsArr(english) {
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
                            key={index}
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

function getInput() {
    const {exampleLearning} = this.state;
    let input = null;

    if (exampleLearning === 'phase_3' || exampleLearning === 'phase_4') {
        input = (<FormControl type="text" placeholder={"..."} className="mr-sm-2 search"/>)
    }
    return input
}

function getBadgeTranslation(translation) {
    const {exampleLearning} = this.state;
    let badgeTranslation = null;

    if (exampleLearning === 'phase_2' || exampleLearning === 'word_2') {
        badgeTranslation = (
            <h3><Badge variant="secondary">{translation}</Badge></h3>
        )
    }
    return badgeTranslation
}
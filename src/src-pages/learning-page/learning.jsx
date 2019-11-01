import React, {Component, Fragment} from 'react';
import get from 'lodash/get';
import {Button, Col, Container, Form, Row, Badge} from "react-bootstrap";

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

        this.state = { exampleLearning: null };
    }

    exampleLearning=(e)=>{
        this.setState({exampleLearning: 1})
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

        const english = 'my name is Dima';
        const translation = 'Мене звати Дмитро';

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
                    <h3 className='new-row' children={examples} />
                </Row>
                    <Row className="text-center new-row">
                        {!exampleLearning &&
                            <Fragment>
                                <Col>
                                    <h5 children={forWords} />
                                    <Button variant="light" block>Скласти по буквам по озвученому</Button>
                                    <Button variant="light" block>Скласти по буквам - переклад</Button>
                                    <Button variant="light" block>Написати слово по озвученому</Button>
                                    <Button variant="light" block>Написати слово - переклад</Button>
                                    <Button variant="light" block>Повторити по озвученому</Button>
                                </Col>
                                <Col>
                                    <h5  children={forPhrases} />
                                    <Button variant="light" block onClick={this.exampleLearning}>Скласти по словам по озвученому</Button>
                                    <Button variant="light" block>Скласти по словам - переклад</Button>
                                    <Button variant="light" block>Написати перші літери по озвученому</Button>
                                    <Button variant="light" block>Написати перші літери - переклад</Button>
                                    <Button variant="light" block>Повторити по озвученому</Button>
                                </Col>
                            </Fragment>
                        }
                        {exampleLearning &&
                            <Fragment>
                                <h3><Badge variant="secondary">{translation}</Badge></h3>
                                <h3><Badge variant="secondary">{english}</Badge></h3>
                            </Fragment>
                        }
                    </Row>
            </Container>
        );
    }
};
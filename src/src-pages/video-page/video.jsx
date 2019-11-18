import React, {Component} from 'react';
import PropTypes from "prop-types";
import get from 'lodash/get';
import map from 'lodash/map';
import {Col, Container, Row, Dropdown, DropdownButton, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import videoNames from '../../dict/videoNames';

import '../../scc/video.css';

const content = {
    catalog: {
        ru: "Каталог Видео",
        ukr: "Каталог Відео",
    },
    hideSelected: {
        ru: "Скрыть отобраное",
        ukr: "Скрити відібране",
    },
    allVideo: {
        ru: "Все видео",
        ukr: "Усі відео",
    },
    cartoon: {
        ru: "Мультфильмы",
        ukr: "Мультфільми",
    },
    interesting: {
        ru: "Интересное",
        ukr: "Цікаве",
    },
    videoLesson: {
        ru: "Видео уроки",
        ukr: "Відео уроки",
    },
    music: {
        ru: "Музыка",
        ukr: "Музика",
    },
    anyLvl: {
        ru: "Любая сложность",
        ukr: "Будь-яка складність",
    },
    easy: {
        ru: "Легкий",
        ukr: "Легкий",
    },
    medium: {
        ru: "Средний",
        ukr: "Середній",
    },
    hard: {
        ru: "Сложный",
        ukr: "Тяжкий",
    },
    videoCount: {
        ru: "Предложений",
        ukr: "Речень",
    },
    newVideo: {
        ru: "Новые видео",
        ukr: "Нові відео",
    },
};

export default class Video extends Component {
    render() {
        const {siteLang} = this.props.store;
        const catalog = get(content, `catalog[${siteLang}]`);
        const hideSelected = get(content, `hideSelected[${siteLang}]`);
        const newVideo = get(content, `newVideo[${siteLang}]`);
        const allVideo = get(content, `allVideo[${siteLang}]`);
        const cartoon = get(content, `cartoon[${siteLang}]`);
        const interesting = get(content, `interesting[${siteLang}]`);
        const videoLesson = get(content, `videoLesson[${siteLang}]`);
        const music = get(content, `music[${siteLang}]`);
        const anyLvl = get(content, `anyLvl[${siteLang}]`);
        const easy = get(content, `easy[${siteLang}]`);
        const medium = get(content, `medium[${siteLang}]`);
        const hard = get(content, `hard[${siteLang}]`);
        const videoCount = get(content, `videoCount[${siteLang}]`);

        const cardHorizontal = (
            <Col>
                <Row className='new-video card-horizontal'>
                    <Col>
                        <img src="images/video/30.png" alt=""/>
                    </Col>
                    <Col>
                        <Row className="text-center">
                            <Col>
                                <span className="type">{music}</span>
                                <span className="level">{medium}</span>
                            </Col>
                        </Row>
                        <Row className="text-center">
                            <Col>
                                <img src="images/video/puzzle.png" alt="" className="img-button-video"/>
                                <span>{videoCount}:20</span>
                            </Col>
                        </Row>
                        <div>Nirvana - The Man Who Sold The World</div>
                    </Col>
                </Row>
            </Col>
        );

        return (
            <Container>
                <Row className="text-center">
                    <Col>
                        <h1 className="video-topic">{newVideo}</h1>
                    </Col>
                </Row>
                <Row className="new-video-front text-center">
                    {cardHorizontal}
                    {cardHorizontal}
                </Row>
                <Row className="text-center">
                    <Col>
                        <h3>{catalog}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col sm={2}>
                        <DropdownButton id="dropdown-basic-button" title={allVideo}>
                            <Dropdown.Item href="#/action-1">{allVideo}</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">{cartoon}</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">{interesting}</Dropdown.Item>
                            <Dropdown.Item href="#/action-4">{videoLesson}</Dropdown.Item>
                            <Dropdown.Item href="#/action-5">{music}</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col sm={2}>
                        <DropdownButton id="dropdown-basic-button" title={anyLvl}>
                            <Dropdown.Item href="#/action-1">{anyLvl}</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">{easy}</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">{medium}</Dropdown.Item>
                            <Dropdown.Item href="#/action-4">{hard}</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col sm={6}>
                    </Col>
                    <Col sm={2}>
                        <Form.Group controlId="words">
                            <Form.Check type="checkbox" label={hideSelected}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="text-center">
                    {
                        map(videoNames, (item, key) => {
                            let level = '';
                            switch (item.level) {
                                case 'easy':
                                    level = easy;
                                    break;
                                case 'medium':
                                    level = medium;
                                    break;
                                case 'hard':
                                    level = hard;
                                    break;
                                default:
                                    break;
                            }

                            let type = '';
                            switch (item.type) {
                                case 'music':
                                    type = music;
                                    break;
                                case 'cartoon':
                                    type = cartoon;
                                    break;
                                default:
                                    break;
                            }

                            return (
                                <Col sm={3} className='new-video' key={key}>
                                    <CardVertical
                                        item={item}
                                        videoCount={videoCount}
                                        level={level}
                                        type={type}
                                    />
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        );
    }
};

class CardVertical extends Component {
    static propTypes = {
        item: PropTypes.shape({}),
        videoCount: PropTypes.string,
        level: PropTypes.string,
        type: PropTypes.string,
    };

    render() {
        const {item = {}, videoCount, level, type} = this.props;

        return (
            <Link to={`${item.url}`}>
                <div className="card-vertical">
                    <img src={`images/video/${item.imageName}`} alt="" className="img-video"/>
                    <Row className="text-center">
                        <Col>
                            <span className="type">{type}</span>
                            <span className="level">{level}</span>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <Col>
                            <img src="images/video/puzzle.png" alt="" className="img-button-video"/>
                            <span>{videoCount}:20</span>
                        </Col>
                    </Row>
                    <div children={item.songName}/>
                </div>
            </Link>
        )
    }
}

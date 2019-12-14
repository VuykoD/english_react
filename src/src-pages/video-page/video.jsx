import React, {Component, Fragment} from 'react';
import PropTypes from "prop-types";
import get from 'lodash/get';
import map from 'lodash/map';
import filter from 'lodash/filter';
import {Col, Container, Row, Dropdown, DropdownButton, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import videoNames from '../../dict/videoNames';
import videoItems from '../../dict/videoItems';
import {TiTick} from "react-icons/ti";

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
    constructor(props) {
        super(props);

        this.state = {
            level: 'anyLvl',
            type: 'allVideo'
        };
    }

    getLangType = () => {
        const {siteLang} = this.props.store;
        const cartoon = get(content, `cartoon[${siteLang}]`);
        const interesting = get(content, `interesting[${siteLang}]`);
        const videoLesson = get(content, `videoLesson[${siteLang}]`);
        const music = get(content, `music[${siteLang}]`);
        return {cartoon, interesting, videoLesson, music};
    };

    getLangLevel = () => {
        const {siteLang} = this.props.store;
        const easy = get(content, `easy[${siteLang}]`);
        const medium = get(content, `medium[${siteLang}]`);
        const hard = get(content, `hard[${siteLang}]`);
        return {easy, medium, hard};
    };

    getLevelAndType = (item) => {
        const langType = this.getLangType();
        const langLevel = this.getLangLevel();

        let level = '';
        switch (item.level) {
            case 'easy':
                level = langLevel.easy;
                break;
            case 'medium':
                level = langLevel.medium;
                break;
            case 'hard':
                level = langLevel.hard;
                break;
            default:
                break;
        }

        let type = '';
        switch (item.type) {
            case 'cartoon':
                type = langType.cartoon;
                break;
            case 'interesting':
                type = langType.interesting;
                break;
            case 'videoLesson':
                type = langType.videoLesson;
                break;
            case 'music':
                type = langType.music;
                break;
            default:
                break;
        }

        return {level, type};
    };

    setLevel = (e) => {
        const elem = e.currentTarget;
        if (elem) {
            const level = elem.getAttribute('level');
            this.setState({level})
        }
    };

    setType = (e) => {
        const elem = e.currentTarget;
        if (elem) {
            const type = elem.getAttribute('type');
            this.setState({type});
        }
    };

    render() {
        const langType = this.getLangType();
        const langLevel = this.getLangLevel();
        const {siteLang} = this.props.store;

        const catalog = get(content, `catalog[${siteLang}]`);
        const hideSelected = get(content, `hideSelected[${siteLang}]`);
        const newVideo = get(content, `newVideo[${siteLang}]`);
        const allVideo = get(content, `allVideo[${siteLang}]`);
        const anyLvl = get(content, `anyLvl[${siteLang}]`);
        const videoCount = get(content, `videoCount[${siteLang}]`);
        const currentLevel = get(content, `${this.state.level}[${siteLang}]`);
        const currentType = get(content, `${this.state.type}[${siteLang}]`);

        const lastTwoVideos = videoNames.slice(-2);
        let filteredVideo = filter(videoNames, itemVideo => {
            return itemVideo.level === this.state.level || this.state.level === "anyLvl";
        });
        filteredVideo = filter(filteredVideo, itemVideo => {
            return itemVideo.type === this.state.type || this.state.type === "allVideo";
        });

        return (
            <Fragment>
                <div className="new-video-front">
                    <Container>

                        <Row className="text-center">
                            <Col>
                                <h1 className="video-topic">{newVideo}</h1>
                            </Col>
                        </Row>
                        <Row className="text-center">
                            {
                                map(lastTwoVideos, (item, key) => {
                                    const levelAndType = this.getLevelAndType(item);
                                    const filteredItems = filter(videoItems, videoItem => {
                                        return videoItem.idVideoName === item.id;
                                    });
                                    return (
                                        <Col className='new-video' key={key}>
                                            <CardHorizontal
                                                item={item}
                                                videoCount={videoCount}
                                                level={levelAndType.level}
                                                type={levelAndType.type}
                                                count={filteredItems.length}
                                            />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Container>
                </div>
                < Container>
                    < Row
                        className="text-center">
                        < Col>
                            < h3> {catalog}
                            </h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={2}>
                            <DropdownButton id="dropdown-basic-button" title={currentType}>
                                <Dropdown.Item
                                    href="#/action-1"
                                    onClick={this.setType}
                                    type="allVideo"
                                >
                                    {allVideo}
                                </Dropdown.Item>
                                <Dropdown.Item
                                    href="#/action-2"
                                    onClick={this.setType}
                                    type="cartoon"
                                >
                                    {langType.cartoon}
                                </Dropdown.Item>
                                <Dropdown.Item
                                    href="#/action-3"
                                    onClick={this.setType}
                                    type="interesting"
                                >
                                    {langType.interesting}
                                </Dropdown.Item>
                                <Dropdown.Item
                                    href="#/action-4"
                                    onClick={this.setType}
                                    type="videoLesson"
                                >
                                    {langType.videoLesson}
                                </Dropdown.Item>
                                <Dropdown.Item
                                    href="#/action-5"
                                    onClick={this.setType}
                                    type="music"
                                >
                                    {langType.music}
                                </Dropdown.Item>
                            </DropdownButton>
                        </Col>
                        <Col sm={2}>
                            <DropdownButton id="dropdown-basic-button" title={currentLevel}>
                                <Dropdown.Item
                                    href="#/action-1"
                                    onClick={this.setLevel}
                                    level="anyLvl"
                                >
                                    {anyLvl}
                                </Dropdown.Item>
                                <Dropdown.Item
                                    href="#/action-2"
                                    onClick={this.setLevel}
                                    level="easy"
                                >
                                    {langLevel.easy}
                                </Dropdown.Item>
                                <Dropdown.Item
                                    href="#/action-3"
                                    onClick={this.setLevel}
                                    level="medium"
                                >
                                    {langLevel.medium}
                                </Dropdown.Item>
                                <Dropdown.Item
                                    href="#/action-4"
                                    onClick={this.setLevel}
                                    level="hard"
                                >
                                    {langLevel.hard}
                                </Dropdown.Item>
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
                            map(filteredVideo, (item, key) => {
                                const levelAndType = this.getLevelAndType(item);
                                const filteredItems = filter(videoItems, videoItem => {
                                    return videoItem.idVideoName === item.id;
                                });

                                return (
                                    <Col sm={3} className='new-video' key={key}>
                                        <CardVertical
                                            item={item}
                                            videoCount={videoCount}
                                            level={levelAndType.level}
                                            type={levelAndType.type}
                                            count={filteredItems.length}
                                        />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
            </Fragment>
        );
    }
};

class CardVertical extends Component {
    static propTypes = {
        item: PropTypes.shape({}),
        videoCount: PropTypes.string,
        level: PropTypes.string,
        type: PropTypes.string,
        count: PropTypes.number
    };

    render() {
        const {item = {}, videoCount, level, type, count} = this.props;

        return (
            <Link to={`/english_react/video${item.url}`}>
                <div className="card-vertical">
                    {/*<img src={`../../../english_react/images/video/${item.imageName}`} alt="" className="img-video"/>*/}
                    <span className='selected'>
                        <TiTick className='selected'/>
                    </span>
                    <img src={`../../../images/video/${item.imageName}`} alt="" className="img-video"/>
                    <Row className="text-center">
                        <Col>
                            <span className="type">{type}</span>
                            <span className="level">{level}</span>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <Col>
                            {/*<img src="../../../english_react/images/video/puzzle.png" alt="" className="img-button-video"/>*/}
                            <img src="../../../images/video/puzzle.png" alt="" className="img-button-video"/>
                            <span>{videoCount}:{count}</span>
                        </Col>
                    </Row>
                    <div children={item.songName}/>
                </div>
            </Link>
        )
    }
}

class CardHorizontal extends Component {
    static propTypes = {
        item: PropTypes.shape({}),
        videoCount: PropTypes.string,
        level: PropTypes.string,
        type: PropTypes.string,
        count: PropTypes.number
    };

    render() {
        const {item = {}, videoCount, level, type, count} = this.props;

        return (
            <Link to={`/english_react/video${item.url}`}>
                <Col>
                    <Row className='new-video card-horizontal'>
                        <Col>
                            {/*<img src={`../../../english_react/images/video/${item.imageName}`} alt="" className="img-video"/>*/}
                            <img src={`../../../images/video/${item.imageName}`} alt="" className="img-video"/>
                        </Col>
                        <Col>
                            <Row className="text-center">
                                <Col>
                                    <span className="type">{type}</span>
                                    <span className="level">{level}</span>
                                </Col>
                            </Row>
                            <Row className="text-center">
                                <Col>
                                    {/*<img src="../../../english_react/images/video/puzzle.png" alt="" className="img-button-video"/>*/}
                                    <img src="../../../images/video/puzzle.png" alt="" className="img-button-video"/>
                                    <span>{videoCount}:{count}</span>
                                </Col>
                            </Row>
                            <div children={item.songName}/>
                        </Col>
                    </Row>
                </Col>
            </Link>
        )
    }
}
import React, {Component} from 'react';
import get from 'lodash/get';
import {Col, Container, Row} from "react-bootstrap";

import '../../scc/video.css';

const content = {
    music: {
        ru:"Музыка",
        ukr:"Музика",
    },
    medium: {
        ru:"Средний",
        ukr:"Средній",
    },
    videoCount: {
        ru: "Предложений",
        ukr: "Реченнь",
    },
    newVideo: {
        ru: "Новые видео",
        ukr: "Нові відео",
    },
};

export default class Video extends Component {
    render() {
        const {siteLang} = this.props.store;
        const newVideo = get(content, `newVideo[${siteLang}]`);
        const music = get(content, `music[${siteLang}]`);
        const medium = get(content, `medium[${siteLang}]`);
        const videoCount = get(content, `videoCount[${siteLang}]`);

        const cardHorizontal = (
            <Col>
                <Row className='new-video'>
                    <Col>
                        <img src="images/video/30.png" alt=""/>
                    </Col>
                    <Col>
                        <span className="music">{music}</span>
                        <span className="medium">{medium}</span>
                        <button className="button-video">
                            <img src="images/video/puzzle.png" alt="" className="img-button-video"/>
                            <span>{videoCount}:20</span>
                        </button>
                        <div>Nirvana - The Man Who Sold The World</div>
                    </Col>
                </Row>
            </Col>
        );

        return (
            <Container>
                <Row className="text-center">
                    <h1 className="video-topic">{newVideo}</h1>
                </Row>
                <Row className="new-video-front">
                    {cardHorizontal}
                    {cardHorizontal}
                </Row>
            </Container>
        );
    }
};
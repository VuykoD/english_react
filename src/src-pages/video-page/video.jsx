import React, {Component} from 'react';
import  get  from 'lodash/get';
import {Col, Container, Row} from "react-bootstrap";

import '../../scc/video.css';

const content = {
    videoCount:{
        ru:"Предложений",
        ukr:"Реченнь",
    },
    newVideo:{
        ru:"Новие видео",
        ukr:"Нові відео",
    },
};

export default class Video extends Component {
  render(){
      const {siteLang} = this.props.store;
      const newVideo = get(content, `newVideo[${siteLang}]`);
      const videoCount = get(content, `videoCount[${siteLang}]`);

    return (
        <Container>
        <Row>
              <Col md="auto" >
                   <div className="new-video-front">
                        <span className="new-video-logo">{newVideo}</span>
                        <div className="new-video">
                            <img src="images/video/30.png" alt=""/>
                            <button className="button-video">
                                <img src="images/video/puzzle.png" alt="" className="img-button-video"/>
                                <span>{videoCount}</span>
                            </button>
                        </div>
                    </div>
              </Col>
        </Row>
        </Container>
    );
  }
};
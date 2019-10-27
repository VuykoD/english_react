import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import  get  from 'lodash/get';
import { Container, Row, Col } from 'react-bootstrap';

import '../../../scc/home-page.css';

const content = {
    mainHead:{
        ru:'Самый крутой сайт по изучению иностранных языков.',
        ukr:'Найкрутіший сайт по вивченню іноземних мов.'
    },
    mainText:{
        ru:'Здесь отобраны самые интересные и эфективные методики. Можно развить словарный запас, слуховое восприятие и даже произношение. Вы будете понимать иностранные песни и фильми. Сайт разработан таким образом, что в процессе изучения ви будете постоянно повторять пройденный матерыал ',
        ukr:'Найкрутіший сайт по вивченню іноземних мов.'
    },
    firstBlock:{
        ru:'Изучение с помощью видео',
        ukr:'Навчання за допомогою вiдео'
    },
    firstText:{
        ru:'В этом разделе можно выбирать ролики и сразу же попробовать составлять фразы из предлогаемых слов. Повторять тексты из любимых клипов довольно интересно нежели простая зубрилка.',
        ukr:''
    },
    secondBlock:{
        ru:'Тренажоры для курсов',
        ukr:'Тренажери для курсів'
    },
    secondText:{
        ru:'Вы можете выбрать нужный Вам курс в разделе курсы. Есть разные типы на предложения и на слова. Цикл обучения разбит на 3 этапа: изучение нового, повторение, и экзамен. Изученое без практики и пополнения убывают с каждым днем. Запомните: повторение - мать учения.',
        ukr:'123'
    },
    thirdBlock:{
        ru:'Тренажери для видео',
        ukr:'Тренажери для відео'
    },
    thirdText:{
        ru:'Изучение с помощю видео делает процес более быстрым и интересным. Таким образом обучение идет как бы в естественной обстановке в реальних ситуатциях. Вы слышите речь носителей языка. Самые разнообразные трейлеры, мультфильмы, клипы - все в этом разделе.',
        ukr:'123'
    },
    fourthBlock:{
        ru:'Изучение с помощью музыки',
        ukr:'Навчання за допомогою музики'
    },
    fourthText:{
        ru:'Вы обучаетесь и развлекаетесь одновременно. Вы развиваете навык восприятия английского языка на слух. Вы учите разговорные формы слов, фразовые глаголы и сленг. Вы учитесь естественной речи.',
        ukr:'Ви навчаєтеся і розважаєтесь одночасно. Ви розвиваєте навик сприйняття англійської мови на слух. Ви вчите розмовні форми слів, фразові дієслова і сленг. Ви вчитеся природної мови.'
    },
};

export default class HomePage extends Component {
    static propTypes = {
        store: PropTypes.shape({})
    };

  render(){
    const {siteLang } = this.props.store;
    const firstBlock = get(content, `firstBlock[${siteLang}]`);
    const firstText = get(content, `firstText[${siteLang}]`);
    const secondBlock = get(content, `secondBlock[${siteLang}]`);
    const secondText = get(content, `secondText[${siteLang}]`);
    const thirdBlock = get(content, `thirdBlock[${siteLang}]`);
    const thirdText = get(content, `thirdText[${siteLang}]`);
    const fourthBlock = get(content, `fourthBlock[${siteLang}]`);
    const fourthText = get(content, `fourthText[${siteLang}]`);
    const mainHead = get(content, `mainHead[${siteLang}]`);
    const mainText = get(content, `mainText[${siteLang}]`);

    return (
        <div className="decoration">
            <Container>
                <Row>
                    <Col sm={8}>
                        <div className="block block-left">
                            <p className="block-head">
                                {firstBlock}
                            </p>
                            <div className="block-img">
                                <img src="images/home-page/movie12.png" className="block-img"/>
                            </div>
                            <p className="block-text">
                                {firstText}
                            </p>
                        </div>
                    </Col>
                    <Col sm={4}>
                        <div className="block block-right small-blocks">
                            <p className="block-head">
                                {secondBlock}
                            </p>
                            <p className="block-text small-block">
                                {secondText}
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <div className="block block-left small-blocks">
                            <p className="block-head">
                                {thirdBlock}
                            </p>
                            <p className="block-text small-block">
                                {thirdText}
                            </p>
                        </div>
                    </Col>
                    <Col sm={8}>
                        <div className="block block-right">
                            <p className="block-head">
                                {fourthBlock}
                            </p>
                            <div className="block-img">
                                <img src="images/home-page/music.png" className="block-img"/>
                            </div>
                            <p className="block-text">
                                {fourthText}
                            </p>
                        </div>
                    </Col>
                </Row>
                <h1 className="main-head">{mainHead}</h1>
                <p className="main-txt">{mainText}</p>
            </Container>
        </div>

    );
  }
};
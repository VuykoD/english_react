import React, {Component} from 'react';
import PropTypes from 'prop-types';
import  get  from 'lodash/get';
import { Container, Row, Col } from 'react-bootstrap';

import '../../scc/home-page.css';

const content = {
    mainHead: {
        ru: 'Самый крутой сайт по изучению иностранных языков.',
        ukr: 'Найкрутіший сайт по вивченню іноземних мов.',
        pol: 'Najlepsza strona do nauki języków obcych.',
        eng: 'The coolest site for learning foreign languages.'
    },
    mainText: {
        ru: 'Здесь отобраны самые интересные и эфективные методики. Можно развить словарный запас, слуховое восприятие и даже произношение. Вы будете понимать иностранные песни и фильмы. Сайт разработан таким образом, что в процессе изучения необходимо будет постоянно повторять пройденный материал.',
        ukr: 'Тут відібрані найцікавіші і ефективні методики. Можна розвинути словниковий запас, слухове сприйняття і навіть вимову. Ви будете розуміти іноземні пісні і фільми. Сайт розроблений таким чином, що в процесі вивчення необхідно буде постійно повторювати пройдений матеріал.',
        pol: 'Tutaj wybrane są najciekawsze i skuteczne metody. Możesz rozwijać słownik, percepcję słuchową, a nawet wymowę. Zrozumiesz obce piosenki i filmy. Strona została zaprojektowana tak, że w trakcie nauki konieczne jest regularne powtarzanie przechodzonego materiału.',
        eng: 'Here, the most interesting and effective methods are selected. You can develop vocabulary, auditory perception, and even pronunciation. You will understand foreign songs and movies. The site is designed in such a way that during the learning process, you will need to constantly repeat the material covered.'
    },
    firstBlock: {
        ru: 'Изучение с помощью видео',
        ukr: 'Навчання за допомогою вiдео',
        pol: 'Nauka za pomocą wideo',
        eng: 'Learning with video'
    },
    firstText: {
        ru: 'В этом разделе можно выбирать ролики и сразу же попробовать составлять фразы из предлогаемых слов. Повторять тексты из любимых клипов довольно интересно нежели простая зубрилка.',
        ukr: 'У цьому розділі можна вибирати ролики і відразу ж спробувати складати фрази з пропонуємих слів. Повторювати тексти з улюблених кліпів досить цікаво ніж проста зубрилка.',
        pol: 'W tym dziale możesz wybierać filmy i od razu próbować składać zdania z proponowanych słów. Powtarzanie tekstów z ulubionych teledysków jest dość interesujące, bardziej niż zwykłe zakuwanie.',
        eng: 'In this section, you can choose videos and immediately try to compose phrases from the suggested words. Repeating texts from favorite clips is quite interesting compared to simple cramming.'
    },
    secondBlock: {
        ru: 'Тренажеры для курсов',
        ukr: 'Тренажери для курсів',
        pol: 'Trenerzy do kursów',
        eng: 'Course trainers'
    },
    secondText: {
        ru: 'Вы можете выбрать нужный Вам курс в разделе курсы. Есть разные типы на предложения и на слова. Цикл обучения разбит на 3 этапа: изучение нового, повторение и экзамен. Изученое без практики и пополнения убывают с каждым днем. Запомните: повторение - мать учения.',
        ukr: 'Ви можете вибрати потрібний Вам курс в розділі курси. Є різні типи на речення і на слова. Цикл навчання розбитий на 3 етапи: вивчення нового, повторення, і іспит. Вивчення без практики і поповнення зменшуються з кожним днем. Запам\'ятайте: повторення - мати навчання.',
        pol: 'Możesz wybrać odpowiedni kurs w sekcji kursy. Istnieją różne typy, zarówno na zdania, jak i na słowa. Cykl nauki jest podzielony na 3 etapy: nauka nowego, powtórka i egzamin. To, co zostało nauczone bez praktyki i uzupełnień, zmniejsza się z każdym dniem. Pamiętaj: powtórzenie to matka nauki.',
        eng: 'You can choose the course you need in the courses section. There are different types for sentences and words. The learning cycle is divided into 3 stages: learning new material, repetition, and examination. Learning without practice and replenishment diminishes every day. Remember: repetition is the mother of learning.'
    },
    thirdBlock: {
        ru: 'Тренажеры для видео',
        ukr: 'Тренажери для відео',
        pol: 'Trenerzy do wideo',
        eng: 'Video trainers'
    },
    thirdText: {
        ru: 'Изучение с помощю видео делает процесс более быстрым и интересным. Таким образом обучение идет как бы в естественной обстановке в реальных ситуатциях. Вы слышите речь носителей языка. Самые разнообразные трейлеры, мультфильмы, клипы - все в этом разделе.',
        ukr: 'Вивчення за допомогою відео робить процес більш швидким і цікавим. Таким чином навчання йде як би в природному середовищі в реальних сітуатціях. Ви чуєте голоси носіїв мови. Найрізноманітніші трейлери, мультфільми, кліпи - все в цьому розділі.',
        pol: 'Nauka przy użyciu wideo sprawia, że proces staje się bardziej szybki i interesujący. W ten sposób nauka przebiega jakby w naturalnym środowisku, w realnych sytuacjach. Słyszysz mowę native speakerów. Najróżniejsze zwiastuny, filmy animowane, teledyski - wszystko to znajdziesz w tej sekcji.',
        eng: 'Learning with video makes the process faster and more interesting. This way, learning takes place in a natural environment in real situations. You hear the speech of native speakers. Various trailers, cartoons, music videos - all in this section.'
    },
    fourthBlock: {
        ru: 'Изучение с помощью музыки',
        ukr: 'Навчання за допомогою музики',
        pol: 'Nauka za pomocą muzyki',
        eng: 'Learning with music'
    },
    fourthText: {
        ru: 'Вы обучаетесь и развлекаетесь одновременно. Вы развиваете навык восприятия английского языка на слух. Вы учите разговорные формы слов, фразовые глаголы и сленг.',
        ukr: 'Ви навчаєтеся і розважаєтесь одночасно. Ви розвиваєте навик сприйняття англійської мови на слух. Ви вчите розмовні форми слів, фразові дієслова і сленг.',
        pol: 'Nauka i zabawa jednocześnie. Rozwijasz umiejętność percepcji języka angielskiego słuchem. Uczysz się konwersacyjnych form słów, czasowników frazowych i slang.',
        eng: 'You learn and entertain yourself at the same time. You develop the skill of understanding English by ear. You learn conversational forms of words, phrasal verbs, and slang.'
    },
};

export default class HomePage extends Component {
    static propTypes = {
        store: PropTypes.shape({})
    };

    render(){
        const { siteLang, secondColor, fontColor } = this.props.store;
        const fontStyle = {color: fontColor};
        const cardStyle = {background: secondColor};
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
                            <div className="block block-left" style={{...cardStyle,...fontStyle}}>
                                <p className="block-head">
                                    {firstBlock}
                                </p>
                                <div className="block-img">
                                    <img src={require("../../images/home-page/movie12.png")} alt="" className="block-img"/>
                                </div>
                                <p className="block-text">
                                    {firstText}
                                </p>
                            </div>
                        </Col>
                        <Col sm={4}>
                            <div className="block block-right small-blocks" style={{...cardStyle,...fontStyle}}>
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
                            <div className="block block-left small-blocks" style={{...cardStyle,...fontStyle}}>
                                <p className="block-head">
                                    {thirdBlock}
                                </p>
                                <p className="block-text small-block">
                                    {thirdText}
                                </p>
                            </div>
                        </Col>
                        <Col sm={8}>
                            <div className="block block-right" style={{...cardStyle,...fontStyle}}>
                                <p className="block-head">
                                    {fourthBlock}
                                </p>
                                <div className="block-img">
                                    <img src={require("../../images/home-page/music.png")} alt="" className="block-img"/>
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

import React, {Component, Fragment} from 'react';
import get from 'lodash/get';
import map from 'lodash/map';
import filter from 'lodash/filter';
import findIndex from 'lodash/findIndex';
import {Badge, Button, Col, Container, Form, ProgressBar, Row} from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl';

import '../../scc/learning.css';

import videoItems from '../../dict/videoItems';
import videoNames from '../../dict/videoNames';
import {playVideo} from '../video-page/video-item';
import courseItems from '../../dict/courseItems';
import courseUnits from '../../dict/courseUnits';

const content = {
    new: {
        ru: "Поехали",
        ukr: "Поїхали",
    },
    eng: {
        ru: "Озвучивать английскую",
        ukr: "Озвучувати англійську",
    },
    pol: {
        ru: "Озвучивать польску",
        ukr: "Озвучувати польську",
    },
    countRepeat: {
        ru: "Фраз слов повторять",
        ukr: "Фраз слів повторювати",
    },
    repeatAll: {
        ru: "Повторять всё",
        ukr: "Повторювати все",
    },
    video: {
        ru: "Видео",
        ukr: "Відео",
    },
    source: {
        ru: "Источник",
        ukr: "Джерело",
    },
};

export default class Learning extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exampleLearning: null,
            cycleLearning: null,
            showTranslation: true,
            learnNumber: 0,
            english: '',
            polish: '',
            translation: '',
            newCount: this.newCount,
            newCountFrom: this.newCountFrom,
            newLearnNumber: +localStorage.newLearnNumber || 5,
            entity: null,
            start: null,
            end: null,
            fileName: '',
            learnEng: true,
            learnPol: true,
            isRepeatAll: false
        };
        this.englishArr = [];
        this.learnArr = [];
        this.timeoutClearState = null;
        this.timeoutNextItem = null;
        this.timeoutResetExampleLearning = null;
    }

    componentDidMount() {
        keyListener.call(this);
        this.getVoices();
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutClearState);
        clearTimeout(this.timeoutNextItem);
        clearTimeout(this.timeoutResetExampleLearning);
    }

    getVoices() {
        window.speechSynthesis.onvoiceschanged = () => {
            const voices = window.speechSynthesis.getVoices();
            this.filteredEngVoices = filter(voices, voice => {
                    return voice.lang.substr(0, 2) === "en"
                }
            );
            this.filteredPolVoices = filter(voices, voice => {
                    return voice.lang.substr(0, 2) === "pl"
                }
            );
        };
    }

    resetExampleLearning = () => {
        this.setState({exampleLearning: null})
    };

    speakTxt = () => {
        speak.call(this);
    };

    newLearn = () => {
        this.getLearnArray(this.state.newLearnNumber);
        if (!this.learnArr) return;
        this.setEngAndTransl(this.state.learnNumber);
        this.setState({cycleLearning: 'new', exampleLearning: 'phase_5'});
        this.nextItem();
    };

    getLearnArray = (sliceNumber) => {
        const localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : null;
        this.learnArr = localProgress ? localProgress.slice(0, sliceNumber) : null;

        if (!this.learnArr) {
            const videoItemsKeyArr = Object.keys(videoItems);
            const videoItemsLength = videoItemsKeyArr.length;
            let learnArr = [];
            let i = sliceNumber;
            while (i) {
                const randomNumber = Math.floor(Math.random() * videoItemsLength);
                const videoItemId = videoItemsKeyArr[randomNumber];
                learnArr.push({
                    entity: 'video',
                    entity_id: videoItems[videoItemId].id
                });
                i--;
            }
            this.learnArr = learnArr.length ? learnArr.slice(0, sliceNumber) : null;
        }

        map(this.learnArr, (item, key) => {
            if (item.entity === 'video') {
                this.learnArr[key].eng = get(videoItems, `[${item.entity_id}].eng`);
                this.learnArr[key].transl = get(videoItems, `[${item.entity_id}].transl`);
                this.learnArr[key].courseId = get(videoItems, `[${item.entity_id}].idVideoName`);
                const courseIndex = findIndex(videoNames, {'id': this.learnArr[key].courseId});
                this.learnArr[key].topicName = get(videoNames, `[${courseIndex}].songName`);
            }

            if (item.entity === 'course') {
                const index = findIndex(courseItems, {'id': item.entity_id});
                this.learnArr[key].eng = get(courseItems, `[${index}].eng`);
                this.learnArr[key].pol = get(courseItems, `[${index}].pol`);
                this.learnArr[key].transl = get(courseItems, `[${index}].transl`);
                this.learnArr[key].courseId = get(courseItems, `[${index}].unitId`);
                const courseIndex = findIndex(courseUnits, {'id': this.learnArr[key].courseId});
                this.learnArr[key].topicName = get(courseUnits, `[${courseIndex}].name`);
            }
        })
    };

    nextItem = () => {
        if (this.state.learnNumber < this.learnArr.length - 1) {
            clearTimeout(this.timeoutNextItem);
            this.timeoutNextItem = setTimeout(() => {
                const nextNumber = this.state.learnNumber + 1;
                this.setEngAndTransl(nextNumber);
                this.nextItem();
            }, 15000);
        } else {
            clearTimeout(this.timeoutNextItem);
            this.timeoutNextItem = setTimeout(() => {
                this.setEngAndTransl(0, 'phase_1');
            }, 15000);
        }
    };

    setEngAndTransl = (learnNumber, changedState) => {
        const entity = get(this.learnArr, `${learnNumber}.entity`);
        const entityId = get(this.learnArr, `${learnNumber}.entity_id`);
        const courseId = get(this.learnArr, `${learnNumber}.courseId`);
        let english = get(this.learnArr, `${learnNumber}.eng`, '');
        english = english.replace(/^\s*/, '').replace(/\s*$/, '').replace(/\s+/g, ' ').trim();
        let polish = get(this.learnArr, `${learnNumber}.pol`, '');
        polish = polish.replace(/^\s*/, '').replace(/\s*$/, '').replace(/\s+/g, ' ').trim();
        const translation = get(this.learnArr, `${learnNumber}.transl`);
        const start = get(videoItems, `[${entityId}].start`);
        const end = get(videoItems, `[${entityId}].end`);

        const index = findIndex(videoNames, {'id': courseId});
        const fileName = get(videoNames, `[${index}].fileName`);
        this.setState({
            english, polish, translation, entity, start, end, fileName, learnNumber,
            exampleLearning: changedState || this.state.exampleLearning
        })
    };

    changeNewLearnNumber = (e) => {
        const val = e.target.value;
        console.log(val);
        // if (!(+val) || val !== "") return e.target.value = this.state.newLearnNumber;
        localStorage.newLearnNumber = val || 0;
        this.setState({newLearnNumber: +val || 0});
    };

    changeEngCheck = () =>{
        this.setState({learnEng: !this.state.learnEng});
    }

    changePolCheck = () =>{
        this.setState({learnPol: !this.state.learnPol});
    }

    repeatAll = () =>{
        const { isRepeatAll } = this.state;
        if (!isRepeatAll) {
            const localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : null;
            if (localProgress && localProgress.length){
                localStorage.newLearnNumber = localProgress.length;
                this.setState({newLearnNumber: localProgress.length, isRepeatAll: true});
            }
        } else {
            this.setState({isRepeatAll: false});
        }
    }

    renderVideo() {
        const {fileName, start, end} = this.state;
        const autoPlay = checkIsSound.call(this);

        if (
            !fileName || !start || !end
        ) return;
        const src = `../../video/${fileName}#t=${start},${end}`;
        return (
            <video
                className="video-hide"
                id='player'
                src={src}
                autoPlay={autoPlay}
            />
        )
    }

    getTopic = () => {
        const {siteLang} = this.props.store;
        const {learnNumber} = this.state;
        const source = get(content, `source[${siteLang}]`);
        const topicTxt = get(this.learnArr, `[${learnNumber}].topicName`, '');
        const topic = (
            <h5>
                <Badge variant="light" bsPrefix='source'>
                    {source}: {topicTxt}
                </Badge>
            </h5>
        );
        return topic;
    };

    render() {
        const {
            newLearnNumber,
            exampleLearning, cycleLearning,
            english, polish, translation,
            learnEng, learnPol, isRepeatAll
        } = this.state;
        const {siteLang} = this.props.store;
        const newLearn = get(content, `new[${siteLang}]`);
        const eng = get(content, `eng[${siteLang}]`);
        const pol = get(content, `pol[${siteLang}]`);
        const countRepeat = get(content, `countRepeat[${siteLang}]`);
        const repeatAll = get(content, `repeatAll[${siteLang}]`);

        const isSound = checkIsSound.call(this);
        if (isSound) speak.call(this);

        return (
            <Container className='new-container'>
                {this.renderVideo()}
                {!exampleLearning && !cycleLearning &&
                <Fragment>
                    <Row>
                        <Col>
                            <Form.Group controlId="learnEng">
                                <Form.Check type="checkbox" label={eng} checked={learnEng} onChange={this.changeEngCheck}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="learnPol">
                                <Form.Check type="checkbox" label={pol} checked={learnPol} onChange={this.changePolCheck}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="info" block onClick={this.newLearn}>
                                {newLearn}
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <span children={countRepeat} />
                            <FormControl
                                type="number"
                                value={newLearnNumber}
                                onChange={this.changeNewLearnNumber}
                            />
                        </Col>
                        <Col>
                            <Form.Group controlId="isRepeatAll">
                                <Form.Check type="checkbox" label={repeatAll} checked={isRepeatAll} onChange={this.repeatAll}/>
                            </Form.Group>
                        </Col>
                    </Row>
                </Fragment>
                }
                <Row className="text-center new-row">
                    {exampleLearning &&
                        <Col>
                            {this.getTopic()}
                            {soundButton.call(this)}
                            {getBadge(translation, "secondary")}
                            {getProgressBar.call(this)}
                            {getBadge(english, "light")}
                            {learnPol && getBadge(polish, "light")}
                        </Col>
                    }
                </Row>
            </Container>
        );
    }
}

export function soundButton() {
    let btn = null;
    const isSound = checkIsSound.call(this);
    if (isSound) {
        const {siteLang} = this.props.store;
        const pressButton = get(content, `pressButton[${siteLang}]`);
        btn = (
            <Button
                variant="success"
                className="title_sound"
                title={pressButton}
                onClick={this.speakTxt}
            >
                <img src={require("../../images/Sound.png")} className="title_sound" alt=''/>
            </Button>
        )
    }
    return btn
}

export function getBadge(txt, variant) {
    if (!txt) return null;

    return (
        <h3>
            <Badge variant={variant} className="white-space">{txt}</Badge>
        </h3>
    );
}

export function getProgressBar() {
    const {exampleLearning} = this.state;
    let progress = null;

    if (exampleLearning === 'phase_5' || exampleLearning === 'word_5') {
        progress = (
            <Row>
                <Col sm={3}/>
                <Col>
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
    //video
    const {english, polish, entity, end, start, learnPol} = this.state;
    if (entity === 'video' && end && start) return playVideo.call(this, start, end);
    if (entity === 'video' && (!start || !end)) return;

    //comp eng
    if (!this.filteredEngVoices || !this.filteredEngVoices.length) this.getVoices();
    const utterance = new SpeechSynthesisUtterance(english);
    const randomVoice = this.filteredEngVoices ? Math.floor(Math.random() * this.filteredEngVoices.length) : null;
    utterance.voice = randomVoice ? this.filteredEngVoices[randomVoice] : null;
    if (!utterance.voice) utterance.lang = 'en';
    speechSynthesis.speak(utterance);

    //comp pol
    if (polish && learnPol){
        if (!this.filteredPolVoices || !this.filteredPolVoices.length) this.getVoices();
        const utterance = new SpeechSynthesisUtterance(polish);
        utterance.voice = get(this.filteredPolVoices, '[0]');
        if (!utterance.voice) utterance.lang = 'en';
        speechSynthesis.speak(utterance);
    }
}

export function checkIsSound() {
    const {exampleLearning} = this.state;
    if (
        exampleLearning === 'word_5' || exampleLearning === 'phase_5'
    ) {
        return true;
    }

    return false;
}

export function keyListener() {
    document.addEventListener('keydown', (event) => {
        const exampleLearningState = this.state.exampleLearning;
        const keyCode = event.keyCode;

        if (keyCode === 32) this.speakTxt();
        if (keyCode === 49 && !exampleLearningState && get(document, 'activeElement.tagName') !== 'INPUT') this.newLearn();

    });
}

import React, {Component, Fragment} from 'react';
import get from 'lodash/get';
import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
import {Col, Container, Row, Form, Button, FormControl, DropdownButton, Dropdown, Badge} from "react-bootstrap";

import '../../scc/video.css';
import {
    changedInput, focusInput,
    getBadgeTranslation,
    getInput,
    getProgressBar,
    getWordsArr, rightClicked,
    soundButton,
    wordClicked, clearTranslation
} from "../learning-page/learning";

const content = {
    hideTranslate: {
        ru: "Скрыть перевод",
        ukr: "Скрити переклад",
    },
    firstPhrase: {
        ru: "Составить по словам",
        ukr: "Скласти по словам",
    },
    thirdPhrase: {
        ru: "Написать первые буквы",
        ukr: "Написати перші літери",
    },
    fifthPhrase: {
        ru: "Повторить по озвученному",
        ukr: "Повторити по озвученому",
    },
    train: {
        ru: "Тренировать",
        ukr: "Тренувати",
    },
    select: {
        ru: "Отобрать для изучения",
        ukr: "Відібрати для вивчення",
    },
};

// [{"id":"6","idVideoName":1,"start":"7","end":"10.5","eng":"I see trees of green","transl":"Я вижу зеленые деревья"},{"id":"17","idVideoName":1,"start":"12.5","end":"15","eng":"red roses too","transl":"красные розы"},{"id":"18","idVideoName":1,"start":"15.5","end":"22","eng":"I see them bloom for me and you","transl":"Я вижу, как они цветут для нас"},{"id":"19","idVideoName":1,"start":"22","end":"25","eng":"And I think to myself","transl":"И я думаю про себя"},{"id":"20","idVideoName":1,"start":"27","end":"33.5","eng":"what a wonderful world","transl":"как же всё-таки чудесен мир"},{"id":"21","idVideoName":1,"start":"36","end":"39","eng":"I see skies of blue","transl":"Я вижу голубое небо"}]

export default class VideoItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            start: 0,
            end: null,
            autoPlay: false,
            videoItems: localStorage.video ? JSON.parse(localStorage.video) : {},
            showItems: true,
            exampleLearning: 'phase_1',
            currentItem: 0
        };
        this.englishArr = [];
        this.english = '';
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.exampleLearning === 'phase_3') focusInput();
    }

    play = (e) => {
        const rowData = this.getRowData(e) || {};
        this.playVideo(rowData.start, +rowData.end);
    };

    save = (e) => {
        const rowData = this.getRowData(e) || {};
        const {id, start, end, eng, transl} = rowData;
        if (!start || !end || !eng || !transl) return alert('fill in all data');
        const newRow = {id, idVideoName: 1, start, end, eng, transl};
        const {videoItems} = this.state;
        const newId = videoItems.length ?
            +videoItems[videoItems.length - 1].id + 1 :
            1;
        const index = findIndex(videoItems, {'id': id});
        let newVideoItems = null;
        if (index > -1) {
            newVideoItems = videoItems;
            newVideoItems[index] = newRow;
        } else {
            newVideoItems = [...videoItems, {id: id || String(newId), idVideoName: 1, start, end, eng, transl}];
        }
        this.setState({videoItems: newVideoItems});
        localStorage.video = JSON.stringify(newVideoItems);
        if (index === -1) this.clearRow(e);
    };

    delete = (e) => {
        const rowData = this.getRowData(e) || {};
        const {id} = rowData;
        const {videoItems} = this.state;
        let index = findIndex(videoItems, {'id': +id});
        if (index === -1) index = findIndex(videoItems, {'id': id});
        let newVideoItems = null;
        if (index > -1) {
            newVideoItems = videoItems;
            newVideoItems.splice(index, 1);
            this.setState({videoItems: newVideoItems});
            localStorage.video = JSON.stringify(newVideoItems);
        }
    };

    getRowData = (e) => {
        const rowElem = this.getRowElem(e);
        const {eId, eStart, eEnd, eEng, eTransl} = rowElem;
        const id = eId ? eId.value : null;
        const start = eStart ? eStart.value : null;
        const end = eEnd ? eEnd.value : null;
        const eng = eEng ? eEng.value : null;
        const transl = eTransl ? eTransl.value : null;
        return {id, start, end, eng, transl};
    };

    clearRow = (e) => {
        const rowElem = this.getRowElem(e);
        const {eStart, eEnd, eEng, eTransl} = rowElem;
        eStart.value = null;
        eEnd.value = null;
        eEng.value = null;
        eTransl.value = null;
    };

    getRowElem(e) {
        const elem = e.currentTarget;
        const row = elem.getAttribute('row');
        const eId = document.getElementById(`row${row}_id`);
        const eStart = document.getElementById(`row${row}_start`);
        const eEnd = document.getElementById(`row${row}_end`);
        const eEng = document.getElementById(`row${row}_eng`);
        const eTransl = document.getElementById(`row${row}_transl`);
        return {eId, eStart, eEnd, eEng, eTransl};
    }

    train = () => {
        this.setState({showItems: false});
        const {videoItems, exampleLearning} = this.state;
        this.playVideo(videoItems[0].start, +videoItems[0].end);
        if (exampleLearning === 'phase_5') {
            this.nextVideo();
        }
    };

    nextVideo = () => {
        const {currentItem, videoItems} = this.state;
        const videoLength = videoItems.length;

        if (currentItem < videoLength - 1) {
            setTimeout(() => {
                this.setState({currentItem: currentItem + 1});
                this.playVideo(get(videoItems, `[${currentItem + 1}].start`), get(videoItems, `[${currentItem + 1}].end`));
                const progressBar = document.getElementById('progressBar');
                this.nextVideo();
            }, 7000);
        } else {
            setTimeout(() => {
                this.setState({showItems: true, currentItem: 0});
            }, 7000);
        }
    };

    speakTxt = () => {
        const {videoItems, currentItem} = this.state;
        this.playVideo(get(videoItems, `[${currentItem}].start`), get(videoItems, `[${currentItem}].end`));
        focusInput();
    };

    playVideo(start, end) {
        if (end === this.state.end) {
            this.setState({start, end: +end + 0.1, autoPlay: true});
        } else {
            this.setState({start, end, autoPlay: true});
        }
        const video = document.getElementById('player');
        video.play();
    }

    wordClick = (e) => {
        wordClicked.call(this, e);
    };

    rightClick = (rightTxt) => {
        rightClicked.call(this, rightTxt);
        if (this.englishArr.length === 0) {
            const {videoItems, currentItem} = this.state;
            const videoLength = videoItems.length;
            if (currentItem < videoLength - 1) {
                this.setState({currentItem: currentItem + 1});
                this.playVideo(get(videoItems, `[${currentItem + 1}].start`), get(videoItems, `[${currentItem + 1}].end`));
                clearTranslation();
            } else {
                this.setState({showItems: true, currentItem: 0});
            }

        }
    };


    onChangeInput = () => {
        changedInput.call(this);
    };

    changeLearningType = (e) => {
        const elem = e.currentTarget;
        const type = elem.getAttribute('type');
        clearTranslation();
        this.setState({exampleLearning: type});
    };

    render() {
        const {siteLang} = this.props.store;
        const {start, end, autoPlay, videoItems, showItems, exampleLearning, currentItem} = this.state;
        const hideTranslate = get(content, `hideTranslate[${siteLang}]`);
        const firstPhrase = get(content, `firstPhrase[${siteLang}]`);
        const thirdPhrase = get(content, `thirdPhrase[${siteLang}]`);
        const fifthPhrase = get(content, `fifthPhrase[${siteLang}]`);
        const select = get(content, `select[${siteLang}]`);
        const train = get(content, `train[${siteLang}]`);
        const src = "video/videoplayback.mp4#t=" + start + ',' + end;
        const learningType = [
            {type: 'phase_1', txt: firstPhrase},
            {type: 'phase_3', txt: thirdPhrase},
            {type: 'phase_5', txt: fifthPhrase}
        ];
        const index = findIndex(learningType, {'type': exampleLearning});

        const translation = get(videoItems, `[${currentItem}].transl`);
        this.english = get(videoItems, `[${currentItem}].eng`);

        return (
            <Container>
                <Row>
                    <h1 style={{margin: '0 auto'}}>SONG NAME</h1>
                </Row>
                <Row>
                    <Col sm={2}/>
                    <Col>
                        <div className="border_video">
                            <video
                                className="video-item"
                                id='player'
                                src={src}
                                autoPlay={autoPlay}
                                controls
                            >
                                К сожалению, ваш браузер не поддерживает HTML5 Video.
                            </video>
                        </div>
                    </Col>
                    <Col sm={2}/>
                </Row>
                <Row>
                    <Col sm={1}/>
                    <Col sm={2}>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label={hideTranslate}/>
                        </Form.Group>
                    </Col>
                    <Col sm="6">
                        <Button variant="dark" block>{select}</Button>
                        <Button
                            variant="info"
                            block
                            onClick={this.train}
                        >
                            {train}
                        </Button>
                    </Col>
                    <Col sm={2}>
                        <DropdownButton title={get(learningType, `[${index}].txt`) || ''}>
                            {map(learningType, (it, key) => {
                                return (
                                    <Dropdown.Item
                                        key={key}
                                        type={it.type}
                                        onClick={this.changeLearningType}
                                    >
                                        {it.txt}
                                    </Dropdown.Item>
                                )
                            })}
                        </DropdownButton>
                    </Col>
                    <Col sm={1}/>
                </Row>
                {showItems &&
                <Fragment>
                    <Row>
                        <Col md="auto" className='video-item-col a-col' children={'№'}/>
                        <Col md="auto" className='video-item-col b-col' children={'id'}/>
                        <Col md="auto" className='video-item-col b-col' children={'start'}/>
                        <Col md="auto" className='video-item-col b-col' children={'end'}/>
                        <Col children={"Eng"}/>
                        <Col children={siteLang}/>
                        <Col md="auto" className='video-item-col c-col'/>
                        <Col md="auto" className='video-item-col c-col'/>
                        <Col md="auto" className='video-item-col c-col'/>
                    </Row>
                    {map(videoItems, (item, key) => {
                        const odd = key & 1 ? 'odd' : null;

                        return (
                            <Row key={item.id} className={odd}>
                                <Col md="auto" className='video-item-col a-col'>
                                    <span>{key + 1}</span>
                                </Col>
                                <Col md="auto" className='video-item-col b-col'>
                                    <FormControl type="text" defaultValue={item.id} disabled id={`row${key + 1}_id`}/>
                                </Col>
                                <Col md="auto" className='video-item-col b-col'>
                                    <FormControl type="text" defaultValue={item.start} id={`row${key + 1}_start`}/>
                                </Col>
                                <Col md="auto" className='video-item-col b-col'>
                                    <FormControl type="text" defaultValue={item.end} id={`row${key + 1}_end`}/>
                                </Col>
                                <Col className='video-item-col'>
                                    <FormControl type="text" defaultValue={item.eng} id={`row${key + 1}_eng`}/>
                                </Col>
                                <Col className='video-item-col'>
                                    <FormControl type="text" defaultValue={item.transl} id={`row${key + 1}_transl`}/>
                                </Col>
                                <Col md="auto" className='video-item-col c-col'>
                                    <Button
                                        row={key + 1}
                                        variant="info"
                                        onClick={this.play}
                                    >
                                        Sound
                                    </Button>
                                </Col>
                                <Col md="auto" className='video-item-col c-col'>
                                    <Button
                                        row={key + 1}
                                        variant="success"
                                        onClick={this.save}
                                        block
                                    >
                                        Save
                                    </Button>
                                </Col>
                                <Col md="auto" className='video-item-col c-col'>
                                    <Button
                                        row={key + 1}
                                        variant="dark"
                                        onClick={this.delete}
                                        block
                                    >
                                        Delete
                                    </Button>
                                </Col>
                            </Row>
                        )
                    })}
                    <Row className='bottom-row'>
                        <Col md="auto" className='video-item-col a-col'/>
                        <Col md="auto" className='video-item-col b-col'>
                            <FormControl type="text" disabled id='row_new_id'/>
                        </Col>
                        <Col md="auto" className='video-item-col b-col'>
                            <FormControl type="text" id='row_new_start'/>
                        </Col>
                        <Col md="auto" className='video-item-col b-col'>
                            <FormControl type="text" id='row_new_end'/>
                        </Col>
                        <Col className='video-item-col'>
                            <FormControl type="text" id='row_new_eng'/>
                        </Col>
                        <Col className='video-item-col'>
                            <FormControl type="text" id='row_new_transl'/>
                        </Col>
                        <Col md="auto" className='video-item-col c-col'>
                            <Button
                                row={"_new"}
                                variant="info"
                                onClick={this.play}
                            >
                                Sound
                            </Button>
                        </Col>
                        <Col md="auto" className='video-item-col c-col'>
                            <Button
                                row={"_new"}
                                variant="success"
                                onClick={this.save}
                                block
                            >
                                Save
                            </Button>
                        </Col>
                        <Col md="auto" className='video-item-col c-col'/>
                    </Row>
                </Fragment>
                }

                {!showItems &&
                <Row className="text-center">
                    <Col>
                        <br/>
                        {getBadgeTranslation.call(this, translation)}
                        {soundButton.call(this)}
                        <h2 className='translation'><Badge variant="light" id='translation'></Badge></h2>
                        {getInput.call(this)}
                        {getWordsArr.call(this)}
                        {getProgressBar.call(this)}
                        {console.log(this)}
                    </Col>
                </Row>
                }
            </Container>
        );
    }
};
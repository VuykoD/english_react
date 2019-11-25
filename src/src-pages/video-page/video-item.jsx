import React, {Component, Fragment} from 'react';
import get from 'lodash/get';
import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
import filter from 'lodash/filter';
import {Col, Container, Row, Form, Button, FormControl, DropdownButton, Dropdown, Badge} from "react-bootstrap";

import '../../scc/video.css';
import {
    changedInput, focusInput,
    getBadgeTranslation,
    getInput,
    getProgressBar, getBadge,
    getWordsArr, rightClicked,
    soundButton,
    wordClicked, clearTranslation
} from "../learning-page/learning";
import videoItems from '../../dict/videoItems';
import videoNames from '../../dict/videoNames';

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
    alreadySelected: {
        ru: "Уже отобрано для изучения",
        ukr: "Вже відібрано для вивчення",
    },
};

export default class VideoItem extends Component {
    constructor(props) {
        super(props);

        const url = get(props, `match.url`);
        this.videoIndex = findIndex(videoNames, {'url': url});
        this.videoId = get(videoNames, `[${this.videoIndex}].id`);
        const localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : null;
        const isVideoSelected = findIndex(localProgress, {'videoId': this.videoId}) > -1;

        const localItems = localStorage.video ? JSON.parse(localStorage.video) : {};

        this.items = filter({...videoItems, ...localItems}, item => {
                return +item.idVideoName === +this.videoId;
            }
        );

        // this.items = sortBy(filteredArr, ['start']);

        const translation = get(this.items, `[0].transl`);
        const english = get(this.items, `[0].eng`);

        this.state = {
            start: 0,
            end: null,
            autoPlay: false,
            videoItems: this.items,
            showItems: true,
            exampleLearning: 'phase_1',
            currentItem: 0,
            showTranslation: true,
            isVideoSelected,
            english,
            translation
        };
        this.englishArr = [];
        this.timeoutPauseVideo = null;
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
        const newRow = {id, idVideoName: this.videoId, start, end, eng, transl};
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
            newVideoItems = [...videoItems, {
                id: id || String(newId),
                idVideoName: this.videoId,
                start,
                end,
                eng,
                transl
            }];
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
        if (!videoItems.length) return;
        this.playVideo(videoItems[0].start, +videoItems[0].end);
        if (exampleLearning === 'phase_5') {
            this.nextVideo();
        }
    };

    select = () => {
        if (this.state.isVideoSelected) {
            const {siteLang} = this.props.store;
            const alreadySelected = get(content, `alreadySelected[${siteLang}]`);
            return alert(alreadySelected);
        }
        const localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : null;
        const d = new Date();
        const dd = d.getDate();
        const mm = d.getMonth() + 1;
        const yyyy = d.getFullYear();


        const addedProgress = map(this.items, item => {
            return (
                {
                    entity: 'video',
                    entity_id: item.id,
                    videoId: this.videoId,
                    quantity: 0,
                    date: `${dd}.${mm}.${yyyy}`
                }
            )
        });
        const newProgress = localProgress ?
            [...localProgress, ...addedProgress] :
            [...addedProgress];
        this.setState({isVideoSelected: true});
        localStorage.progress = JSON.stringify(newProgress);
    };

    nextVideo = () => {
        const {currentItem, videoItems} = this.state;
        const videoLength = videoItems.length;

        if (currentItem < videoLength - 1) {
            setTimeout(() => {
                this.setState({currentItem: currentItem + 1});
                this.playVideo(get(videoItems, `[${currentItem + 1}].start`), get(videoItems, `[${currentItem + 1}].end`));
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
        if (!(+start) || !(+end)) return alert('start or end is not a number');
        const difference = +end - start;
        const video = document.getElementById('player');
        clearTimeout(this.timeoutPauseVideo);
        if (!video) return;

        video.currentTime = parseFloat(start);
        video.play();
        this.timeoutPauseVideo = setTimeout(() => video.pause(), difference * 1000);
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

                const translation = get(videoItems, `[${currentItem +1}].transl`);
                const english = get(videoItems, `[${currentItem + 1}].eng`);

                this.setState({currentItem: currentItem + 1, english, translation});
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

    hideTranslation = () => {
        this.setState({showTranslation: !this.state.showTranslation})
    };

    render() {
        const {siteLang} = this.props.store;
        const {start, end, autoPlay, videoItems, showItems, exampleLearning,  isVideoSelected} = this.state;

        if (this.videoIndex === -1) return null;
        const fileName = get(videoNames, `[${this.videoIndex}].fileName`);
        const songName = get(videoNames, `[${this.videoIndex}].songName`);
        const src = `video/${fileName}#t=${start},${end}`;
        const hideTranslate = get(content, `hideTranslate[${siteLang}]`);
        const firstPhrase = get(content, `firstPhrase[${siteLang}]`);
        const thirdPhrase = get(content, `thirdPhrase[${siteLang}]`);
        const fifthPhrase = get(content, `fifthPhrase[${siteLang}]`);
        const select = get(content, `select[${siteLang}]`);
        const alreadySelected = get(content, `alreadySelected[${siteLang}]`);
        const train = get(content, `train[${siteLang}]`);
        const learningType = [
            {type: 'phase_1', txt: firstPhrase},
            {type: 'phase_3', txt: thirdPhrase},
            {type: 'phase_5', txt: fifthPhrase}
        ];
        const index = findIndex(learningType, {'type': exampleLearning});

        return (
            <Container>
                <Row className="text-center">
                    <Col>
                        <h1>{songName}</h1>
                    </Col>
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
                            <Form.Check
                                type="checkbox"
                                label={hideTranslate}
                                onClick={this.hideTranslation}
                            />
                        </Form.Group>
                    </Col>
                    <Col sm="6">
                        <Button
                            variant={isVideoSelected? "success":"dark"}
                            block
                            onClick={this.select}
                        >
                            {isVideoSelected ? alreadySelected : select}
                        </Button>
                        {showItems &&
                        <Button
                            variant="info"
                            block
                            onClick={this.train}
                        >
                            {train}
                        </Button>
                        }
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
                        <Col md="auto" className='video-item-col d-col' children={'id'}/>
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
                                <Col md="auto" className='video-item-col d-col'>
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
                        <Col md="auto" className='video-item-col d-col'>
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
                        {getBadgeTranslation.call(this)}
                        {soundButton.call(this)}
                        <h2 className='translation'><Badge variant="light" id='translation'/></h2>
                        {getInput.call(this)}
                        {getWordsArr.call(this)}
                        {getProgressBar.call(this)}
                        {getBadge.call(this)}
                    </Col>
                </Row>
                }
            </Container>
        );
    }
}
;
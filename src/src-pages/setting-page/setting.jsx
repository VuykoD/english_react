import React, {Component} from 'react';
import PropTypes from "prop-types";
import get from "lodash/get";
import {Col, Container, Row} from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import '../../scc/settings.css';

const content = {
    fontColor:{
        ru:'Цвет шрифта',
        ukr:'Колір шрифту'
    },
    colorPlaceHolder:{
        ru:'Напишите цвет',
        ukr:'Напишіть колір'
    },
};

export default class Setting extends Component {
    static propTypes = {
        store: PropTypes.shape({}),
        onChangeFontColor: PropTypes.func,
        onChangeBackColor: PropTypes.func,
    };

    changeFontColor=()=>{
        const el = document.getElementById('fontColor');
        localStorage.fontColor = el.value;
        this.props.onChangeFontColor(el.value);
    };

    changeBackColor=()=>{
        const el = document.getElementById('backColor');
        localStorage.backColor = el.value;
        this.props.onChangeBackColor(el.value);
    };

    render(){
    const { siteLang, fontColor, backColor } = this.props.store;
    const fontColorTxt = get(content, `fontColor[${siteLang}]`);
    const colorPlaceHolder = get(content, `colorPlaceHolder[${siteLang}]`);

    return (
        <Container>
            <Row>
                <Col>
                    <InputGroup className="mb-3 setting-input">
                        <InputGroup.Text>{fontColorTxt}</InputGroup.Text>
                        <FormControl
                            id='fontColor'
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={this.changeFontColor}
                            placeholder={colorPlaceHolder}
                            value={fontColor}
                        />
                    </InputGroup>
                    <div className='color' style={{backgroundColor: fontColor}}/>
                </Col>
                <Col>
                    <InputGroup className="mb-3 setting-input">
                        <InputGroup.Text>Первый цвет</InputGroup.Text>
                        <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder={colorPlaceHolder}
                        />
                    </InputGroup>
                    <div className='color' />
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputGroup className="mb-3 setting-input">
                        <InputGroup.Text>Второй цвет</InputGroup.Text>
                        <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder={colorPlaceHolder}
                        />
                    </InputGroup>
                    <div className='color' />
                </Col>
                <Col>
                    <InputGroup className="mb-3 setting-input">
                        <InputGroup.Text>Цвет фона</InputGroup.Text>
                        <FormControl
                            id='backColor'
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={this.changeBackColor}
                            placeholder={colorPlaceHolder}
                            value={backColor}
                        />
                    </InputGroup>
                    <div className='color' style={{backgroundColor: backColor}}/>
                </Col>
            </Row>
            <Row>
                <Col md="auto">
                    <div className='bottom-reset' >
                        <Button variant="dark">Востановить</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
  }
};
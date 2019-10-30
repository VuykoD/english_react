import React, {Component} from 'react';
import PropTypes from "prop-types";
import get from "lodash/get";
import {Col, Container, Row} from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import {defaultColor} from '../../../index';


import '../../../scc/settings.css';

const content = {
    fontColor:{
        ru:'Цвет шрифта',
        ukr:'Колір шрифту'
    },
    colorPlaceHolder:{
        ru:'Напишите цвет',
        ukr:'Напишіть колір'
    },
    firstColor:{
        ru:'Первый цвет',
        ukr:'Перший колір'
    },
    secondColor:{
        ru:'Второй цвет',
        ukr:'Другий колір'
    },
    backColor:{
        ru:'Цвет фона',
        ukr:'Колір фону'
    },
    recover:{
        ru:'Востановить',
        ukr:'Відновити'
    },
};

export default class Setting extends Component {
    static propTypes = {
        store: PropTypes.shape({}),
        onChangeFontColor: PropTypes.func,
        onChangeBackColor: PropTypes.func,
        onChangeFirstColor: PropTypes.func,
        onChangeSecondColor: PropTypes.func,
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

    changeFirstColor=()=>{
        const el = document.getElementById('firstColor');
        localStorage.firstColor = el.value;
        this.props.onChangeFirstColor(el.value);
    };

    changeSecondColor=()=>{
        const el = document.getElementById('secondColor');
        localStorage.secondColor = el.value;
        this.props.onChangeSecondColor(el.value);
    };

    recover=()=>{
        localStorage.removeItem("fontColor");
        localStorage.removeItem("backColor");
        localStorage.removeItem("firstColor");
        localStorage.removeItem("secondColor");
        this.props.onChangeFontColor(defaultColor.fontColor);
        this.props.onChangeBackColor(defaultColor.backColor);
        this.props.onChangeFirstColor(defaultColor.firstColor);
        this.props.onChangeSecondColor(defaultColor.secondColor);
    };

    render(){
    const { siteLang, fontColor, backColor, firstColor, secondColor } = this.props.store;
    const fontColorTxt = get(content, `fontColor[${siteLang}]`);
    const firstColorTxt = get(content, `firstColor[${siteLang}]`);
    const secondColorTxt = get(content, `secondColor[${siteLang}]`);
    const backColorTxt = get(content, `backColor[${siteLang}]`);
    const colorPlaceHolder = get(content, `colorPlaceHolder[${siteLang}]`);
    const recover = get(content, `recover[${siteLang}]`);

    return (
        <Container className="container">
            <Row>
                <Col>
                    <InputGroup className="mb-3 setting-input">
                        <InputGroup.Text children={fontColorTxt} />
                        <FormControl
                            id='fontColor'
                            onChange={this.changeFontColor}
                            placeholder={colorPlaceHolder}
                            value={fontColor}
                        />
                    </InputGroup>
                    <div className='color' style={{backgroundColor: fontColor}}/>
                </Col>
                <Col>
                    <InputGroup className="mb-3 setting-input">
                        <InputGroup.Text children={firstColorTxt} />
                        <FormControl
                            id='firstColor'
                            placeholder={colorPlaceHolder}
                            onChange={this.changeFirstColor}
                            value={firstColor}
                        />
                    </InputGroup>
                    <div className='color' style={{backgroundColor: firstColor}}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputGroup className="mb-3 setting-input">
                        <InputGroup.Text children={secondColorTxt} />
                        <FormControl
                            id='secondColor'
                            onChange={this.changeSecondColor}
                            placeholder={colorPlaceHolder}
                            value={secondColor}
                        />
                    </InputGroup>
                    <div className='color' style={{backgroundColor: secondColor}}/>
                </Col>
                <Col>
                    <InputGroup className="mb-3 setting-input">
                        <InputGroup.Text children={backColorTxt} />
                        <FormControl
                            id='backColor'
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
                        <Button variant="dark" children={recover} onClick={this.recover}/>
                    </div>
                </Col>
            </Row>
        </Container>
    );
  }
};
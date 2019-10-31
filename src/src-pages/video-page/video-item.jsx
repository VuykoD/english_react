import React, {Component} from 'react';
import  get  from 'lodash/get';
import {Col, Container, Row, Form, Button, FormControl} from "react-bootstrap";

import '../../scc/video.css';

const content = {
    hideTranslate:{
        ru:"Скрыть перевод",
        ukr:"Скрити переклад",
    },
};

export default class VideoItem extends Component {
  render(){
      const {siteLang} = this.props.store;
      const hideTranslate = get(content, `hideTranslate[${siteLang}]`);

    return (
        <Container>
            <Row>
                <h1 style={{margin:'0 auto'}}>SONG NAME</h1>
            </Row>
            <Row>
                <Col>
                 <div className="border_video">
                       <iframe id="video" src="http://www.youtube.com/embed/CWzrABouyeE?wmode=transparent" className="video-item"/>
                  </div>
                </Col>
            </Row>
            <Row>
                <Col sm={1}/>
                <Col sm={2}>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label={hideTranslate} />
                    </Form.Group>
                </Col>
                <Col sm="6">
                    <Button variant="dark" block>Dark</Button>
                    <Button variant="info" block>j</Button>
                </Col>
                <Col sm={2}>
                    <Form.Control as="select">
                        <option>Choose...</option>
                        <option>...</option>
                    </Form.Control>
                </Col>
                <Col sm={1}/>
            </Row>
            <Row>
                <Col md="auto" className='video-item-col a-col' children={'№'}/>
                <Col md="auto" className='video-item-col b-col' children={'id'}/>
                <Col md="auto" className='video-item-col b-col'  children={'start'}/>
                <Col md="auto" className='video-item-col b-col'  children={'end'}/>
                <Col children={"Eng"}/>
                <Col children={siteLang}/>
                <Col md="auto" className='video-item-col c-col' />
                <Col md="auto" className='video-item-col c-col' />
                <Col md="auto" className='video-item-col c-col' />
            </Row>
            <Row>
                <Col md="auto" className='video-item-col a-col' children={'1'}/>
                <Col md="auto" className='video-item-col b-col' >
                    <FormControl type="text" defaultValue='55' disabled/>
                </Col>
                <Col md="auto" className='video-item-col b-col' >
                    <FormControl type="text" defaultValue='20'/>
                </Col>
                <Col md="auto" className='video-item-col b-col' >
                    <FormControl type="text" defaultValue='53'/>
                </Col>
                <Col className='video-item-col'>
                    <FormControl type="text"/>
                </Col>
                <Col className='video-item-col'>
                    <FormControl type="text"/>
                </Col>
                <Col md="auto" className='video-item-col c-col'>
                    <Button variant="info">Sound</Button>
                </Col>
                <Col md="auto" className='video-item-col c-col'>
                    <Button variant="success" block>Save</Button>
                </Col>
                <Col md="auto" className='video-item-col c-col'>
                    <Button variant="dark">Delete</Button>
                </Col>
            </Row>
            <Row className='odd'>
                <Col md="auto" className='video-item-col a-col' children={'1'}/>
                <Col md="auto" className='video-item-col b-col' >
                    <FormControl type="text" defaultValue='55' disabled/>
                </Col>
                <Col md="auto" className='video-item-col b-col' >
                    <FormControl type="text" defaultValue='20'/>
                </Col>
                <Col md="auto" className='video-item-col b-col' >
                    <FormControl type="text" defaultValue='53'/>
                </Col>
                <Col className='video-item-col'>
                    <FormControl type="text"/>
                </Col>
                <Col className='video-item-col'>
                    <FormControl type="text"/>
                </Col>
                <Col md="auto" className='video-item-col c-col'>
                    <Button variant="info">Sound</Button>
                </Col>
                <Col md="auto" className='video-item-col c-col'>
                    <Button variant="success" block>Save</Button>
                </Col>
                <Col md="auto" className='video-item-col c-col'>
                    <Button variant="dark">Delete</Button>
                </Col>
            </Row>
        </Container>
    );
  }
};
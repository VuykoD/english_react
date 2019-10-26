import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import  get  from 'lodash/get';
import { Container, Row, Col } from 'react-bootstrap';

const content = {
    firstBlock:{
        ru:'Изучение с помощю видео',
        ukr:'Вивчення за допомогою вiдео'
    },
    firstText:{
        ru:'',
        ukr:''
    },
    secondBlock:{
        ru:'Чтение',
        ukr:'Читання'
    },
    secondText:{
        ru:'',
        ukr:''
    },
    thirdBlock:{
        ru:'Тренажери',
        ukr:'Тренажери'
    },
    thirdText:{
        ru:'',
        ukr:''
    },
    fourthBlock:{
        ru:'Изучение с помощю игр',
        ukr:'Вивчення за домомогою iгр'
    },
    fourthText:{
        ru:'',
        ukr:''
    },
};

export default class HomePage extends Component {
    static propTypes = {
        store: PropTypes.shape({})
    };

  render(){
    const {siteLang } = this.props.store;
    const firstBlock = get(content, `firstBlock[${siteLang}]`);

    return (
        <Fragment>
            <div className="decoration"></div>
            <Container>

                    <Row>
                        <Col sm={7} className="block">{firstBlock}</Col>
                        <Col sm={4} className="block"></Col>
                    </Row>

            </Container>
        </Fragment>

    );
  }
};
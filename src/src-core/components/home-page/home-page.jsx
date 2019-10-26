import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import  get  from 'lodash/get';
import { Container, Row, Col } from 'react-bootstrap';

import '../../../scc/home-page.css';

const content = {
    firstBlock:{
        ru:'Изучение с помощью видео',
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
        <div className="decoration">
            <Container>
                <Row>
                    <Col sm={8}>
                        <div className="block block-left">
                            {firstBlock}
                        </div>
                    </Col>
                    <Col sm={4}>
                        <div className="block block-right" />
                    </Col>
                </Row>
            </Container>
        </div>

    );
  }
};
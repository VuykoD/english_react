import React, {Component} from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import {Container, Row, Col} from 'react-bootstrap';

import warn from '../../helper/warn/warn';
import '../../../scc/footer.css';

const content = {
    premium: {
        ru: 'Приобрести премиум',
        ukr: 'Придбати преміум'
    },
    contacts: {
        ru: 'Контакты',
        ukr: 'Контакти'
    },
    hint: {
        ru: 'На стадии разработки',
        ukr: 'На стадії розробки'
    },
    learned: {
        ru: 'Изучено',
        ukr: 'Вивчено'
    },
};

export default class Footer extends Component {
    static propTypes = {
        store: PropTypes.shape({})
    };

    warn = () => {
        const {siteLang} = this.props.store;
        warn(siteLang, 'inProgress')
    };

    render() {
        const {siteLang, fontColor, firstColor, secondColor, learnedCount} = this.props.store;
        const premium = get(content, `premium[${siteLang}]`);
        const contacts = get(content, `contacts[${siteLang}]`);
        const hint = get(content, `hint[${siteLang}]`);
        const learned = get(content, `learned[${siteLang}]`);
        const fontStyle = {color: fontColor};
        const gradientStyle = {background: `linear-gradient(to bottom,${secondColor},${firstColor}`};

        return (
            <div className="footer" style={gradientStyle}>
                <Container>
                    <Row>
                        <Col md="auto" title={hint}>
                            <div className='footer-premium' onClick={this.warn}>
                                {premium}
                            </div>
                        </Col>
                        <Col md="auto" className="footer-item">
                            <div children={`${learned} - ${learnedCount.learnedCount}/${learnedCount.totalCount}`} />
                        </Col>
                        <Col/>
                        <Col md="auto" className="footer-item" style={fontStyle} children={`${contacts}: +38 (093) 922-49-49`} />
                    </Row>
                </Container>
            </div>
        );
    }
};
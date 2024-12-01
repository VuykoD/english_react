import React, {Component} from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import {Container, Row, Col} from 'react-bootstrap';

import courseItemsJson, { kartaPol } from '../../../dict/courseItems';
import warn from '../../helper/warn/warn';
import '../../../scc/footer.css';

const content = {
    premium: {
        ru: 'Приобрести премиум',
        ukr: 'Придбати преміум',
        pol: 'Zakup premium',
        eng: 'Get premium'
    },
    beta: {
        ru: 'beta версия',
        ukr: 'beta версія',
        pol: 'Wersja beta',
        eng: 'beta version'
    },
    contacts: {
        ru: 'Контакты',
        ukr: 'Контакти',
        pol: 'Kontakty',
        eng: 'Contacts'
    },
    hint: {
        ru: 'На стадии разработки',
        ukr: 'На стадії розробки',
        pol: 'W fazie rozwoju',
        eng: 'Under development'
    },
    learned: {
        ru: 'Изучено',
        ukr: 'Вивчено',
        pol: 'Nauczone',
        eng: 'Learned'
    },
    countRepeat: {
        ru: "На изучении",
        ukr: "На вивченні",
        pol: "W trakcie powtórek",
        eng: "In progress"
    },
};

export default class Footer extends Component {
    static propTypes = {
        store: PropTypes.shape({}),
        onChangeItemCount: PropTypes.func,
        onChangeToLearnCount: PropTypes.func
    };

    warn = () => {
        const {siteLang} = this.props.store;
        warn(siteLang, 'inProgress')
    };

    render() {
        const {
            siteLang,
            fontColor,
            firstColor,
            secondColor,
            toLearnCount
        } = this.props.store;
        // const premium = get(content, `premium[${siteLang}]`);
        const beta = get(content, `beta[${siteLang}]`);
        const contacts = get(content, `contacts[${siteLang}]`);
        const countRepeat = get(content, `countRepeat[${siteLang}]`);
        const hint = get(content, `hint[${siteLang}]`);
        const fontStyle = {color: fontColor};
        const gradientStyle = {background: `linear-gradient(to bottom,${secondColor},${firstColor}`};

        return (
            <div className="footer" style={gradientStyle}>
                <Container>
                    <Row>
                        <Col md="auto" title={hint}>
                            <div className='footer-premium' onClick={this.warn}>
                                {beta}
                            </div>
                        </Col>
                        <Col
                            md="auto"
                            className="footer-item"
                            style={fontStyle}
                        >
                            {`${countRepeat} `}
                            <div
                                id="heartbeat"
                                children={`${toLearnCount}/${courseItemsJson.length + kartaPol.length}`}
                            />
                        </Col>
                        <Col/>
                        <Col md="auto" className="footer-item" style={fontStyle} children={`${contacts}: +38 (093) 922-49-49`} />
                    </Row>
                </Container>
            </div>
        );
    }
};

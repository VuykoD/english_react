import React, {Component} from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import {Container, Row, Col} from 'react-bootstrap';

import courseItemsJson from '../../../dict/courseItems';
import warn from '../../helper/warn/warn';
import '../../../scc/footer.css';

const content = {
    premium: {
        ru: 'Приобрести премиум',
        ukr: 'Придбати преміум'
    },
    beta: {
        ru: 'beta версия',
        ukr: 'beta версія'
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
    countRepeat: {
        ru: "На изучении",
        ukr: "На вивченні",
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
                            children={`${countRepeat} ${toLearnCount}/${courseItemsJson.length}`}
                        />
                        <Col/>
                        <Col md="auto" className="footer-item" style={fontStyle} children={`${contacts}: +38 (093) 922-49-49`} />
                    </Row>
                </Container>
            </div>
        );
    }
};

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import {Container, Row, Col} from 'react-bootstrap';

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
    }
};

export default class Footer extends Component {
    static propTypes = {
        store: PropTypes.shape({})
    };

    render() {
        const {siteLang, fontColor, firstColor, secondColor} = this.props.store;
        const premium = get(content, `premium[${siteLang}]`);
        const contacts = get(content, `contacts[${siteLang}]`);
        const hint = get(content, `hint[${siteLang}]`);
        const fontStyle = {color: fontColor};
        const gradientStyle = {background: `linear-gradient(to bottom,${secondColor},${firstColor}`};

        return (
            <div className="footer" style={gradientStyle}>
                <Container>
                    <Row>
                        <Col md="auto" title={hint}>
                            <div className='footer-premium'>
                                {premium}
                            </div>
                        </Col>
                        <Col/>
                        <Col md="auto" className="footer-item" style={fontStyle}>{contacts}: +38 (093) 922-49-49</Col>
                    </Row>
                </Container>
            </div>
        );
    }
};
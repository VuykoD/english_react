import React, {Component} from 'react';
import PropTypes from "prop-types";
import get from "lodash/get";
import {Col, Container, Row} from "react-bootstrap";

import '../../../scc/user-data.css';

const content = {
    name: {
        ru: 'Имя',
        ukr: "Ім'я"
    },
    surname: {
        ru: 'Фамилия',
        ukr: 'Прізвище'
    },
    save: {
        ru: 'Сохранить',
        ukr: 'Зберегти'
    },
};

export default class UserStatistic extends Component {
    static propTypes = {
        store: PropTypes.shape({}),
    };

    render() {
        const { siteLang } = this.props.store;
        const namePlaceholder = get(content, `name[${siteLang}]`);

        return (
            <Container>
                <Row className='user-row'>
                    <Col>
                        {namePlaceholder}
                    </Col>
                </Row>
            </Container>
        );
    }
};

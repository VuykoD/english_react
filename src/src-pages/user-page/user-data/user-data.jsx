import React, {Component} from 'react';
import PropTypes from "prop-types";
import get from "lodash/get";
import {Col, Container, Row} from "react-bootstrap";
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

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

export default class UserData extends Component {
    static propTypes = {
        store: PropTypes.shape({}),
        onChangeUserData: PropTypes.func,
    };

    onChangeUserData = () => {
        const userName = document.getElementById('userName');
        const userSurname = document.getElementById('userSurname');
        const userData = {name: userName.value, surname: userSurname.value};
        localStorage.userData = JSON.stringify(userData);
        this.props.onChangeUserData(JSON.stringify(userData));
    };

    render() {
        const {siteLang, userData} = this.props.store;
        const namePlaceholder = get(content, `name[${siteLang}]`);
        const surnamePlaceholder = get(content, `surname[${siteLang}]`);
        const parsedUserData = userData ? JSON.parse(userData) : {};
        const userName = get(parsedUserData, `name`);
        const userSurname = get(parsedUserData, `surname`);

        const save = get(content, `save[${siteLang}]`);

        return (
            <Container>
                <Row className='user-row'>
                    <Col>
                        <FormControl type="text" placeholder={namePlaceholder} id="userName" defaultValue={userName}/>
                    </Col>
                    <Col>
                        <FormControl type="text" placeholder={surnamePlaceholder} id="userSurname"
                                     defaultValue={userSurname}/>
                    </Col>
                </Row>
                <Row className='user-row'>
                    <Col md="auto">
                        <Button
                            variant="dark"
                            onClick={this.onChangeUserData}
                            children={save}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
};
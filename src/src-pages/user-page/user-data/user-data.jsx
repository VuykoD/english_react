import React, {Component} from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import {Col, Container, Row, FormControl, Form, Button} from 'react-bootstrap';

import '../../../scc/user-data.css';

const content = {
    name: {
        ru: 'Имя',
        ukr: "Ім'я",
        pol: 'Imię',
        eng: 'Name'
    },
    surname: {
        ru: 'Фамилия',
        ukr: 'Прізвище',
        pol: 'Nazwisko',
        eng: 'Surname'
    },
    admin: {
        ru: 'Админ',
        ukr: 'Адмін',
        pol: 'Administrator',
        eng: 'Admin'
    },
    save: {
        ru: 'Сохранить',
        ukr: 'Зберегти',
        pol: 'Zapisz',
        eng: 'Save'
    },
};

export default class UserData extends Component {
    static propTypes = {
        store: PropTypes.shape({}),
        onChangeUserData: PropTypes.func,
    };
    constructor(props) {
        super(props);
        const {userData} = props.store;
        const parsedUserData = userData ? JSON.parse(userData) : {};
        const userIsAdmin = get(parsedUserData, `isAdmin`);

        this.state = {
            userIsAdmin: userIsAdmin
        };
    }

    onChangeUserData = () => {
        const {userIsAdmin} = this.state;
        const userName = document.getElementById('userName');
        const userSurname = document.getElementById('userSurname');
        const userData = {name: userName.value, surname: userSurname.value, isAdmin: userIsAdmin};
        localStorage.userData = JSON.stringify(userData);
        this.props.onChangeUserData(JSON.stringify(userData));
    };

    changeIsAdmin = () => {
        this.setState({userIsAdmin: !this.state.userIsAdmin})
    };

    render() {
        const {siteLang, userData} = this.props.store;
        const {userIsAdmin} = this.state;
        const namePlaceholder = get(content, `name[${siteLang}]`);
        const surnamePlaceholder = get(content, `surname[${siteLang}]`);
        const save = get(content, `save[${siteLang}]`);
        const admin = get(content, `admin[${siteLang}]`);
        const parsedUserData = userData ? JSON.parse(userData) : {};
        const userName = get(parsedUserData, `name`);
        const userSurname = get(parsedUserData, `surname`);

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
                    <Col sm={1}>
                        <Form.Check
                            type="checkbox"
                            id="isAdmin"
                            onChange={() => this.changeIsAdmin()}
                            checked={userIsAdmin}
                            label={admin}
                        />
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

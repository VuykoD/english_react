import React, {Component} from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import get from 'lodash/get';
import {Container, Row, Col} from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import {Link} from 'react-router-dom';

import langType from '../../../dict/langType';
import warn from '../../helper/warn/warn';

import '../../../scc/header.css';

const content = {
    logo: {
        ru: 'Это будет легко',
        ukr: 'Це буде легко'
    },
    course: {
        ru: 'Курсы',
        ukr: 'Курси'
    },
    video: {
        ru: 'Видео',
        ukr: 'Відео'
    },
    learning: {
        ru: 'Изучение',
        ukr: 'Вивчення'
    },
    dictionary: {
        ru: 'Мой словарь',
        ukr: 'Мій словник'
    },
    progress: {
        ru: 'Прогресс',
        ukr: 'Прогрес'
    },
    myData: {
        ru: 'Мои данные',
        ukr: 'Мої данні'
    },
    btnSiteLang: {
        ru: 'Язык сайта',
        ukr: 'Мова сайту'
    },
    btnLearnedLand: {
        ru: 'Изучаемый язык',
        ukr: 'Мова, яку вивчаємо'
    },
    setting: {
        ru: 'Настройки',
        ukr: 'Налаштування'
    },
    search: {
        ru: 'Напишите слово, или фразу',
        ukr: 'Напишіть слово, або фразу'
    },
};

export default class Header extends Component {
    static propTypes = {
        store: PropTypes.shape({}),
        onChangeSiteLang: PropTypes.func,
        onChangeLearnedLang: PropTypes.func,
    };

    changeSiteLang = (e) => {
        const elem = e.currentTarget;
        if (elem) {
            const lang = elem.getAttribute('lang');
            localStorage.siteLand = lang;
            this.props.onChangeSiteLang(lang);
        }
    };

    changeLearnedLang = (e) => {
        const elem = e.currentTarget;
        if (elem) {
            const lang = elem.getAttribute('lang');
            localStorage.learnedLand = lang;
            this.props.onChangeLearnedLang(lang);
        }
    };

    onMouseOver = (e) => {
        const elem = e.currentTarget;
        elem.style.background = this.props.store.secondColor
    };

    onMouseOut = (e) => {
        const elem = e.currentTarget;
        const {firstColor, secondColor} = this.props.store;
        const gradientStyle = `linear-gradient(to bottom,${firstColor},${secondColor}`;
        elem.style.background = gradientStyle;
    };

    warn = (e) => {
        const {siteLang} = this.props.store;
        e.target.value = '';
        warn(siteLang, 'inProgress')
    };

    render() {
        const {siteLang, learnedLang, fontColor, firstColor, secondColor, userData = ''} = this.props.store;
        const parsedUserData = userData ? JSON.parse(userData) : {};
        const {name = '', surname = ''} = parsedUserData;
        const initials = (name || surname) ?
            name.charAt(0).toUpperCase() + surname.charAt(0).toUpperCase() :
            'NN';
        const currentSiteLang = langType[siteLang];
        const currentLearnedLang = langType[learnedLang];
        const direction = 'left';
        const logo = get(content, `logo[${siteLang}]`);
        const course = get(content, `course[${siteLang}]`);
        const video = get(content, `video[${siteLang}]`);
        const learning = get(content, `learning[${siteLang}]`);
        const dictionary = get(content, `dictionary[${siteLang}]`);
        const progress = get(content, `progress[${siteLang}]`);
        const myData = get(content, `myData[${siteLang}]`);
        const btnSiteLang = get(content, `btnSiteLang[${siteLang}]`);
        const btnLearnedLand = get(content, `btnLearnedLand[${siteLang}]`);
        const setting = get(content, `setting[${siteLang}]`);
        const search = get(content, `search[${siteLang}]`);
        const fontStyle = {color: fontColor};
        const gradientStyle = {background: `linear-gradient(to bottom,${firstColor},${secondColor}`};
        const hover = {onMouseOver: this.onMouseOver, onMouseOut: this.onMouseOut};

        return (
            <div className="header" style={gradientStyle}>
                <Container>
                    <Row>
                        <Col md="auto">
                            <Link to={'/english_react/'} className="logo">
                                <div className="engLogo" style={fontStyle}>LEARNING IS FUN</div>
                            </Link>
                            <Link to={'/english_react/'} className="logo">
                                {logo && <div className="lowerLogo" style={fontStyle}>{logo}</div>}
                            </Link>
                        </Col>
                        <Col>
                            <FormControl type="text" placeholder={search} className="mr-sm-2 search" onChange={this.warn}/>
                        </Col>
                        <Col md="auto" className="headerButton" style={gradientStyle} {...hover} >
                            <Link to={'/english_react/course-page'} children={course} style={fontStyle}/>
                        </Col>
                        <Col md="auto" className="headerButton" style={gradientStyle} {...hover} >
                            <Link to={'/english_react/video-page'} children={video} style={fontStyle}/>
                        </Col>
                        <Col md="auto" className="headerButton" style={{...fontStyle, ...gradientStyle}} {...hover} >
                            <Link to={'/english_react/learning'} children={learning} style={fontStyle}/>
                        </Col>
                        <Col md="auto" className="headerButton" style={gradientStyle} {...hover} >
                            <DropdownButton
                                id="dropdown-current-lang"
                                alignRight
                                title={<div
                                    style={fontStyle}>{get(currentSiteLang, 'short')}-{get(currentLearnedLang, 'short')}</div>}
                                variant={'header'}
                                bsPrefix='no-arrow'
                            >
                                <DropdownButton
                                    id="dropdown-site-lang"
                                    drop={direction}
                                    title={btnSiteLang}
                                    bsPrefix='dropdown-inner no-arrow'
                                    variant={'header'}
                                >
                                    {map(langType, (lang, key) => {
                                        if (lang.siteLang) {
                                            return (
                                                <Dropdown.Item
                                                    key={key}
                                                    active={siteLang === key}
                                                    onClick={this.changeSiteLang}
                                                    lang={key}
                                                    as="button"
                                                >
                                                    {lang.full}
                                                </Dropdown.Item>
                                            )
                                        }
                                    })}
                                </DropdownButton>
                                <DropdownButton
                                    id="dropdown-learned-lang"
                                    drop={direction}
                                    title={btnLearnedLand}
                                    bsPrefix='dropdown-inner no-arrow'
                                    variant={'header'}
                                >
                                    {map(langType, (lang, key) => {
                                        if (lang.learnedLang) {
                                            return (
                                                <Dropdown.Item
                                                    key={key}
                                                    active={learnedLang === key}
                                                    onClick={this.changeLearnedLang}
                                                    lang={key}
                                                >
                                                    {lang.full}
                                                </Dropdown.Item>
                                            )
                                        }
                                    })}
                                </DropdownButton>
                            </DropdownButton>
                        </Col>
                        <Col md="auto" className="headerButton" style={gradientStyle} {...hover} >
                            <div>
                                <DropdownButton
                                    id="dropdown-user"
                                    alignRight
                                    title={<div className="user" style={fontStyle}>{initials}</div>}
                                    variant='header header-user'
                                    bsPrefix='no-arrow'
                                >
                                    <Dropdown.Item href="/english_react/user_dictionary">{dictionary}</Dropdown.Item>
                                    <Dropdown.Item>{progress}</Dropdown.Item>
                                    <Dropdown.Item href="/english_react/user_data">{myData}</Dropdown.Item>
                                    <Dropdown.Item href="/english_react/user_setting">{setting}</Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
};
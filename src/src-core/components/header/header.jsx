import React, {Component} from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import get from 'lodash/get';
import {Container, Row, Col} from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import {Link, withRouter} from 'react-router-dom';

import langType from '../../../dict/langType';
import warn from '../../helper/warn/warn';

import '../../../scc/header.css';

const content = {
    logo: {
        ru: 'Это будет легко',
        ukr: 'Це буде легко',
        pol: 'Będzie łatwo'
    },
    course: {
        ru: 'Курсы',
        ukr: 'Курси',
        pol: 'Kursy'
    },
    learning: {
        ru: 'Изучение',
        ukr: 'Вивчення',
        pol: 'Nauka'
    },
    dictionary: {
        ru: 'Мой словарь',
        ukr: 'Мій словник',
        pol: 'Mój słownik'
    },
    // progress: {
    //     ru: 'Прогресс',
    //     ukr: 'Прогрес',
    //     pol: 'Postęp'
    // },
    myData: {
        ru: 'Мои данные',
        ukr: 'Мої данні',
        pol: 'Moje dane'
    },
    btnSiteLang: {
        ru: 'Язык сайта',
        ukr: 'Мова сайту',
        pol: 'Język strony'
    },
    btnLearnedLand: {
        ru: 'Изучаемый язык',
        ukr: 'Мова, яку вивчаємо',
        pol: 'Język do nauki'
    },
    setting: {
        ru: 'Настройки',
        ukr: 'Налаштування',
        pol: 'Ustawienia'
    },
    search: {
        ru: 'Напишите слово, или фразу',
        ukr: 'Напишіть слово, або фразу',
        pol: 'Wpisz słowo lub frazę'
    },
    statistic: {
        ru: 'Статистика',
        ukr: 'Статистика',
        pol: 'Statystyka'
    },
};


class HeaderClass extends Component {
    static propTypes = {
        store: PropTypes.shape({}),
        onChangeSiteLang: PropTypes.func,
        onChangeLearnedLang: PropTypes.func,
        location: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
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
        elem.style.background =  `linear-gradient(to bottom,${firstColor},${secondColor}`;
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
        const learning = get(content, `learning[${siteLang}]`);
        const dictionary = get(content, `dictionary[${siteLang}]`);
        const progress = get(content, `progress[${siteLang}]`);
        const myData = get(content, `myData[${siteLang}]`);
        const btnSiteLang = get(content, `btnSiteLang[${siteLang}]`);
        const btnLearnedLand = get(content, `btnLearnedLand[${siteLang}]`);
        const setting = get(content, `setting[${siteLang}]`);
        const search = get(content, `search[${siteLang}]`);
        const statistic = get(content, `statistic[${siteLang}]`);
        const fontStyle = {color: fontColor};
        const gradientStyle = {background: `linear-gradient(to bottom,${firstColor},${secondColor}`};
        const hover = {onMouseOver: this.onMouseOver, onMouseOut: this.onMouseOut};
        const url = get(this.props, 'location.pathname', '');
        const hideHeader = url !== '/' ? 'hide-header' : 'null';
        const btnClassName = `headerButton ${hideHeader}`;

        return (
            <div className="header" style={gradientStyle}>
                <Container>
                    <Row>
                        <Col md="auto">
                            <Link to={'/'} className="logo">
                                <div className="engLogo" style={fontStyle}>LEARNING IS FUN</div>
                            </Link>
                            <Link to={'/'} className="logo">
                                {logo && <div className="lowerLogo" style={fontStyle}>{logo}</div>}
                            </Link>
                        </Col>
                        <Col className="hidden">
                            <FormControl type="text" placeholder={search} className="mr-sm-2 search" onChange={this.warn}/>
                        </Col>
                            <Col md="auto" className={btnClassName} style={gradientStyle} {...hover} >
                            <Link to={'/course-page'} children={course} style={fontStyle}/>
                        </Col>
                        <Col md="auto" className={btnClassName} style={{...fontStyle, ...gradientStyle}} {...hover} >
                            <Link to={'/learning'} children={learning} style={fontStyle}/>
                        </Col>
                        <Col md="auto" className={btnClassName} style={gradientStyle} {...hover} >
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
                        <Col md="auto" className={btnClassName} style={gradientStyle} {...hover} >
                            <div>
                                <DropdownButton
                                    id="dropdown-user"
                                    alignRight
                                    title={<div className="user" style={fontStyle}>{initials}</div>}
                                    variant='header header-user'
                                    bsPrefix='no-arrow'
                                >
                                    <div><Link to={'/user_dictionary'} children={dictionary} /></div>
                                    <div>{progress}</div>
                                    <div><Link to={'/user_data'} children={myData} /></div>
                                    <div><Link to={'/user_setting'} children={setting} /></div>
                                    <div><Link to={'/user_statistic'} children={statistic} /></div>
                                </DropdownButton>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const header = withRouter(HeaderClass);

export default header;

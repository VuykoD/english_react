import React, { Component } from 'react';
import  map  from 'lodash/map';
import  get  from 'lodash/get';
import { Container, Row, Col } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const langType = {
    eng:{
        short: 'Eng',
        full: 'English',
        siteLang: false,
        learnedLang: true,
    },
    ru:{
        short: 'Рус',
        full: 'Русский',
        siteLang: true,
        learnedLang: false,
    },
    ukr:{
        short: 'Укр',
        full: 'Українська',
        siteLang: true,
        learnedLang: false,
    },
    pol:{
        short: 'Pol',
        full: 'Polska',
        siteLang: false,
        learnedLang: true,
    },
};

const content = {
    logo:{
        ru: 'Это будет легко',
        ukr: 'Це буде легко'
    },
    course:{
        ru: 'Курсы',
        ukr: 'Курси'
    },
    video:{
        ru: 'Видео',
        ukr: 'Відео'
    },
    learning:{
        ru: 'Изучение',
        ukr: 'Вивчення'
    },
    dictionary:{
        ru: 'Мой словарь',
        ukr: 'Мій словник'
    },
    progress:{
        ru: 'Прогресс',
        ukr: 'Прогрес'
    },
    myData:{
        ru: 'Мои данные',
        ukr: 'Мої данні'
    },
    btnSiteLang:{
        ru: 'Язык сайта',
        ukr: 'Мова сайту'
    },
    btnLearnedLand:{
        ru: 'Изучаемый язык',
        ukr: 'Мова, яку вивчаємо'
    },
};

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
                siteLang: 'ru',
                learnedLang: 'eng'
            }
    }

    changeSiteLang = (e) =>{
        this.changeLang(e, 'siteLang');
    };

    changeLearnedLang = (e) =>{
        this.changeLang(e, 'learnedLang');
    };

    changeLang(e, type){
        const elem = e.currentTarget;
        if(elem){
            const lang = elem.getAttribute('lang');
            const newLang= {};
            newLang[type]=lang;
            this.setState(newLang)
        }
    }

  render(){
    const {siteLang, learnedLang} = this.state;
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

    return (
        <Container>
          <Row>
            <Col>
              <div className="headerButton">English Is Fun</div>
              {logo && <div>{logo}</div> }
            </Col>
              <Col md="auto" className="headerButton">{course}</Col>
            <Col md="auto" className="headerButton">{video}</Col>
            <Col md="auto" className="headerButton">{learning}</Col>
            <Col md="auto">
                <DropdownButton
                    id="dropdown-user"
                    alignRight
                    title={'U'}
                    variant={'success'}
                >
                    <Dropdown.Item href="/lolo">{dictionary}</Dropdown.Item>
                    <Dropdown.Item>{progress}</Dropdown.Item>
                    <Dropdown.Item>{myData}</Dropdown.Item>
                </DropdownButton>
            </Col>
            <Col md="auto">
                <DropdownButton
                    id="dropdown-current-lang"
                    alignRight
                    title={`${currentSiteLang.short}-${currentLearnedLang.short}`}
                    variant={'success'}
                >
                    <DropdownButton
                        id="dropdown-site-lang"
                        drop={direction}
                        title={btnSiteLang}
                        variant={'info'}
                    >
                        {map(langType, (lang, key)=>{
                            if(lang.siteLang){
                                return(
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
                        variant={'info'}
                    >
                        {map(langType, (lang, key)=>{
                            if(lang.learnedLang){
                                return(
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
          </Row>
        </Container>
    );
  }
};
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import  map  from 'lodash/map';
import  get  from 'lodash/get';
import { Container, Row, Col } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import langType from '../../../dict/langType';

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
    setting:{
        ru: 'Настройки',
        ukr: 'Налаштування'
    },
    search:{
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

    changeSiteLang = (e) =>{
        const elem = e.currentTarget;
        if(elem){
            const lang = elem.getAttribute('lang');
            this.props.onChangeSiteLang(lang);
        }
    };

    changeLearnedLang = (e) =>{
        const elem = e.currentTarget;
        if(elem){
            const lang = elem.getAttribute('lang');
            this.props.onChangeLearnedLang(lang);
        }
    };

  render(){
    const {siteLang, learnedLang} = this.props.store;
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

    return (
        <Container>
          <Row>
            <Col md="auto" >
              <div className="engLogo">ENGLISH IS FUN</div>
              {logo && <div className="lowerLogo">{logo}</div> }
            </Col>
              <Col>
                  <FormControl type="text" placeholder={search} className="mr-sm-2 search" />
              </Col>
            <Col md="auto" className="headerButton">{course}</Col>
            <Col md="auto" className="headerButton">{video}</Col>
            <Col md="auto" className="headerButton">{learning}</Col>
            <Col md="auto" className="headerButton">
              <DropdownButton
                  id="dropdown-current-lang"
                  alignRight
                  title={`${get(currentSiteLang, 'short')}-${get(currentLearnedLang, 'short')}`}
                  variant={'header'}
              >
                  <DropdownButton
                      id="dropdown-site-lang"
                      drop={direction}
                      title={btnSiteLang}
                      variant={'header'}
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
                      variant={'header'}
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
            <Col md="auto" className="headerButton">
                <DropdownButton
                    id="dropdown-user"
                    alignRight
                    title='D'
                    variant='header header-user'
                >
                    <Dropdown.Item href="/lolo">{dictionary}</Dropdown.Item>
                    <Dropdown.Item>{progress}</Dropdown.Item>
                    <Dropdown.Item>{myData}</Dropdown.Item>
                    <Dropdown.Item>{setting}</Dropdown.Item>
                </DropdownButton>
            </Col>
          </Row>
        </Container>
    );
  }
};
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './src-core/components/header/header.jsx';
import Footer from './src-core/components/footer/footer.jsx';
import HomePage from './src-pages/home-page/home-page.jsx';
import Setting from './src-pages/setting-page/setting.jsx';
import Video from "./src-pages/video-page/video";
import Course from "./src-pages/course-page/course";

class App extends Component {

    render(){
    const {store = {}, onChangeSiteLang, onChangeLearnedLang, onChangeFontColor, onChangeBackColor} = this.props;
    const {backColor} = store;
    document.body.style.background = backColor;

    return (
        <Router>
            <div className="header">
                <Header
                    store={store}
                    onChangeSiteLang={onChangeSiteLang}
                    onChangeLearnedLang={onChangeLearnedLang}
                />
            </div>
            <Switch>
                <Route exact path='/' children={<HomePage store={store}/>} />
                <Route path='/course' children={<Course store={store}/>} />
                <Route path='/video' children={<Video/>} />
                <Route path='/setting' children={
                    <Setting
                        store={store}
                        onChangeFontColor={onChangeFontColor}
                        onChangeBackColor={onChangeBackColor}
                    />
                } />
            </Switch>
            <Footer
                store={store}
            />
        </Router>
    );
  }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        onChangeSiteLang: (lang) => {
            dispatch({ type: 'SITE_LANG', payload: lang })
        },
        onChangeLearnedLang: (lang) => {
            dispatch({ type: 'LEARNED_LANG', payload: lang })
        },
        onChangeFontColor: (color) => {
            dispatch({ type: 'FONT_COLOR', payload: color })
        },
        onChangeBackColor: (color) => {
            dispatch({ type: 'BACK_COLOR', payload: color })
        },
    })
)(App);

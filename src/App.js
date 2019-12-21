import React, {Component} from 'react';
import {connect} from 'react-redux'
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';
import Header from './src-core/components/header/header.jsx';
import Footer from './src-core/components/footer/footer.jsx';
import HomePage from './src-pages/home-page/home-page.jsx';
import Setting from './src-pages/user-page/setting-page/setting.jsx';
import UserData from './src-pages/user-page/user-data/user-data';
import UserDictionary from './src-pages/user-page/user-data/user-dictionary';
import Learning from './src-pages/learning-page/learning';
import Video from "./src-pages/video-page/video";
import VideoItem from "./src-pages/video-page/video-item";
import Course from "./src-pages/course-page/course";
import CourseItem from "./src-pages/course-page/course-item";

class App extends Component {

    render() {
        const {
            store = {},
            onChangeSiteLang, onChangeLearnedLang,
            onChangeFontColor, onChangeBackColor, onChangeFirstColor, onChangeSecondColor,
            onChangeUserData, onChangeLearnedCount
        } = this.props;
        const {backColor} = store;
        document.body.style.background = backColor;
        const videoItem = withRouter(props =>
            <VideoItem {...props} store={store} onChangeLearnedCount={onChangeLearnedCount}/>
            );
        const courseItem = withRouter(props =>
            <CourseItem {...props} store={store} onChangeLearnedCount={onChangeLearnedCount}/>
            );

        return (
            <Router>
                <Header
                    store={store}
                    onChangeSiteLang={onChangeSiteLang}
                    onChangeLearnedLang={onChangeLearnedLang}
                />
                <Switch>
                    <Route exact path='/english_react/' children={<HomePage store={store}/>}/>
                    <Route path='/english_react/course-page' children={<Course store={store}/>}/>
                    <Route path='/english_react/video-page' children={<Video store={store}/>}/>
                    <Route path='/english_react/learning' children={<Learning store={store} onChangeLearnedCount={onChangeLearnedCount}/>}/>
                    <Route path='/english_react/user_dictionary' children={<UserDictionary store={store}/>}/>
                    <Route path='/english_react/user_data' children={
                        <UserData
                            store={store}
                            onChangeUserData={onChangeUserData}
                        />
                    }/>
                    <Route path='/english_react/user_setting' children={
                        <Setting
                            store={store}
                            onChangeFontColor={onChangeFontColor}
                            onChangeBackColor={onChangeBackColor}
                            onChangeFirstColor={onChangeFirstColor}
                            onChangeSecondColor={onChangeSecondColor}
                        />
                    }/>
                    <Route path='/english_react/video/*' children={videoItem}/>
                    <Route path='/english_react/course/*' children={courseItem}/>
                    <Route path='/*' children={videoItem}/>
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
            dispatch({type: 'SITE_LANG', payload: lang})
        },
        onChangeLearnedLang: (lang) => {
            dispatch({type: 'LEARNED_LANG', payload: lang})
        },
        onChangeFontColor: (color) => {
            dispatch({type: 'FONT_COLOR', payload: color})
        },
        onChangeBackColor: (color) => {
            dispatch({type: 'BACK_COLOR', payload: color})
        },
        onChangeFirstColor: (color) => {
            dispatch({type: 'FIRST_COLOR', payload: color})
        },
        onChangeSecondColor: (color) => {
            dispatch({type: 'SECOND_COLOR', payload: color})
        },
        onChangeUserData: (userData) => {
            dispatch({type: 'USER_DATA', payload: userData})
        },
        onChangeLearnedCount: (learnedCount) => {
            dispatch({type: 'LEARNED_COUNT', payload: learnedCount})
        },
    })
)(App);

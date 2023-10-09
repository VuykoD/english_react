import React, {Component} from 'react';
import {connect} from 'react-redux'
import {HashRouter as Router, Switch, Route, withRouter} from 'react-router-dom';
import Header from './src-core/components/header/header.jsx';
import Footer from './src-core/components/footer/footer.jsx';
import HomePage from './src-pages/home-page/home-page.jsx';
import Setting from './src-pages/user-page/setting-page/setting.jsx';
import UserData from './src-pages/user-page/user-data/user-data';
import UserStatistic from "./src-pages/user-page/user-data/user-statistic";
import UserDictionary from './src-pages/user-page/user-data/user-dictionary';
import Learning from './src-pages/learning-page/learning';
import Course from "./src-pages/course-page/course";
import CourseItem from "./src-pages/course-page/course-item";

class App extends Component {

    render() {
        const {
            store = {},
            onChangeSiteLang,
            onChangeLearnedLang,
            onChangeFontColor,
            onChangeBackColor,
            onChangeFirstColor,
            onChangeSecondColor,
            onChangeUserData,
            onChangeItemCount,
            onChangeToLearnCount
        } = this.props;
        const {backColor} = store;
        document.body.style.background = backColor;
        const courseItem = withRouter(props =>
            <CourseItem {...props} store={store}/>
            );

        return (
            <Router>
                <Header
                    store={store}
                    onChangeSiteLang={onChangeSiteLang}
                    onChangeLearnedLang={onChangeLearnedLang}
                />
                <Switch>
                    <Route exact path='/' children={<HomePage store={store}/>}/>
                    <Route path='/course-page' children={
                        <Course
                            store={store}
                            onChangeItemCount={onChangeItemCount}
                            onChangeToLearnCount={onChangeToLearnCount}
                        />
                    }/>
                    <Route path='/learning' children={
                        <Learning
                            store={store}
                            onChangeItemCount={onChangeItemCount}
                            onChangeToLearnCount={onChangeToLearnCount}
                        />
                    }/>
                    <Route path='/user_dictionary' children={<UserDictionary store={store}/>}/>
                    <Route path='/user_data' children={
                        <UserData
                            store={store}
                            onChangeUserData={onChangeUserData}
                        />
                    }/>
                    <Route path='/user_setting' children={
                        <Setting
                            store={store}
                            onChangeFontColor={onChangeFontColor}
                            onChangeBackColor={onChangeBackColor}
                            onChangeFirstColor={onChangeFirstColor}
                            onChangeSecondColor={onChangeSecondColor}
                        />
                    }/>
                    <Route path='/user_statistic' children={
                        <UserStatistic
                            store={store}
                        />
                    }/>
                    <Route path='/course/*' children={courseItem}/>
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
        onChangeItemCount: (itemCount) => {
            dispatch({type: 'ITEM_COUNT', payload: itemCount})
        },
        onChangeToLearnCount: (toLearnCount) => {
            dispatch({type: 'TO_LEARN_COUNT', payload: toLearnCount})
        },
    })
)(App);

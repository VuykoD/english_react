import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';
import  get  from 'lodash/get';
import Header from './src-core/components/header/header.jsx';

import './App.css';

const content = {
    body: {
        ru: 'Тело',
        ukr: 'Тіло',
    }
};

class App extends Component {


  render(){
    const {store = {}, onChangeSiteLang, onChangeLearnedLang} = this.props;
    const {siteLang} = store;
    const body = get(content, `body[${siteLang}]`);

    return (
      <Fragment>
        <Header
            store={store}
            onChangeSiteLang={onChangeSiteLang}
            onChangeLearnedLang={onChangeLearnedLang}
        />
        <Button variant="primary">{body}</Button>
      </Fragment>
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
    })
)(App);

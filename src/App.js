import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
// import  get  from 'lodash/get';
import Header from './src-core/components/header/header.jsx';

import './scc/App.css';
import './scc/header.css';

class App extends Component {
  render(){
    const {store = {}, onChangeSiteLang, onChangeLearnedLang} = this.props;
    // const {siteLang} = store;

    return (
      <Fragment>
          <div className="header">
              <Header
                  store={store}
                  onChangeSiteLang={onChangeSiteLang}
                  onChangeLearnedLang={onChangeLearnedLang}
              />
          </div>
        <div className="decoration"></div>
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

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import Header from './src-core/components/header/header.jsx';
import Footer from './src-core/components/footer/footer.jsx';
import HomePage from './src-core/components/home-page/home-page.jsx';

class App extends Component {
  render(){
    const {store = {}, onChangeSiteLang, onChangeLearnedLang} = this.props;

    return (
        <Fragment>
            <div className="header">
              <Header
                  store={store}
                  onChangeSiteLang={onChangeSiteLang}
                  onChangeLearnedLang={onChangeLearnedLang}
              />
            </div>
            <HomePage store={store}/>
                <Footer
                    store={store}
                />
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

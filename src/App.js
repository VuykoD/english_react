import React, { Component, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import Header from './src-core/components/header/header.jsx';

import './App.css';
import './header.css';

export default class App extends Component {

  render(){
    return (
      <Fragment>
          <div className="header">
              <Header/>
          </div>
        <Button variant="primary">Тело</Button>
      </Fragment>
    );
  }
};

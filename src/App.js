import React, { Component, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import Header from './src-core/componets/header/header.js';

import './App.css';

export default class App extends Component {

  render(){
    return (
      <Fragment>
        <Header />
        <Button variant="primary">Primary</Button>
      </Fragment>
    );
  }
};

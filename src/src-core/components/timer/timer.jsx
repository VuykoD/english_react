import React, {Component} from 'react';
import get from 'lodash/get';
// import {Button, Col, Container, Form, Row, Badge, ProgressBar} from "react-bootstrap";


const content = {
    left: {
        ru: "Осталось",
        ukr: "Залишилось",
    },
};

export default class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeLeft: props.time,
        };
        this.intervalTimer = null;
    }

    componentDidMount() {
        this.setTimer();
    }

    componentWillUnmount() {
        clearInterval(this.intervalTimer);
    }

    setTimer = (e) => {
        clearInterval(this.intervalTimer);
        this.intervalTimer = setInterval(this.timer, 1000);
    };

    timer = () => {
        this.setState({timeLeft: this.state.timeLeft-1})
        if (this.state.timeLeft < 0) {
            clearInterval(this.intervalTimer);
            this.setState({timeLeft: this.props.time})
        }
    };

    render() {
        const {timeLeft} = this.state;
        const {siteLang} = this.props;
        const left = get(content, `left[${siteLang}]`);

        return ( <span children={`${left} - ${timeLeft}`} /> );
    }
};

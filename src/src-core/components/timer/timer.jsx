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
        const { timeLeft } = this.state;
        this.setState({timeLeft: timeLeft - 1});
        if (timeLeft === 1) clearInterval(this.intervalTimer);
    };

    render() {
        const {timeLeft} = this.state;
        const {siteLang} = this.props;
        const left = get(content, `left[${siteLang}]`);

        return (<span children={`${left} - ${timeLeft}`}/>);
    }
};

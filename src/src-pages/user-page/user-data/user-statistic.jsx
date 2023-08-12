import React, { Component } from 'react';
import PropTypes from "prop-types";
import { findIndex, map, get } from "lodash";
import { Container, Row, Col, Button } from "react-bootstrap";

import getCourseItems from '../../../dict/getCourseItems';
import '../../../scc/user-data.css';

const courseItems = getCourseItems();
export const content = {
    fullStatistic: {
        ru: "Полная статистика",
        ukr: "Повна статистика",
    },
    shortStatistic: {
        ru: "Краткая статистика",
        ukr: "Коротка статистика",
    },
    rightWritten: {
        ru: "правильно написано",
        ukr: "правильно написано",
    },
    trainingQuantity: {
        ru: "количество тренировок",
        ukr: "кількість тренувань",
    },
};

export default class UserStatistic extends Component {
    static propTypes = {
        store: PropTypes.shape({}),
    };
    constructor(props) {
        super(props);

        this.state = {
            statisticType: 'shortStatistic'
        };
    }

    setFullStatistic = () => {
        this.setState({statisticType: 'fullStatistic'})
    }

    setShortStatistic = () => {
        this.setState({statisticType: 'shortStatistic'})
    }

    render() {
        const {siteLang = ''} = this.props.store;
        const {statisticType} = this.state;
        const fullStatistic = get(content, `fullStatistic[${siteLang}]`);
        const shortStatistic = get(content, `shortStatistic[${siteLang}]`);
        const rightWritten = get(content, `rightWritten[${siteLang}]`);
        const trainingQuantity = get(content, `trainingQuantity[${siteLang}]`);
        const statistic = localStorage.statistic ? JSON.parse(localStorage.statistic) : [];
        const fullStat = (
            <>
                {map(statistic, (item, key) => {
                        if (item?.id) {
                            const unitIndex = findIndex(courseItems, { id: item.id });
                            const phrase = unitIndex > -1 ? courseItems[unitIndex].pol : '';
                            return <div key={key} children={phrase}/>
                        } else {
                            return <div key={key} children={item}/>
                        }
                    }
                )}
            </>
        );
        const shortArr = [];
        let quantity = 0;
        let date = '';
        map(statistic, item => {
            if (typeof item === 'object') {
                quantity++;
            }
            if (typeof item === 'string') {
                date = item.split(', ')[0];
                shortArr.push({date, quantity});
                quantity = 0;
            }
        });
        const shortArrSum = [];
        quantity = 0;
        date = '';
        let training = 0;
        map(shortArr, (item, key) => {
            if (!key || item.date !== shortArr[key-1].date){
                if (date){
                    shortArrSum.push({date, quantity, training})
                }
                date = item.date;
                quantity = item.quantity;
                training = 1;
            } else {
                training++;
                quantity = quantity + item.quantity;
            }
            if (key === shortArr.length -1) {
                shortArrSum.push({date, quantity, training})
            }
        });
        const shortStat  = (
            <>
                {map(shortArrSum, (item, key) => (
                    <div
                        key={key}
                        children={`${item.date}, ${trainingQuantity} - ${item.training}, ${rightWritten} - ${item.quantity}`}
                    />
                ))}
            </>
        );

        return (
            <Container>
                <Row className='user-row'>
                    <Col>
                        {statisticType === 'fullStatistic' && (
                            fullStat
                        )}
                        {statisticType === 'shortStatistic' && (
                            shortStat
                        )}
                    </Col>
                    <Col md={2}>
                        <Button variant="info" block onClick={this.setFullStatistic}>
                            {fullStatistic}
                        </Button>
                        <Button variant="info" block onClick={this.setShortStatistic}>
                            {shortStatistic}
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
};

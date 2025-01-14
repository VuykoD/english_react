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
        pol: "Pełna statystyka",
        eng: "Full statistics",
    },
    shortStatistic: {
        ru: "Краткая статистика",
        ukr: "Коротка статистика",
        pol: "Krótka statystyka",
        eng: "Short statistics",
    },
    rightWritten: {
        ru: "правильно написано",
        ukr: "правильно написано",
        pol: "poprawnie napisane",
        eng: "Correctly written",
    },
    trainingQuantity: {
        ru: "количество тренировок",
        ukr: "кількість тренувань",
        pol: "ilość treningów",
        eng: "Number of trainings",
    },
    effectiveTime: {
        ru: "Эффективное время",
        ukr: "Ефективний час",
        pol: "Czas efektywny",
        eng: "Effective time",
    },
    nonEffectiveTime: {
        ru: "Неэффективное время",
        ukr: "Неефективний час",
        pol: "Czas nieefektywny",
        eng: "Non-effective time",
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

    setEffectiveTimeStatistic = () => {
        this.setState({statisticType: 'effectiveTime'})
    }

    render() {
        const { siteLang = '', learnedLang } = this.props.store;
        const {statisticType} = this.state;
        const fullStatistic = get(content, `fullStatistic[${siteLang}]`);
        const shortStatistic = get(content, `shortStatistic[${siteLang}]`);
        const rightWritten = get(content, `rightWritten[${siteLang}]`);
        const trainingQuantity = get(content, `trainingQuantity[${siteLang}]`);
        const effectiveTime = get(content, `effectiveTime[${siteLang}]`);
        const statistic = localStorage.statistic ? JSON.parse(localStorage.statistic) : [];
        const fullStat = fullStatisticFunction(statistic, learnedLang);
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
        const effectiveTimeArr = [];
        let effectiveQuantity = 0;
        let time = '';
        map(statistic, item => {
            if (typeof item === 'object') {
                effectiveQuantity++;
            }
            if (typeof item === 'string') {
                if (effectiveQuantity >= 5 || effectiveQuantity <= 2) {
                    time = item.split(', ')[1];
                    effectiveTimeArr.push({time, effectiveQuantity});
                }
                effectiveQuantity = 0;
            }
        });
        const effectiveHours = {};
        const nonEffectiveHours = {};
        [ ...Array(24) ].forEach((e, i) => {
            map(effectiveTimeArr, (item) => {
                if (i === Number(item.time.slice(0, 2))){
                    if (item.effectiveQuantity >= 5) {
                        effectiveHours[i] = effectiveHours[i]
                            ? `${effectiveHours[i]}, ${item.effectiveQuantity}`
                            : item.effectiveQuantity ;
                    }
                    if (item.effectiveQuantity <= 2) {
                        nonEffectiveHours[i] = nonEffectiveHours[i]
                            ? `${nonEffectiveHours[i]}, ${item.effectiveQuantity}`
                            : item.effectiveQuantity ;
                    }
                }
            });
        });
        const effectiveTimeStat  = (
            <>
                {map(effectiveHours, (item, key) => (
                    <div
                        key={key}
                        children={`${key}, ${rightWritten} - ${item}`}
                    >
                        {`${key}, ${rightWritten} - ${item}`}
                        {nonEffectiveHours[key] && (
                            <div style={{backgroundColor: `rgb(64, 172, 98)`}}>
                                {`${key}, ${rightWritten} - ${nonEffectiveHours[key]}`}
                            </div>
                        )}
                    </div>
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
                        {statisticType === 'effectiveTime' && (
                            effectiveTimeStat
                        )}
                    </Col>
                    <Col md={2}>
                        <Button variant="info" block onClick={this.setFullStatistic}>
                            {fullStatistic}
                        </Button>
                        <Button variant="info" block onClick={this.setShortStatistic}>
                            {shortStatistic}
                        </Button>
                        <Button variant="info" block onClick={this.setEffectiveTimeStatistic}>
                            {effectiveTime}
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
};

export function fullStatisticFunction(statistic, learnedLang) {
    return (
        <>
            {map(statistic, (item, key) => {
                    if (item?.id) {
                        const unitIndex = findIndex(courseItems, { id: item.id });
                        const phrase = unitIndex > -1 ? courseItems[unitIndex][learnedLang] : '';
                        return <div key={key} children={phrase}/>
                    } else {
                        return <div
                            className='underline'
                            key={key}
                            children={item}
                        />
                    }
                }
            )}
        </>
    );
}

import React, { Component } from 'react';
import PropTypes from "prop-types";
import { findIndex, map } from "lodash";
import { Container } from "react-bootstrap";

import getCourseItems from '../../../dict/getCourseItems';
import '../../../scc/user-data.css';

const courseItems = getCourseItems();

export default class UserStatistic extends Component {
    static propTypes = {
        store: PropTypes.shape({}),
    };

    render() {
        const statistic = localStorage.statistic ? JSON.parse(localStorage.statistic) : [];

        return (
            <Container>
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
            </Container>
        );
    }
};

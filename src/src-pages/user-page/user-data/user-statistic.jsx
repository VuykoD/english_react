import React, { Component } from 'react';
import PropTypes from "prop-types";
import map from "lodash/map";
import { Container } from "react-bootstrap";

import '../../../scc/user-data.css';

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
                            return <div key={key} children={item?.id}/>
                        } else {
                            return <div key={key} children={item}/>
                        }
                    }
                )}
            </Container>
        );
    }
};

import React, {Component} from 'react';
import PropTypes from "prop-types";
import {AgGridReact} from '@ag-grid-community/react';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
import map from "lodash/map";
import findIndex from "lodash/findIndex";
import get from "lodash/get";
import { Container } from "react-bootstrap";

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '../../../scc/user-data.css';
import courseUnits from '../../../dict/courseUnits';
import getCourseItems from '../../../dict/getCourseItems';

let courseItems = getCourseItems();

const columnDefs = [
    {headerName: "type", field: "entity", width: 80},
    {headerName: "eng", field: "eng", width: 260},
    {headerName: "pol", field: "pol", width: 260},
    {headerName: "ru", field: "native", width: 260},
    {headerName: "source", field: "source", width: 190}
];

export function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

export default class UserDictionary extends Component {
    static propTypes = {
        store: PropTypes.shape({}),
        onChangeToLearnCount: PropTypes.func,
    };


    constructor(props) {
        super(props);
        const { learnedLang } = props.store;

        let lp = localStorage.progress ? JSON.parse(localStorage.progress) : null;
        lp = lp && lp[learnedLang] ? this.setLocalProgress(lp[learnedLang]) : null;

        this.state = ({
            localProgress: lp,
            entityId: null
        });
    }

    setLocalProgress = (lp) => {
        map(lp, (entityId, key) => {
            const index = findIndex(courseItems, {'id': entityId});
            lp[key] = { entity_id: entityId };
            lp[key].eng = get(courseItems, `[${index}].eng`);
            lp[key].pol = get(courseItems, `[${index}].pol`);
            lp[key].native = get(courseItems, `[${index}].transl`);
            lp[key].courseId = get(courseItems, `[${index}].unitId`);
            const courseIndex = findIndex(courseUnits, {'id': lp[key].courseId});
            lp[key].source = get(courseUnits, `[${courseIndex}].name`);
        });
        return lp;
    };

    // clear = () => {
    //     let lP = localStorage.progress ? JSON.parse(localStorage.progress) : null;
    //     if (!lP) return null;
    //     let newLP = [];
    //
    //     map(lP, item => {
    //         const index = findIndex(courseItems, {'id': item.entity_id});
    //         if (index > -1) {
    //             newLP.push(item);
    //         }
    //     });
    //
    //     localStorage.progress = JSON.stringify(newLP);
    //     newLP = this.setLocalProgress(newLP);
    //     this.setState({localProgress: newLP});
    //     return newLP;
    // };

    selectRow =(data)=> {
        const entityId = get(data, 'data.entity_id')
        if (entityId && this.state.entityId !== entityId) this.setState({entityId})
    }

    render() {

        return (
            <Container>
                {/*
                <Row>
                    <Col>
                        <Button variant="info" block onClick={this.clear}>
                            Clear
                        </Button>
                    </Col>
                </Row>
                */}
                <div
                    className="ag-theme-balham"
                    style={{
                        height: '700px',
                        width: '100%'
                    }}
                >
                    <AgGridReact
                        columnDefs={columnDefs}
                        defaultColDef={{
                            sortable: true,
                            rowSelection: "multiple",
                            filter: true
                        }}
                        rowData={this.state.localProgress}
                        modules={AllCommunityModules}
                        onRowClicked={this.selectRow}
                        // onGridReady={this.onGridReady}
                        pagination={true}
                    />
                </div>
            </Container>
        );
    }
};

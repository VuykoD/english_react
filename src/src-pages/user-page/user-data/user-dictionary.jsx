import React, {Component} from 'react';
import PropTypes from "prop-types";
import {AgGridReact} from '@ag-grid-community/react';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
import map from "lodash/map";
import findIndex from "lodash/findIndex";
import get from "lodash/get";
import {Container, Row, Col, Button} from "react-bootstrap";

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '../../../scc/user-data.css';
import courseUnits from '../../../dict/courseUnits';
import getCourseItems from '../../../dict/getCourseItems';
import setLearnCount from '../../../src-core/helper/setLearnCount';

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

        let lp = localStorage.progress ? JSON.parse(localStorage.progress) : null;
        lp = lp? this.setLocalProgress(lp) : null;

        this.state = ({
            localProgress: lp,
            entityId: null
        });
    }

    setLocalProgress = (lp) => {
        map(lp, (item, key) => {
            const index = findIndex(courseItems, {'id': item.entity_id});
            lp[key].eng = get(courseItems, `[${index}].eng`);
            lp[key].pol = get(courseItems, `[${index}].pol`);
            lp[key].native = get(courseItems, `[${index}].transl`);
            lp[key].courseId = get(courseItems, `[${index}].unitId`);
            const courseIndex = findIndex(courseUnits, {'id': lp[key].courseId});
            lp[key].source = get(courseUnits, `[${courseIndex}].name`);
        });
        return lp;
    };

    deleteRow = () => {
        const { onChangeToLearnCount } = this.props;
        let lP = localStorage.progress ? JSON.parse(localStorage.progress) : null;
        if (!lP) return null;
        const { entityId } = this.state;
        const index = findIndex(lP, {'entity_id': entityId});
        lP.splice(index,1);
        localStorage.progress = JSON.stringify(lP);
        localStorage.courseItems = JSON.stringify(courseItems);
        lP = this.setLocalProgress(lP);
        this.setState({localProgress: lP});
        setLearnCount(onChangeToLearnCount, lP.length);
    };

    sort = () => {
        let lP = localStorage.progress ? JSON.parse(localStorage.progress) : null;
        if (!lP) return null;
        lP = shuffle(lP);

        localStorage.progress = JSON.stringify(lP);
        lP = this.setLocalProgress(lP);
        this.setState({localProgress: lP});
    };

    clear = () => {
        let lP = localStorage.progress ? JSON.parse(localStorage.progress) : null;
        if (!lP) return null;
        let newLP = [];

        map(lP, item => {
            const index = findIndex(courseItems, {'id': item.entity_id});
            if (index > -1) {
                newLP.push(item);
            }
        });

        localStorage.progress = JSON.stringify(newLP);
        newLP = this.setLocalProgress(newLP);
        this.setState({localProgress: newLP});
        return newLP;
    };

    selectRow =(data)=> {
        const entityId = get(data, 'data.entity_id')
        if (entityId && this.state.entityId !== entityId) this.setState({entityId})
    }

    render() {

        return (
            <Container>
                <Row>
                    <Col>
                        <Button variant="info" block onClick={this.deleteRow}>
                            delete {this.state.entityId}
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="info" block onClick={this.sort}>
                            Sort
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="info" block onClick={this.clear}>
                            Clear
                        </Button>
                    </Col>
                </Row>
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

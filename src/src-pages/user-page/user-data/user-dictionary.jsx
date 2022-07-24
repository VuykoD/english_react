import React, {Component} from 'react';
import PropTypes from "prop-types";
import {AgGridReact} from '@ag-grid-community/react';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
import map from "lodash/map";
import findIndex from "lodash/findIndex";
import get from "lodash/get";
import {Container, Row, Col, Button} from "react-bootstrap";

import videoItems from '../../../dict/videoItems';
import videoNames from '../../../dict/videoNames';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '../../../scc/user-data.css';
import courseItems from "../../../dict/courseItems";
import courseUnits from "../../../dict/courseUnits";

const columnDefs = [
    {headerName: "type", field: "entity", width: 80},
    {headerName: "eng", field: "eng", width: 260},
    {headerName: "pol", field: "pol", width: 260},
    {headerName: "ru", field: "native", width: 260},
    {headerName: "source", field: "source", width: 190}
];

export default class UserDictionary extends Component {
    static propTypes = {
        store: PropTypes.shape({}),
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

    setLocalProgress = (lp) =>{
        map(lp, (item, key) => {

            if (item.entity === 'video') {
                lp[key].eng = get(videoItems, `[${item.entity_id}].eng`);
                lp[key].pol = get(videoItems, `[${item.entity_id}].pol`);
                lp[key].native = get(videoItems, `[${item.entity_id}].transl`);
                lp[key].courseId = get(videoItems, `[${item.entity_id}].idVideoName`);
                const courseIndex = findIndex(videoNames, {'id': lp[key].courseId});
                lp[key].source = get(videoNames, `[${courseIndex}].songName`);
            }

            if (item.entity === 'course') {
                const index = findIndex(courseItems, {'id': item.entity_id});
                lp[key].eng = get(courseItems, `[${index}].eng`);
                lp[key].pol = get(courseItems, `[${index}].pol`);
                lp[key].native = get(courseItems, `[${index}].transl`);
                lp[key].courseId = get(courseItems, `[${index}].unitId`);
                const courseIndex = findIndex(courseUnits, {'id': lp[key].courseId});
                lp[key].source = get(courseUnits, `[${courseIndex}].name`);
            }
        });
        return lp;
    };

    deleteRow = () => {
        let lP = localStorage.progress ? JSON.parse(localStorage.progress) : null;
        if (!lP) return null;
        const { entityId } = this.state;
        const index = findIndex(lP, {'entity_id': entityId});
        lP.splice(index,1);
        localStorage.progress = JSON.stringify(lP);
        lP = this.setLocalProgress(lP);
        this.setState({localProgress: lP});
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
                        <Button variant="info" block >
                            restore
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

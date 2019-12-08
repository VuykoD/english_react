import React, {Component} from 'react';
import PropTypes from "prop-types";
import {AgGridReact} from '@ag-grid-community/react';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
import map from "lodash/map";
import findIndex from "lodash/findIndex";
import get from "lodash/get";
import sortBy from 'lodash/sortBy'
import filter from 'lodash/filter';
import {Container, Row, Col, Button} from "react-bootstrap";

import videoItems from '../../../dict/videoItems';
import videoNames from '../../../dict/videoNames';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '../../../scc/user-data.css';
import FormControl from "react-bootstrap/FormControl";
import courseItems from "../../../dict/courseItems";
import courseUnits from "../../../dict/courseUnits";


// const content = {
// name: {
//     ru: 'Имя',
//     ukr: "Ім'я"
// },
// surname: {
//     ru: 'Фамилия',
//     ukr: 'Прізвище'
// },
// save: {
//     ru: 'Сохранить',
//     ukr: 'Зберегти'
// },
// };

const columnDefs = [
    {headerName: "type", field: "entity", width: 80},
    {headerName: "foreign", field: "eng", width: 320},
    {headerName: "native", field: "native", width: 320},
    {headerName: "type", field: "type", width: 80},
    {headerName: "level", field: "level", width: 80},
    {headerName: "date", field: "date", width: 100},
    {headerName: "sourse", field: "sourse", width: 190}
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
            sortNumber: 5,
            localProgress: lp
        });
    }

    setLocalProgress = (lp) =>{
        map(lp, (item, key) => {

            if (item.entity === 'video') {
                lp[key].eng = get(videoItems, `[${item.entity_id}].eng`);
                lp[key].native = get(videoItems, `[${item.entity_id}].transl`);
                lp[key].courseId = get(videoItems, `[${item.entity_id}].idVideoName`);
                const courseIndex = findIndex(videoNames, {'id': lp[key].courseId});
                lp[key].sourse = get(videoNames, `[${courseIndex}].songName`);
                lp[key].level = get(videoNames, `[${courseIndex}].level`);
            }

            if (item.entity === 'course') {
                const index = findIndex(courseItems, {'id': item.entity_id});
                lp[key].eng = get(courseItems, `[${index}].eng`);
                lp[key].native = get(courseItems, `[${index}].transl`);
                lp[key].courseId = get(courseItems, `[${index}].unitId`);
                const courseIndex = findIndex(courseUnits, {'id': lp[key].courseId});
                lp[key].sourse = get(courseUnits, `[${courseIndex}].name`);
                lp[key].level = get(courseUnits, `[${courseIndex}].level`);
            }
            if (+item.quantity === 0) lp[key].type = 'new';
            if (+item.quantity === 1) lp[key].type = 'repeat 1';
            if (+item.quantity === 2) lp[key].type = 'repeat 2';
            if (+item.quantity === 3) lp[key].type = 'exam';
            if (+item.quantity > 3) lp[key].type = 'learned';
        });

        sortBy(lp, 'sortOrder');
        return lp;
    };

    sort = () => {
        let lP = localStorage.progress ? JSON.parse(localStorage.progress) : null;
        if (!lP) return null;
        lP = sortBy(lP, ['quantity', 'date']);
        const filteredVideo = filter(lP, item => item.entity === "video");
        const filteredCourse = filter(lP, item => item.entity === "course");
        const { sortNumber } = this.state;

        map(filteredVideo, (itemVideo, key) => {
            filteredVideo[key].sortOrder = key + Math.floor(key/sortNumber)*sortNumber ;
        });

        map(filteredCourse, (itemVideo, key) => {
            filteredCourse[key].sortOrder = key + Math.floor(key/sortNumber)*sortNumber + sortNumber ;
        });

        lP = [...filteredVideo, ...filteredCourse];

        map(lP, (itemLocalProgress,key) => {
            delete lP[key].eng;
            delete lP[key].transl;
            delete lP[key].videoId;
            lP[key].entity_id = +itemLocalProgress.entity_id;
        });
        lP = sortBy(lP, 'sortOrder');
        this.setState({localProgress: lP});
        lP = lP? this.setLocalProgress(lP) : null;

        localStorage.progress = JSON.stringify(lP);
    };

    changeSortNumber = (e) => {
        const val = e.target.value;
        if (!(+val)) return e.target.value = this.state.repeatNumber;
        this.setState({sortNumber: +val});
    };

    // onGridReady = params => {
    //     this.gridApi = params.api;
    // };

    render() {

        return (
            <Container>
                <Row>
                    <Col>
                        <Button variant="info" block onClick={this.sort}>
                            sort
                        </Button>
                    </Col>
                    <Col>
                        <FormControl
                            type="text"
                            defaultValue={this.state.sortNumber}
                            onChange={this.changeSortNumber}
                        />
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
                        // onGridReady={this.onGridReady}
                        pagination={true}
                    />
                </div>
            </Container>
        );
    }
};
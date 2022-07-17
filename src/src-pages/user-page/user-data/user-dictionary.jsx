import React, {Component} from 'react';
import PropTypes from "prop-types";
import {AgGridReact} from '@ag-grid-community/react';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
import map from "lodash/map";
import findIndex from "lodash/findIndex";
import get from "lodash/get";
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

const columnDefs = [
    {headerName: "type", field: "entity", width: 80},
    {headerName: "eng", field: "eng", width: 280},
    {headerName: "pol", field: "pol", width: 280},
    {headerName: "ru", field: "native", width: 280},
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
            sortNumber: 2,
            localProgress: lp
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

    sort = () => {
        let lP = localStorage.progress ? JSON.parse(localStorage.progress) : null;
        if (!lP) return null;

        const filteredVideoNew = filter(lP, item => item.entity === "video" && +item.quantity === 0 );
        const filteredCourseNew = filter(lP, item => item.entity === "course" && +item.quantity === 0 );

        const filteredVideoRepeat = filter(lP, item => item.entity === "video" && +item.quantity === 1 );
        const filteredCourseRepeat = filter(lP, item => item.entity === "course" && +item.quantity === 1 );

        const filteredVideoExam = filter(lP, item => item.entity === "video" && item.quantity === 2 );
        const filteredCourseExam = filter(lP, item => item.entity === "course" && item.quantity === 2 );

        const filteredLearned = filter(lP, item => item.quantity > 2 );

        this.lP=[];
        this.sortArr(filteredVideoNew, filteredCourseNew);
        this.sortArr(filteredVideoRepeat, filteredCourseRepeat);
        this.sortArr(filteredVideoExam, filteredCourseExam);

        this.lP = [...this.lP, ...filteredLearned];


        map(this.lP, (it, key) => {
            this.lP[key].sortOrder = key;
            delete this.lP[key].eng;
            delete this.lP[key].pol;
            delete this.lP[key].transl;
            delete this.lP[key].videoId;
            delete this.lP[key].native;
            delete this.lP[key].courseId;
            delete this.lP[key].source;
            this.lP[key].entity_id = +it.entity_id;
        });

        localStorage.progress = JSON.stringify(this.lP);

        lP = this.lP? this.setLocalProgress(this.lP) : null;
        this.setState({localProgress: lP});
    };

    sortArr = ( filteredVideo, filteredCourse) => {
        const { sortNumber } = this.state;
        for (let i=0 ; i<100; i++){
            if(filteredVideo.length){
                const removedVideo = filteredVideo.splice(0, sortNumber);
                this.lP = (this.lP).length? [...this.lP, ...removedVideo]: [...removedVideo];
            }
            if(filteredCourse.length){
                const removedCourse = filteredCourse.splice(0, sortNumber);
                this.lP = (this.lP).length? [...this.lP, ...removedCourse]: [...removedCourse];
            }
            if(!filteredVideo.length && !filteredCourse.length) break;
        }
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

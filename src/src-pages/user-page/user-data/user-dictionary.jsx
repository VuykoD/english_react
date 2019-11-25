import React, {Component} from 'react';
import PropTypes from "prop-types";
import { AgGridReact } from '@ag-grid-community/react';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
import map from "lodash/map";
import findIndex from "lodash/findIndex";
import get from "lodash/get";
import { Container } from "react-bootstrap";

import videoItems from '../../../dict/videoItems';
import videoNames from '../../../dict/videoNames';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '../../../scc/user-data.css';


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

const columnDefs= [
    {headerName: "type", field: "entity", width: 80},
    {headerName: "foreign", field: "eng", width: 320},
    {headerName: "native", field: "native", width: 320},
    {headerName: "type", field: "type", width: 80},
    {headerName: "date", field: "date", width: 100 },
    {headerName: "source", field: "source", width: 190}
];

export default class UserDictionary extends Component {
    static propTypes = {
        store: PropTypes.shape({}),
    };


    constructor(props) {
        super(props);

        this.localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : null;
        map(this.localProgress, (item, key) => {
            this.localProgress[key].eng = get(videoItems, `[${item.entity_id}].eng`);
            this.localProgress[key].native = get(videoItems, `[${item.entity_id}].transl`);
            const videoIndex = findIndex(videoNames, {'id': item.videoId});
            if(+item.quantity === 0) this.localProgress[key].type = 'new';
            if(+item.quantity === 1 || +item.quantity === 2 ) this.localProgress[key].type = 'repeat';
            if(+item.quantity === 3) this.localProgress[key].type = 'exam';
            if(+item.quantity > 3) this.localProgress[key].type = 'learned';
            this.localProgress[key].source = get(videoNames, `[${videoIndex}].songName`);
        })
    }

    onGridReady = params => {
        this.gridApi = params.api;
        console.log(this.gridApi);
    };

    onSelectionChanged() {
        const selectedRows = this.gridApi.getSelectedRows();
        console.log(selectedRows);
    }

    render() {

        return (
            <Container>
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
                        rowData={this.localProgress}
                        modules={AllCommunityModules}
                        onSelectionChanged={this.onSelectionChanged.bind(this)}
                        onGridReady={this.onGridReady}
                        pagination={true}
                    />
                </div>
            </Container>
        );
    }
};
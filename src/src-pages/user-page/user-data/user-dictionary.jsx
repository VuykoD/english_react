import React, {Component} from 'react';
import PropTypes from "prop-types";
import { AgGridReact } from '@ag-grid-community/react';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
// import {AllCommunityModules} from '@ag-grid-community/all-modules';
// import get from "lodash/get";
import {Col, Container, Row} from "react-bootstrap";
// import FormControl from 'react-bootstrap/FormControl';
// import Button from 'react-bootstrap/Button';

import '../../../scc/user-data.css';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';

const content = {
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
};

const columnDefs= [
    {headerName: "Make", field: "make"},
    {headerName: "Model", field: "model"},
    {headerName: "Price", field: "price"}
];

export default class UserDictionary extends Component {
    static propTypes = {
        store: PropTypes.shape({}),
    };


    constructor(props) {
        super(props);

        this.state = {
            rowData: [
                {make: "Toyota", model: "Celica", price: 35000},
                {make: "Ford", model: "Mondeo", price: 32000},
                {make: "Porsche", model: "Boxter", price: 72000}
            ]
        }
    }

    render() {
        const {siteLang} = this.props.store;


        return (
            <Container>
                123
                <div
                    className="ag-theme-balham"
                    style={{
                        height: '500px',
                        width: '600px'
                    }}
                >
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={this.state.rowData}
                        modules={AllCommunityModules}
                    />
                </div>
            </Container>
        );
    }
};
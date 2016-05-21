import React, { Component } from 'react';
import Table from './Table.jsx';

export default class Base extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return <div className="data-base">
            <Table />
        </div>;
    }
}

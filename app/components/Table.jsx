import React, { Component } from 'react';
var contracts = require('json!./content.json');

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let headers = Object.keys(contracts[0]);
        let thDivs = headers.map((category) => <th>{category}</th>);
        let tdDivs = contracts.map((review) => {
            let tdData = Object.keys(review).map((key) => {
                return <td>{ review[key] }</td>
            });
            return <tr>
                {tdData}
            </tr>
        });
        return <table>
            <thead>
                <tr>
                    {thDivs}
                </tr>
            </thead>
            <tbody>
                {tdDivs}
            </tbody>
        </table>
    }
}

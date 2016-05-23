import React, { Component } from 'react';
import headers from './utils/headers';
var directory = require('json!./utils/directory.json');

export default class Output extends Component {
    render() {
        const { id } = this.props;
        let review = directory[id];
        let text;
        console.log(review);
        let reviewDivs = Object.keys(review).map((key) => {
            return <tr>
                <th className="data-row-header">{key}</th>
                <td className={key === 'Contract Language' ? 'data-info' : 'data-no'}>{review[key]}</td>
            </tr>
        });
        return <div className="data-output">
            <table>
                <tbody>
                    {reviewDivs}
                </tbody>
            </table>
            <div>
                {text}
            </div>
        </div>
    }
}

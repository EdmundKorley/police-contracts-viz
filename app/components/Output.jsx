import React, { Component } from 'react';
import headers from './utils/headers';
var directory = require('json!./utils/directory.json');

export default class Output extends Component {
    render() {
        const { id } = this.props;
        let review = directory[id];
        let text = review['Contract Language'];
        let reviewDivs = Object.keys(review).map((key) => {
                if (key != 'Contract Language') {
                    return <tr>
                        <th className="data-row-header">{key}</th>
                        <td className="data-no">{review[key]}</td>
                    </tr>
                }
                return false
        });
        return <div className="data-output">
            <table>
                <tbody>
                    {reviewDivs}
                </tbody>
            </table>
            <div className="data-info">
                <h3>Contract Language</h3>
                {text}
            </div>
        </div>
    }
}

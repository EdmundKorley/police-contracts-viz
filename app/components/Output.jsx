import React, { Component } from 'react';
import headers from './utils/headers';
var directory = require('json!./utils/directory.json');

function truncate(text, bound) {
    let textToShow;
    if (text.length > bound) {
        textToShow = text.substr(0, bound) + '...';
    } else {
        textToShow = text;
    }
    return textToShow;
}

export default class Output extends Component {
    render() {
        const { id } = this.props;
        let review = directory[id];
        let text = review['Contract Language'];
        let textToShow = truncate(text, 500);
        let reviewDivs = Object.keys(review).map((key) => {
                if (key != 'Contract Language') {
                    let reviewToShow = truncate(review[key], 30)
                    return <tr>
                        <th className="data-row-header">{key}</th>
                        <td className="data-no data-tooltip">
                            {reviewToShow}
                            <span>{review[key]}</span>
                        </td>
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
                <p className="data-tooltip">
                    {textToShow}
                    <span>{text}</span>
                </p>
            </div>
        </div>
    }
}

import React, { Component } from 'react';
var directory = require('json!./directory.json');
var headers = ['Limits Discipline', 'Erases misconduct records', 'Disqualifies Complaints', 'Limits Oversight', 'Delays Interrogations', 'Limits Interrogations', 'Delays interrogations', 'Gives officers access to information', 'Limits interrogations', 'City Pays Misconduct Settlements', 'Paid Leave for Misconduct', 'City Pays Interrogation Costs', 'City Pays for Legal Defense', 'Limits Transparency'];

export default class Output extends Component {
    render() {
        const { id } = this.props;
        let review = directory[id];
        let text;
        console.log(review);
        let reviewDivs = Object.keys(review).map((key) => {
            return <tr>
                <th className="data-row-header">{key}</th>
                <td className={key === 'Contract Language' ? 'data-info' : ''}>{review[key]}</td>
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

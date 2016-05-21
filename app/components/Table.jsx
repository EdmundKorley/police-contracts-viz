import React, { Component } from 'react';
var contracts = require('json!./rehash.json');
var headers = ['Limits Discipline', 'Erases misconduct records', 'Disqualifies Complaints', 'Limits Oversight', 'Delays Interrogations', 'Limits Interrogations', 'Delays interrogations', 'Gives officers access to information', 'Limits interrogations', 'City Pays Misconduct Settlements', 'Paid Leave for Misconduct', 'City Pays Interrogation Costs', 'City Pays for Legal Defense', 'Limits Transparency'];

export default class Table extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        const {renderDiv} = this.props;

        const codingHeaders = [<th></th>].concat(headers.map((header) => {
            return <th className="data-col-header">{header}</th>
        }));

        const contractDivs = Object.keys(contracts).map((dept) => {
            let contractPolices = contracts[dept];
            let contractCoding = contractPolices.map((policy) => {
                return policy['General Coding'];
            });
            let contractDivs = [<th className="data-row-header">{dept}</th>];
            headers.forEach((header) => {
                if (contractCoding.indexOf(header) > -1) {
                    contractDivs.push(<td className="data-yes">Yes</td>);
                } else {
                    contractDivs.push(<td className="data-no">No</td>);
                }
            });
            return <tr>
                {contractDivs}
            </tr>
        });

        return <table className='data-contracts'>
            <thead>
                <tr>
                    {codingHeaders}
                </tr>
            </thead>
            <tbody>
                {contractDivs}
            </tbody>
        </table>
    }
}

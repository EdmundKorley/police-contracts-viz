import React, { Component } from 'react';
import headers from './utils/headers';
var contracts = require('json!./utils/rehash.json');

export default class Table extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        const {handleClick} = this.props;

        const codingHeaders = [<th></th>].concat(headers.map((header) => {
            return <th className="data-col-header">{header}</th>
        }));

        const contractDivs = Object.keys(contracts).map((dept) => {
            let contractPolices = contracts[dept];
            let contractCoding = contractPolices.map((policy) => {
                return policy['General Coding'];
            });
            let contractIds = contractPolices.map((policy) => {
                return policy['Unique identifier'];
            });
            let contractDivs = [<th className="data-row-header">{dept}</th>];
            headers.forEach((header) => {
                let contractIndex = contractCoding.indexOf(header);
                if (contractIndex > -1) {
                    contractDivs.push(<td className="data-yes" onClick={() => { handleClick(contractIds[contractIndex]) }}>Yes</td>);
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

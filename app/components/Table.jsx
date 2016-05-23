import React, { Component } from 'react';
import headers from './utils/headers';
import { truncate } from './utils/handy';
var contracts = require('json!./utils/rehash.json');

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.getContractsDivs = this.getContractsDivs.bind(this);
    }
    getContractsDivs(getStates, handleClick) {
        const divs = Object.keys(contracts).map((dept) => {
            let sign = dept.toLowerCase().includes('bill of rights');
            if (sign == getStates) return false
            let contractPolices = contracts[dept];
            let contractCoding = contractPolices.map((policy) => {
                return policy['General Coding'].toLowerCase();
            });
            let contractIds = contractPolices.map((policy) => {
                return policy['Unique identifier'];
            });
            let rowHeader = truncate(dept, 15);
            let contractDivs = [
                <th className={rowHeader.length == dept.length ? "data-row-header" : "data-row-header data-tooltip"}>
                    { rowHeader }
                    <span>{rowHeader.length == dept.length ? "" : dept }</span>
                </th>
            ];
            headers.forEach((header) => {
                let contractIndex = contractCoding.indexOf(header.toLowerCase());
                if (contractIndex > -1) {
                    contractDivs.push(<td className="data-yes" onClick={() => { handleClick(contractIds[contractIndex]) }}> </td>);
                } else {
                    contractDivs.push(<td className="data-no"> </td>);
                }
            });
            return <tr>
                {contractDivs}
            </tr>
        });
        return divs.filter((x) => typeof x == 'object').sort((a, b) => {
            console.log(a, b);
            if (a.props.children[0].props.children[0] < b.props.children[0].props.children[0]) {
                return -1;
            }
            if (a.props.children[0].props.children[0] > b.props.children[0].props.children[0]) {
                return 1;
            }
            return 0;
        });
    }
    render() {

        const { handleClick } = this.props;

        const codingHeaders = [<th></th>].concat(headers.map((header) => {
            return <th className="data-col-header">{header}</th>
        }));

        const contractDivsState = this.getContractsDivs(false, handleClick);
        const contractDivsCity = this.getContractsDivs(true, handleClick);

        return <div className='data-contracts'>
            <table>
                <thead>
                    <tr>
                        {codingHeaders}
                    </tr>
                </thead>
                <tbody>
                    {contractDivsState}
                    <br></br>
                    {contractDivsCity}
                </tbody>
            </table>
        </div>
    }
}

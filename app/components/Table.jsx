import React, { Component } from 'react';
import headers from './utils/headers';
import { truncate } from './utils/handy';
var contracts = require('json!./utils/rehash.json');
var directory = require('json!./utils/directory.json');

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.getContractsDivs = this.getContractsDivs.bind(this);
    }
    getContractsDivs(getStates, id, handleClick) {
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
            let rowHeader = truncate(dept, 21);
            let contractDivs = [
                <th className={rowHeader.length == dept.length ? 'data-row-header' : 'data-row-header data-tooltip'}>
                    { rowHeader }
                    <span>{rowHeader.length == dept.length ? '' : dept }</span>
                </th>
            ];
            headers.forEach((header) => {
                let contractIndex = contractCoding.indexOf(header.toLowerCase());
                let uniqueID = contractIds[contractIndex];
                let contract = contracts[uniqueID];
                if (contractIndex > -1) {
                    contractDivs.push(<td className={id == uniqueID ? 'data-info' : 'data-yes'} onClick={() => { handleClick(uniqueID) }}> </td>);
                } else {
                    contractDivs.push(<td className='data-no'> </td>);
                }
            });
            return <tr>
                {contractDivs}
            </tr>
        });
        return divs.filter((x) => typeof x == 'object').sort((a, b) => {
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

        const { handleClick, id } = this.props;

        const codingHeaders = [<th className="data-out-row-header"></th>].concat(headers.map((header) => {
            return <th className='data-out-col-header'>{header}</th>
        }));

        const contractDivsState = this.getContractsDivs(false, id, handleClick);
        const contractDivsCity = this.getContractsDivs(true, id, handleClick);

        return <div className='data-contracts'>
            <div className="data-legend">
                <div className="data-legend-unit data-no-legend">
                    <div className="data-circle"></div>
                    <p>No such language</p>
                </div>
                <div className="data-legend-unit data-yes-legend">
                    <div className="data-circle"></div>
                    <p>Problematic language</p>
                </div>
                <div className="data-legend-unit data-info-legend">
                    <div className="data-circle"></div>
                    <p>Details on language</p>
                </div>
            </div>
            <table className="data-outer-table">
                <div>
                    <tr>
                        {codingHeaders}
                    </tr>
                </div>
                <div className="data-inner-table">
                    <table>
                        {contractDivsState}
                        <br></br>
                        {contractDivsCity}
                    </table>
                </div>
            </table>
        </div>
    }
}

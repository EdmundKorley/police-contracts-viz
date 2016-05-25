import React, { Component } from 'react';
import headers from './utils/headers';
import { truncate } from './utils/handy';
var contracts = require('json!./utils/rehash.json');

function allProvisions(category, state) {
    let stateList = contracts[state];
    let results = [];
    for (var i = 0; i < stateList.length; i++) {
        // if entry exists that matches category and state, push to our results div
        if (stateList[i]['General Coding'] == category) {
            results.push(stateList[i]);
        }
    }
    return results.map((result) => parseInt(result['Unique identifier']));
}

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.getContractsDivs = this.getContractsDivs.bind(this);
    }
    getContractsDivs(getStates, ids, handleClick) {
        const divs = Object.keys(contracts).map((dept) => {
            let sign = dept.toLowerCase().includes('bill of rights');
            if (sign == getStates) return false
            let contractPolicies = contracts[dept];
            let contractCoding = [], contractIds = [];
            for (var i = 0; i < contractPolicies.length; i++) {
                contractCoding.push(contractPolicies[i]['General Coding'].toLowerCase())
            }
            for (var i = 0; i < contractPolicies.length; i++) {
                contractIds.push(Number(contractPolicies[i]['Unique identifier']))
            }
            let rowHeader = truncate(dept, 21);
            let contractDivs = [
                <th className={rowHeader.length == dept.length ? 'data-row-header' : 'data-row-header data-tooltip'}>
                    { rowHeader }
                    <span>{rowHeader.length == dept.length ? '' : dept }</span>
                </th>
            ];
            for (let i = 0; i < headers.length; i++) {
                const header = headers[i];
                const headerIndex = contractCoding.indexOf(header.toLowerCase());
                const isHeaderOfInterest = headerIndex > -1;
                // Use index of header match to determine index of corresponding id
                const uniqueID = contractIds[headerIndex];
                const isIdOfInterest = ids.indexOf(uniqueID) > -1;
                const polyIds = allProvisions(header, dept);
                // console.log(polyIds);
                if (isHeaderOfInterest) {
                    contractDivs.push(<td className={isIdOfInterest ? 'data-info' : 'data-yes'} onClick={() => handleClick(polyIds) }> </td>);
                } else {
                    contractDivs.push(<td className='data-no'></td>);
                }
            };
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

        const { handleClick, ids } = this.props;

        const codingHeaders = [<th className="data-out-row-header"></th>].concat(headers.map((header) => {
            return <th className='data-out-col-header'>{header}</th>
        }));

        const contractDivsState = this.getContractsDivs(false, ids, handleClick);
        const contractDivsCity = this.getContractsDivs(true, ids, handleClick);

        return <div className='data-contracts'>
            <div className="data-legend">
                <div className="data-legend-unit data-no-legend">
                    <div className="data-circle"></div>
                    <h4>No such language</h4>
                </div>
                <div className="data-legend-unit data-yes-legend">
                    <div className="data-circle"></div>
                    <h4>Problematic language</h4>
                </div>
                <div className="data-legend-unit data-info-legend">
                    <div className="data-circle"></div>
                    <h4>Details on language</h4>
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
                        { contractDivsState }
                        <br></br>
                        { contractDivsCity }
                    </table>
                </div>
            </table>
        </div>
    }
}

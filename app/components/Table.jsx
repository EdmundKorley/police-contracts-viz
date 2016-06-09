import React, { Component } from 'react';
import headers from './utils/headers';
import { truncate } from './utils/handy';
import $ from 'jquery';
let contracts = require('json!./utils/rehash.json');

// In our table, a given x,y ('Category', 'City/State') can have multiple provisions,
// this table returns the unique identifiers of these confounding provisions
function allProvisions(category, state) {
    let stateList = contracts[state];
    let results = [];
    for (let i = 0; i < stateList.length; i++) {
        // if entry exists that matches category and state, push to our results div
        if (stateList[i]['Category'] == category) {
            results.push(stateList[i]);
        }
    }
    return results.map((result) => parseInt(result['Unique identifier']));
}

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.getContractsDivs = this.getContractsDivs.bind(this);
        this.updateMe = this.updateMe.bind(this);
    }
    updateMe() {
        this.forceUpdate();
    }
    componentDidMount() {
        // Re-render on resize
        let resize = this.props.handleClick;
        let reRender = this.updateMe;
        window.addEventListener("resize", () => {
            // Fixed header responsiveness
            const headerWidth = $('.data-inner-table th').width();
            const dataWidth = $('.data-inner-table td').width();

            $('.global-headers .data-out-row-header').css("min-width", headerWidth);
            $('.data-sync').css("min-width", headerWidth + "px !important");
            $('.global-headers .data-out-col-header').css("max-width", dataWidth);
            $('.global-headers .data-out-col-header').css("width", dataWidth);

            resize();
            // reRender();
        });

        // Fixed header responsiveness
        const headerWidth = $('.data-inner-table th').width();
        const dataWidth = $('.data-inner-table td').width();

        $('.global-headers .data-out-row-header').css("min-width", headerWidth);
        $('.data-sync').css("min-width", headerWidth + "px !important");
        $('.global-headers .data-out-col-header').css("max-width", dataWidth);
        $('.global-headers .data-out-col-header').css("width", dataWidth);

    }
    componentWillUnmount() {
        let resize = this.props.handleClick;
        // Unplug resize event listener
        window.removeEventListener("resize", () => {
            resize();
            reRender();
        });
    }
    // This massive function (to be modularized and made more sensible) builds the table rows of data
    getContractsDivs(getStates, ids, handleClick) {
        const divs = Object.keys(contracts).map((dept) => {
            let sign = dept.toLowerCase().includes('bill of rights');
            if (sign == getStates) return false
            let contractPolicies = contracts[dept];
            let contractCoding = [], contractIds = [];
            for (let i = 0; i < contractPolicies.length; i++) {
                contractCoding.push(contractPolicies[i]['Category'].toLowerCase())
            }
            for (let i = 0; i < contractPolicies.length; i++) {
                contractIds.push(Number(contractPolicies[i]['Unique identifier']))
            }
            let rowHeader;
            // Responsive! Kinda
            if ($(document).width() < 600) {
                rowHeader = truncate(dept, 18);
            } else if ($(document).width() < 1000) {
                rowHeader = truncate(dept, 18);
            } else {
                rowHeader = truncate(dept, 40);
            }
            if (sign) {
              let endIndex = dept.length - 21;
              rowHeader = dept.substring(0, endIndex);
            }
            let contractDivs = [
                <th className={rowHeader.length == dept.length ? 'data-row-header data-sync' : 'data-row-header data-tooltip data-sync'}>
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

        // We build the headers
        const codingHeaders = [<th style={{}} className="data-out-row-header"></th>].concat(headers.map((header) => {
            return <th className='data-out-col-header'>
                {header}
            </th>
        }));

        // Here we seperate city and state rows to make them separate in the table
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

            {/* Blah, all these dirty tricks for fixed table headers */}
            <table className="table table-responsive data-outer-table">
                <div className="global-headers">
                    <tr>
                        { codingHeaders }
                    </tr>
                </div>
                <div className="data-inner-table">
                    <table>
                        <u><h3>Statewide Police Bills of Rights:</h3></u>
                        { contractDivsState }
                        <br></br>
                        <u><h3>City Police Union Contracts:</h3></u>
                        { contractDivsCity }
                    </table>
                </div>
            </table>
        </div>
    }
}

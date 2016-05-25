import React, { Component } from 'react';
import Table from './Table.jsx';
import Output from './Output.jsx';

export default class Base extends Component {
    constructor(props) {
        super(props);
        // Here we pull the URL to see if there are any query params,
        // if so we incorporate it into our state
        // P.S. We are not going for a real routing solution, i.e. react-router,
        // because of incompatibility with GitHub static pages hosting
        let params = window.location.search || '?ids=349';
        let query = params.substring(5, params.length);
        let query_mod = query.split(',').map((num) => Number(num));
        this.state = {
            ids: query_mod
        }
        this.handleClick = this.handleClick.bind(this);
    }
    // We update the URL upon changes to our state
    resetURL(ids) {
        const idString = ids.join(",");
        let pathURL;
        if (idString) {
            pathURL = window.location.pathname + '?ids=' + idString;
        } else {
            pathURL = window.location.pathname;
        }
        window.history.pushState({}, 'Police Contracts - Campaign Zero', pathURL);
    }
    // Here we take unique identifiers (ids) of police contracts and feed it into our state,
    // excluding duplicates and putting id of interest at end of new ids array
    // (this is for <Output />'s functionality later downstream)
    handleClick(ids) {
        let newIds = [];
        let leadId = ids[ids.length - 1];
        let existingIds = this.state.ids;
        // If ids in already in our state, remove it from our list. For a mock toggle effect.
        ids.forEach((id) => {
            if (!existingIds.indexOf(id) > -1) {
                if (id < 532 && id > 0 && typeof id == 'number' && id != leadId) {
                    newIds.push(id)
                };
            }
        });
        newIds = Array.from(new Set(newIds));
        newIds = [...newIds, leadId];

        this.resetURL(newIds);
        this.setState({ids: newIds});
    }
    render() {
        return <div className="data-base">
            <Table ids={this.state.ids} handleClick={this.handleClick} />
            <Output ids={this.state.ids} handleClick={this.handleClick} />
        </div>;
    }
}

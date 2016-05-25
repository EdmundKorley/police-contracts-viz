import React, { Component } from 'react';
import Table from './Table.jsx';
import Output from './Output.jsx';

export default class Base extends Component {
    constructor(props) {
        super(props);
        let params = window.location.search || '?ids=349';
        let query = params.substring(5, params.length);
        let query_mod = query.split(',').map((num) => Number(num));
        this.state = {
            ids: query_mod
        }
        this.handleClick = this.handleClick.bind(this);
    }
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

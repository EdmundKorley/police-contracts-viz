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
        const pathURL = '/?ids=' + ids.join(",");
        window.history.pushState({}, 'Police Contracts - Campaign Zero', pathURL);
    }
    handleClick(ids) {
        let a = this.state.ids.concat([ids]).filter(n => typeof n == 'number');
        let new_ids = Array.from(new Set(a));

        if (new_ids.length > 4) {
            new_ids = new_ids.slice(Math.max(new_ids.length - 4, 1));
        }

        this.resetURL(new_ids);
        this.setState({ids: new_ids});
    }
    render() {
        return <div className="data-base">
            <Table ids={this.state.ids} handleClick={this.handleClick} />
            <Output ids={this.state.ids} />
        </div>;
    }
}

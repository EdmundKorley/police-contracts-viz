import React, { Component } from 'react';
import Table from './Table.jsx';
import Output from './Output.jsx';

export default class Base extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 1
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(id) {
        this.setState({id: id});
    }
    render() {
        return <div className="data-base">
            <Output id={this.state.id} />
            <Table handleClick={this.handleClick} />
        </div>;
    }
}

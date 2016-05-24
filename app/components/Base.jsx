import React, { Component } from 'react';
import Table from './Table.jsx';
import Output from './Output.jsx';

export default class Base extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 349
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(id) {
        this.setState({id: id});
    }
    render() {
        return <div className="data-base">
            <Table id={this.state.id} handleClick={this.handleClick} />
            <Output id={this.state.id} />
        </div>;
    }
}

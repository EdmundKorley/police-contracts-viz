import React, { Component } from 'react';
import Table from './Table.jsx';
import Output from './Output.jsx';

export default class Base extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 277
        }
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {

    }
    handleClick(id) {
        this.setState({id: id});
    }
    render() {
        let onKeyDown = this.handleClick;
        let id = this.state.id;
        return <div className="data-base">
            <Output id={this.state.id} />
            <Table id={this.state.id} handleClick={this.handleClick} />
        </div>;
    }
}

import React from 'react';
import { render } from 'react-dom';
import Base from './components/Base.jsx';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

render(
    <Router history={browserHistory}>
      <Route path="/" component={Base}>
      </Route>
    </Router>
    , document.getElementById('contracts-table'));

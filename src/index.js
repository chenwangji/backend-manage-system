import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './app';
import List from './list';
import Add from './add';
import Edit from './edit';
import 'antd/dist/antd.css';

ReactDOM.render(
  <Router history={ browserHistory }>
    <Route path='/' component={ App }>
      <IndexRoute component={ List }></IndexRoute>
      <Route path="list" component={ List }></Route>
      <Route path="add" component={ Add }></Route>
      <Route path='edit/:id' component={ Edit }></Route>      
    </Route>
  </Router> 
,	
  document.getElementById('root')
);



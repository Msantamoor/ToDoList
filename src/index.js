import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import CTForm from './Components/CreateTaskForm.js'
import CLForm from './Components/CreateListForm.js'




import * as serviceWorker from './serviceWorker';
//import ListDisplay from './Components/ListDisplay';

const routing = (
    <Router>
      <div>
          <ul>
              <li>
                  <Link to="/">Select List</Link>
              </li>
              <li>
                  <Link to="/Components/CreateListForm.js">Add List</Link>
              </li>
          </ul>
        <Route exact path="/" component={App} />
        <Route path="/Components/CreateTaskForm.js" component={CTForm} />
        <Route path="/Components/CreateListForm.js" component={CLForm} />
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
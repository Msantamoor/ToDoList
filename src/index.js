import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import CTForm from './Components/CreateTaskForm.js'
import CLForm from './Components/CreateListForm.js'
import CUForm from './Components/CreateUserForm.js'
import SIForm from './Components/SignInForm.js'




import * as serviceWorker from './serviceWorker';
//import ListDisplay from './Components/ListDisplay';



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
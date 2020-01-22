import React, { useState } from 'react';
import './App.css';
import './form.css';
import './Components/Users/SignInForm';
import './Components/Tasks/CreateTaskForm'
import { Links } from './Components/Navigation/Links'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContext } from './Context/Authentication'

import Main from './Pages/index'
import SignOut from './Components/Navigation/SignOut';

//URL for API
export const URL = 'https://to-do-list-server-api.herokuapp.com'

function App(){
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [state, setState] = useState({
    userLogged: "",
    activeList: ""
})

//Provides the logged in state
  const authenticate = () => {
    setAuthenticated(true)
  }

  const signout = () => {
    setAuthenticated(false)
  }

  //Sets the userlogged context value and the activeList context Value for data filtering.
  const identify = (user, list) => {
    console.log(user)
    console.log(list)
    setState({ userLogged: user, activeList: list })
  }
  
  

  const store = {
    isAuthenticated,
    state,
    authenticate,
    signout,
    identify
  }


  return (
    <div className="App">
      
      <AuthContext.Provider value={store}>
            <Router>
            <SignOut/>
            <Links />
            <Main/>
            </Router> 
      </AuthContext.Provider>
    </div>
  );
}


export default App
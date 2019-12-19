import React, { Component } from 'react';
import './App.css';
import ListDisplay from './Components/ListDisplay';
import Axios from 'axios'
import { Redirect } from 'react-router';
import { AuthContext } from './Context/Context.js';
import CUForm from './Components/CreateUserForm';

class App extends Component {
constructor(props){
  super(props)
  this.clickHandler = this.clickHandler.bind(this)
}

state = {
  selection: "",
  listCollection: [],
  loggedIn: false
  
}

  onSubmit = () => {
    Axios.get('http://localhost:3306/lists')
        .then(res => {
            console.log(res)
            this.setState({ listCollection: res.data.data });
        })
        .catch(function(error){
            console.log(error);
        })
};


  componentDidMount(){
  this.onSubmit()
  }

  clickHandler(name) {
    console.log(name)
    this.setState({ selection: name})
    this.setState({ redirect: true });
  }



  render() {

    if (this.state.redirect) {
      return <Redirect push to={{
        pathname: '/Components/CreateTaskForm.js',
        state: {
          selection: this.state.selection
        }
      }}/>
    }

    // if(this.props.location.state === undefined){
    //   return <Redirect push to={'/Components/SignInForm.js'}/>
    // }else{
    return (
      <div>

        <ListDisplay listCollection={this.state.listCollection} clickHandler={this.clickHandler}/>
        
      </div>
    );
    }
  }


export default App;
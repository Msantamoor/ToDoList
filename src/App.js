import React, { Component } from 'react';
import './App.css';
import ListDisplay from './Components/ListDisplay';
//import ListTable from './Components/ListTable';
import Axios from 'axios'
//import {ActiveList} from './Components/Context';
import { Redirect } from 'react-router';






class App extends Component {
constructor(props){
  super(props)
  this.clickHandler = this.clickHandler.bind(this)
}

state = {
  selection: "",
  listCollection: []
  
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
    this.setState({redirect: true});
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
    
    

    return (
      <div className="App">

        
        <ListDisplay listCollection={this.state.listCollection} clickHandler={this.clickHandler}/>
        
      </div>
    );
  }
}

export default App;
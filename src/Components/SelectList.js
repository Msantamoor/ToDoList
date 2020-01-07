import React, { Component } from 'react';
import ListDisplay from './ListDisplay';
import Axios from 'axios'
import { Redirect } from 'react-router';
import {AuthContext} from '../Context/Authentication'
import '../App.css'

export default class SelectList extends Component {
constructor(props){
  super(props)

  this.state = {
    selection: "",
    listCollection: [],
    clickedLists: [],
    clickedButtons: [],
    unavailableLists: [],
    editId: "",
    listsLoaded: false
    
  }


  this.clickHandler = this.clickHandler.bind(this)
  this.isClicked = this.isClicked.bind(this)
  this.deleteOneList = this.deleteOneList.bind(this)
  this.buttonClicked = this.buttonClicked.bind(this)
  this.editMenu = this.editMenu.bind(this)

}



  refreshLists = () => {
    Axios.get('http://localhost:3306/lists', {
        params: {
            user: this.context.state.userLogged,
        }
    })
        .then(res => {
            console.log(res)
            this.setState({ listCollection: res.data.data,
            listsLoaded: true });

        })
        .catch(function(error){
            console.log(error);
        })
};


  componentDidMount(){
  this.refreshLists()
  }

  isClicked(id){
    let clicked = (this.state.clickedLists.includes(id))
   //console.log(clicked)
   if(clicked === false){
       this.state.clickedLists.push(id)
       return clicked === true

   } else if(clicked === true){
       this.state.clickedLists.splice(this.state.clickedLists.indexOf(id), 1);
       return clicked === false
   }
}

buttonClicked(id){
  let clicked = (this.state.clickedButtons.includes(id))
 //console.log(clicked)
 if(clicked === false){
     this.state.clickedButtons.push(id)
     return clicked === true

 } else if(clicked === true){
     this.state.clickedButtons.splice(this.state.clickedButtons.indexOf(id), 1);
     return clicked === false
 }
}

  clickHandler(name) {
    console.log(name)
    this.setState({ selection: name });
    this.setState({ redirect: true });
  }

  addlist(){
    this.setState({ redirect2: true})

  }

  deleteOneList(id, listname){
    console.log(id)
    Axios.delete('http://localhost:3306/list', {
    params: {
        id: id,
        list: listname,
        user: this.context.state.userLogged
    }
})
    .then(res => {
        this.state.unavailableLists.splice(this.state.unavailableLists.indexOf(id), 1);
        this.refreshLists()
        //console.log(res)
    })
    .catch(function(error){
        console.log(error);
    })
}

  editMenu(obj){
        this.setState({
            name: obj.name,
            description: obj.description,
            due: obj.due,
            editId: obj._id 
        })
        this.state.unavailableLists.splice(this.state.unavailableLists.indexOf(obj.name), 1);
        this.setState({ redirect3: true})
    }

  render() {

    if (this.state.redirect) {
      console.log(this.state.selection)
        return(
          <AuthContext.Consumer>
            {({identify}) => (
                <Redirect push={identify(this.context.state.userLogged, this.state.selection)} to={'/CTForm'}/>
            )}
          </AuthContext.Consumer>
          
        )
    }

    if (this.state.redirect2){
        return (
          <Redirect push={true} to={{
            pathname: '/CLForm',
            state: {
              unavailableLists: this.state.unavailableLists
            }
          }}/>
        )
    }

    if(this.state.redirect3){
        return (
          <Redirect push={true} to={{
            pathname: '/EList',
            state: {
              id: this.state.editId,
              name: this.state.name,
              description: this.state.description,
              due: this.state.due,
              unavailableLists: this.state.unavailableLists
            }
          }}/>
        )
    }

    return (
      <div>
        <button disabled={this.state.listsLoaded ? false : true} onClick={() => this.addlist()}>Create New List</button>
        
        <ListDisplay listCollection={this.state.listCollection} clickHandler={this.clickHandler} 
        editMenu={this.editMenu} 
        isClicked={this.isClicked} clickedLists={this.state.clickedLists} 
        deleteOneList={this.deleteOneList}
        clickedButtons={this.state.clickedButtons} buttonClicked={this.buttonClicked}
        unavailableLists={this.state.unavailableLists} />
        
      </div>
    );
    }
  }

SelectList.contextType = AuthContext;

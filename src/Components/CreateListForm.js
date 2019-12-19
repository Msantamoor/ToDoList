import React from 'react';
import Axios from 'axios';
import { AuthContext } from '../Context/Context';
import { Redirect } from 'react-router';


export default class CLForm extends React.Component{
    state = {
        name: "",
        desc: "",
        due: ""
    }

    change = e => {
        this.setState({
        [e.target.name]: e.target.value
        })
    };
    
    onSubmit = e => {
        e.preventDefault()

        const list = {
            name: this.state.name,
            description: this.state.desc,
            due: this.state.due
        }
      
        Axios.post('http://localhost:3306/lists', list)
        .then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
        });

        this.setState({
            name: "",
            desc: "",
            due: ""
        })

    }
    

    
    render () {
        if(this.context.isAuthenticated === false){
            return <Redirect push to={'/Components/SignInForm.js'}/>
        }

        return(
            
            <form>
                <h3>Create New List</h3>
                <input
                name="name"
                placeholder="List Name"
                value={this.state.name}
                onChange={e => this.change(e)}
                />
                <br/>
                <input
                name="desc"
                placeholder="Type of List"
                value={this.state.desc}
                onChange={e => this.change(e)}
                />
                <br/>
                <input
                name="due"
                placeholder="Timeframe"
                value={this.state.due}
                onChange={e => this.change(e)}
                />
                <br/>
                <button onClick={e => this.onSubmit(e)}>Add List</button>

            </form>





        )
    }

}
CLForm.contextType = AuthContext
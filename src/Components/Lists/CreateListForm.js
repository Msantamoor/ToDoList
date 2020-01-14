import React from 'react';
import Axios from 'axios';
import { AuthContext } from '../../Context/Authentication';
import { withRouter, Redirect } from 'react-router-dom';


class CLForm extends React.Component{
    state = {
        name: "",
        desc: "",
        due: "",

        unavailableLists: []
    }

    change = e => {
        this.setState({
        [e.target.name]: e.target.value
        })
    };
    
    onSubmit = e => {
        e.preventDefault()

        const list = {
            user: this.context.state.userLogged,
            name: this.state.name,
            description: this.state.desc,
            due: this.state.due,
        }
      
        Axios.post('http://localhost:3306/lists', list)
        .then((res) => {
            console.log(res.data)
            this.setState({
                name: "",
                desc: "",
                due: ""
            })
            this.setState({ redirect: true })
        }).catch((error) => {
            console.log(error)
        });

        

    }
    
    componentDidMount(){
        this.setState({ unavailableLists: this.props.history.location.state.unavailableLists })
    }

    goBack(){
        this.setState({ back: true })
    }
    
    render () {
        if (this.state.redirect){
            return (
                <Redirect push to={'/Select'}/>
            )
        }

        if(this.state.back){
            return (
                <Redirect push to={'/Select'}/>
            )
        }

        return(
            <div>
            <form>
                <h3>Create New List</h3>
                <input
                name="name"
                placeholder="List Name"
                value={this.state.name}
                onChange={e => this.change(e)}
                />
                <p className={(this.state.unavailableLists.includes(this.state.name)) ? "shown-messages" : "hidden-messages" } >List names must be unique</p>
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
                <button disabled={(this.state.unavailableLists.includes(this.state.name)) ? true : false} 
                onClick={e => this.onSubmit(e)}
                >Add List</button>
                <br/>
                <button type="button" onClick={() => this.goBack()}>Back</button>

            </form>
            </div>
        )
    }

}
export default withRouter(CLForm);
CLForm.contextType = AuthContext
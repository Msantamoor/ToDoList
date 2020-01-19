import React from 'react';
import Axios from 'axios';
import 'react-router-dom'
import { AuthContext } from '../../Context/Authentication'
import { withRouter, Redirect } from 'react-router-dom';
import '../../form.css'
import {URL} from '../../App'



class EList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            name: "",
            description: "",
            due: "",
            selection: "",
            unavailableLists: [],
            taskCollection: []
        };

        this.change = this.change.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        
    }

    change = e => {
        this.setState({
        [e.target.name]: e.target.value
        })

    };

    onSubmit = (e) => {
        e.preventDefault()
        const id = this.props.history.location.state.id
        const listname = this.props.history.location.state.name

        const taskUpdate = {
            list: this.state.name
        }

        const list = {
            user: this.context.state.userLogged,
            name: this.state.name,
            description: this.state.description,
            due: this.state.due,
        }
        Axios.patch(`${URL}/list`, {
            params: {
                user: this.context.state.userLogged,
                id: id,
                list: list,
                prevName: listname,
                nameUpdate: taskUpdate
            }
        })
        .then((res) => {
            this.setState({
                name: "",
                desc: "",
                due: ""
            })
            this.setState({redirect: true})
        }).catch((error) => {
            console.log(error)
        });
    }

    componentDidMount(){
        this.setState({
            name: this.props.history.location.state.name,
            description: this.props.history.location.state.description,
            due: this.props.history.location.state.due,
            unavailableLists: this.props.history.location.state.unavailableLists
        })
    }

    goBack(){
        this.setState({ back: true })
    }
    
    render () {

        if(this.state.redirect){
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
                <h3>Edit List</h3>
                <input
                name="name"
                maxLength={20}
                placeholder="List Name"
                value={this.state.name}
                onChange={e => this.change(e)}
                />
                <p className={(this.state.unavailableLists.includes(this.state.name)) ? "shown-messages" : "hidden-messages" } > List names must be unique</p>
                <br/>
                <input
                name="description"
                maxLength={50}
                placeholder="What to do"
                value={this.state.description}
                onChange={e => this.change(e)}
                />
                <br/>
                <input
                name="due"
                maxLength={20}
                placeholder="When to have it done"
                value={this.state.due}
                onChange={e => this.change(e)}
                />
                <br/>
                <button disabled={this.state.name.length === 0} onClick={e => this.onSubmit(e)}>Update List</button>
                <br/>
                <button type="button" onClick={() => this.goBack()}>Back</button>


                
            </form>
          
            </div>
        )
        
    }

}

export default withRouter(EList);
EList.contextType = AuthContext;
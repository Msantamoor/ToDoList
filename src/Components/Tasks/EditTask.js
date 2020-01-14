import React from 'react';
import Axios from 'axios';
import 'react-router-dom'
import { AuthContext } from '../../Context/Authentication'
import { withRouter, Redirect } from 'react-router-dom';



class ETask extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            name: "",
            description: "",
            due: "",
            selection: "",
            taskCollection: [],
            unavailableTasks: []
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
        const task = {
            user: this.context.state.userLogged,
            name: this.state.name,
            description: this.state.description,
            due: this.state.due,
            list: this.context.state.activeList
        }
        Axios.patch('https://to-do-list-server-api.herokuapp.com/tasks', {
            params: {
                id: id,
                task: task
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
            unavailableTasks: this.props.history.location.state.unavailableTasks
        })
    }

    goBack(){
        this.setState({ back: true })
    }
    
    render () {

        if(this.state.redirect){
            return (
                <Redirect push to={'/CTForm'}/>
            )
        }

        if(this.state.back){
            return (
                <Redirect push to={'/CTForm'}/>
            )
        }
        
        return(
            <div>
            <form>
                <h3>Edit Task</h3>
                <input
                name="name"
                maxLength={20}
                placeholder="Task Name"
                value={this.state.name}
                onChange={e => this.change(e)}
                />
                <p className={(this.state.unavailableTasks.includes(this.state.name)) ? "shown-messages" : "hidden-messages" } > List names must be unique</p>
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
                <button disabled={this.state.name.length === 0} onClick={e => this.onSubmit(e)}>Update Task</button>
                <br/>
                <button type="button" disabled={(this.state.unavailableTasks.includes(this.state.name)) ? true : false} onClick={() => this.goBack()}>Back</button>


                
            </form>
          
            </div>
        )
        
    }

}

export default withRouter(ETask);
ETask.contextType = AuthContext;
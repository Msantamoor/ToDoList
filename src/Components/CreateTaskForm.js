import React from 'react';
import Axios from 'axios';
import TaskDisplay from './TaskDisplay';
import {Redirect} from 'react-router';



export default class CTForm extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            name: "",
            desc: "",
            due: "",
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
    
    refreshTasks(){
        const {selection} = this.props.location.state;
        console.log(selection);
        const request = selection.toString()
        console.log(request);
        Axios.get('http://localhost:3306/tasks', {
            params: {
                list: request
            }
        })
        .then(res => {
            console.log(res)
            this.setState({ taskCollection: res.data.data });
        })
        .catch(function(error){
            console.log(error);
        })
        console.log(request)
    }

    onSubmit = e => {
        e.preventDefault()
        const {selection} = this.props.location.state
        console.log(this.state.list)
        const task = {
            name: this.state.name,
            description: this.state.desc,
            due: this.state.due,
            list: selection
        }
        Axios.post('http://localhost:3306/tasks', task)
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
        console.log(selection)
        this.refreshTasks()
    }

    componentDidMount(){
        this.refreshTasks()
    }

    
    render () {
        if(this.context === false){
            return <Redirect push to={"/Components/CreateUserForm.js"}/>
          }
        return(
            <div>
            <form>
                <h3>Create New Task</h3>
                <input
                name="name"
                placeholder="Task Name"
                value={this.state.name}
                onChange={e => this.change(e)}
                />
                <br/>
                <input
                name="desc"
                placeholder="What to do"
                value={this.state.desc}
                onChange={e => this.change(e)}
                />
                <br/>
                <input
                name="due"
                placeholder="When to have it done"
                value={this.state.due}
                onChange={e => this.change(e)}
                />
                <br/>
                
                <button onClick={e => this.onSubmit(e)}>Add Task</button>
                
            </form>
            {/* <button onClick={() => this.refreshTasks()}>Refresh</button> */}
            <TaskDisplay taskCollection={this.state.taskCollection}/>
            </div>
            

        )
        
    }

}

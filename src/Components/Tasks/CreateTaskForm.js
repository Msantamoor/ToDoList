import React from 'react';
import Axios from 'axios';
import 'react-router-dom'
import TaskDisplay from './TaskDisplay';
import { AuthContext } from '../../Context/Authentication'
import { Redirect, withRouter } from 'react-router-dom';
import '../../form.css'
import {URL} from '../../App'




class CTForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            name: "",
            description: "",
            due: "",
            selection: "",
            editId: "",
            taskCollection: [],
            clickedTasks: [],
            clickedTaskNames: [],
            completedTasks: [],
            clickedButtons: [],
            unavailableTasks: [],
            doneDelete: false,
            selectedDelete: false
            
        };

        //this.clickHandler = this.clickHandler.bind(this)
        this.change = this.change.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.editMenu = this.editMenu.bind(this)
        this.isClicked = this.isClicked.bind(this)
        this.isCompleted = this.isCompleted.bind(this)
        this.deleteOneTask = this.deleteOneTask.bind(this)
        this.buttonClicked = this.buttonClicked.bind(this)
        this.setDoneDelete = this.setDoneDelete.bind(this)
        
    }

    change = e => {
        this.setState({
        [e.target.name]: e.target.value
        })

    };

    refreshTasks(){
        Axios.get(`${URL}/tasks`, {
            params: {
                user: this.context.state.userLogged,
                list: this.context.state.activeList
            }
        })
        .then(res => {
            console.log(res.data)
            this.setState({
                 taskCollection: res.data.data,
             });
        })
        .catch(function(error){
            console.log(error);
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const task = {
            user: this.context.state.userLogged,
            name: this.state.name,
            description: this.state.description,
            due: this.state.due,
            list: this.context.state.activeList
        }
        Axios.post(`${URL}/tasks`, task)
        .then((res) => {
            console.log(res.data)
            this.setState({
                name: "",
                description: "",
                due: ""
            })
            this.refreshTasks()
        }).catch((error) => {
            console.log(error)
        });
    }

    componentDidMount = () => {
        this.refreshTasks()
    }
    

    editMenu(obj){
        this.setState({
            name: obj.name,
            description: obj.description,
            due: obj.due,
            editId: obj._id 
        })
        this.state.unavailableTasks.splice(this.state.unavailableTasks.indexOf(obj.name), 1);
        this.setState({ redirect: true})
    }

    isClicked(id, name){
        let clicked = (this.state.clickedTasks.includes(id))
       //console.log(clicked)
       if(clicked === false){
           this.state.clickedTasks.push(id)
           this.state.clickedTaskNames.push(name)
           return clicked === true

       } else if(clicked === true){
           this.state.clickedTasks.splice(this.state.clickedTasks.indexOf(id), 1);
           this.state.clickedTaskNames.splice(this.state.clickedTaskNames.indexOf(id), 1);
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


    isCompleted(id){
        Axios.get(`${URL}/tasks-completed`, {
            params: {
                id: id,
                completed: "true"
            }
        })
        .then(res => {
            if(res.data === false){
                const task = { completed: "true" }
                Axios.patch(`${URL}/task`, {
                params: {
                    id: id,
                    task: task
                }
            })
            .then((res) => {
                this.state.completedTasks.push(id)
                this.refreshTasks()
            }).catch((error) => {
                console.log(error)
            });
                
            } else if(res.data === true){
                const task = { completed: "false" }
                Axios.patch(`${URL}/task`, {
                params: {
                    id: id,
                    task: task
                }
            })
            .then((res) => {
                this.state.completedTasks.splice(this.state.completedTasks.indexOf(id), 1);
                this.refreshTasks()
            }).catch((error) => {
                console.log(error)
            });
    
            }
    
        })
        .catch(function(error){
            console.log(error);
        })
    }

       


    deleteOneTask(id){
        console.log(id)
        Axios.delete(`${URL}/task`, {
        params: {
            id: id
        }
    })
        .then(res => {
            this.state.unavailableTasks.splice(0, this.state.unavailableTasks.length)
            this.refreshTasks()
            //console.log(res)
        })
        .catch(function(error){
            console.log(error);
        })
    }

    deleteDoneTasks(){
        Axios.delete(`${URL}/tasks-completed`, {
            params: {
                user: this.context.state.userLogged,
                list: this.context.state.activeList
            }
        })
        .then(res => {
            console.log(res.data)
            this.state.unavailableTasks.splice(0, this.state.unavailableTasks.length)
            this.refreshTasks()
        })
        .catch(function(error){
            console.log(error);
        })
    }

    deleteSelectedTasks(){
        const names = this.state.clickedTaskNames
            Axios.delete(`${URL}/tasks-selected`, {
            params: {
                user: this.context.state.userLogged,
                list: this.context.state.activeList,
                names: names
            }
        })
            .then(res => {
                this.state.unavailableTasks.splice(0, this.state.unavailableTasks.length)
                this.refreshTasks()
                //console.log(res)
            })
            .catch(function(error){
                console.log(error);
            })
    }

    goBack(){
        this.setState({ back: true })
    }

    setDoneDelete(){
        if(this.state.doneDelete === false){
            this.setState({ doneDelete: true})
            return true
        } else if(this.state.doneDelete === true){
            this.setState({ doneDelete: false })
            return false
        }
    }
    
    setSelectedDelete(){
        if(this.state.selectedDelete === false){
            this.setState({ selectedDelete: true })
            return true
        } else if(this.state.selectedDelete === true){
            this.setState({ selectedDelete: false })
            return false
        }
    }

    render () {
        if(this.state.redirect){
        return (
            <Redirect push={true} to={{
                pathname: '/ETask',
                state: { 
                    id: this.state.editId,
                    name: this.state.name,
                    description: this.state.description,
                    due: this.state.due,
                    unavailableTasks: this.state.unavailableTasks
                }
            }}/>
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
                <h3>Create New Task</h3>
                <input
                name="name"
                maxLength={20}
                placeholder="Task Name"
                value={this.state.name}
                onChange={e => this.change(e)}
                />
                <p className={(this.state.unavailableTasks.includes(this.state.name)) ? "shown-messages" : "hidden-messages" }>No duplicate tasks in the same list</p>
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
                
                <button disabled={this.state.name.length === 0 || (this.state.unavailableTasks.includes(this.state.name))} onClick={e => this.onSubmit(e)}>Add Task</button>
                
            </form>
            <h2>{`${this.context.state.activeList}`}</h2>
            <button type="button" onClick={() => this.goBack()}>Back</button>

            <TaskDisplay taskCollection={this.state.taskCollection} 
            editMenu={this.editMenu} isClicked={this.isClicked} 
            clickedTasks={this.state.clickedTasks} 
            isCompleted={this.isCompleted}
            completedTasks={this.state.completedTasks}
            deleteOneTask={this.deleteOneTask}
            clickedButtons={this.state.clickedButtons}
            buttonClicked={this.buttonClicked}
            unavailableTasks={this.state.unavailableTasks}

            />
            <br/>
            
                <button 
                    onClick={() => this.setDoneDelete()} 
                    shown={this.state.doneDelete ? "hidden" : ""}
                    >Delete Done Tasks</button> 
                
                <button 
                    className="Clicked"
                    onClick={() => this.setDoneDelete()}
                    shown={this.state.doneDelete ? "show" : "hidden"}
                    >Cancel</button>
                

                <button
                    onClick={() => this.setSelectedDelete()}
                    shown={this.state.selectedDelete ? "hidden" : ""}
                    >Delete Selected Tasks</button>

                <button 
                    className="Clicked"
                    onClick={() => this.setSelectedDelete()}
                    shown={this.state.selectedDelete ? "show" : "hidden"}
                    >Cancel</button>
               
                

            <br/>

            <button 
                    className="deletebutton"
                    onClick={() => this.deleteDoneTasks()}
                    onClickCapture={() => this.setDoneDelete()}
                    shown={this.state.doneDelete ? "" : "hidden"}
                    >Delete Completed Tasks?</button>

            <button 
                    className="deletebutton"
                    onClick={() => this.deleteSelectedTasks()}
                    onClickCapture={() => this.setSelectedDelete()}
                    shown={this.state.selectedDelete ? "" : "hidden"}
                    >Delete Selected Tasks?</button>

                    <br/>
            
            </div>

            

        )
        
    }

}
export default withRouter(CTForm)
CTForm.contextType = AuthContext;
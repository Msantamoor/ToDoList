import React, { Component } from 'react';
import '../form.css'




class TaskTable extends Component {
    state = {
        clickedTasks: [],
        clickedButtons: [],
        unavailableTasks: []
    }

    checkClicked(id){
        let bool = (this.state.clickedTasks.includes(id))
        return bool
    }

    checkComplete(id){
        let bool = (this.props.completedTasks.includes(id))
        return bool
    }

    checkDeletable(id){
        let bool = (this.state.clickedButtons.includes(id))
        return bool
    }

    componentDidMount(){
        this.props.unavailableTasks.push(this.props.obj.name)
        this.setState({ unavailableTasks: this.props.unavailableTasks})

        if(this.props.obj.completed === "true"){
            this.props.completedTasks.push(this.props.obj._id)
            this.setState({ completedTasks: this.props.completedTasks })
        }
    }

    render() {
        const id = this.props.obj._id
        const name = this.props.obj.name

        return (
            <tr 
            onClick={() => this.props.isClicked(id, name)}
            onClickCapture={() => this.setState({clickedTasks: this.props.clickedTasks})}
            className={(this.checkClicked(id)) ? "rowClicked" : "rowNotClicked"} 
            completed={(this.checkComplete(id)) ? "rowCompleted" : ""}
            deletable={(this.checkDeletable(id)) ? "true" : "false"}
            >
                <td className={(this.checkClicked(id)) ? "rowClicked" : "rowNotClicked"}
                    completed={(this.checkComplete(id)) ? "rowCompleted" : ""}>
                    {this.props.obj.name}
                </td>
                <td className={(this.checkClicked(id)) ? "rowClicked" : "rowNotClicked"}
                    completed={(this.checkComplete(id)) ? "rowCompleted" : ""}>
                    {this.props.obj.description}
                </td>
                <td className={(this.checkClicked(id)) ? "hidden-messages" : "rowNotClicked"}
                    completed={(this.checkComplete(id)) ? "rowCompleted" : ""}>
                    {this.props.obj.due}
                </td>
                <td>
                    <button 
                    className={(this.checkClicked(id)) ? "Clicked" : "notClicked"} 
                    onClick={() => this.props.isCompleted(id)}
                    onClickCapture={() => this.setState({completedTasks: this.props.completedTasks})}
                    completed={(this.checkComplete(id)) ? "rowCompleted" : ""} 
                    shown={(this.checkDeletable(id)) ? "hidden" : ""}
                    >Done</button>
                
                </td>
                <td>
                    <button className={(this.checkClicked(id)) ? "Clicked" : "notClicked"} 
                    onClick={() => this.props.editMenu(this.props.obj)}
                    completed={(this.checkComplete(id)) ? "rowCompleted" : ""}
                    shown={(this.checkDeletable(id)) ? "hidden" : ""}
                    >Edit</button>
                </td>
                <td>    
                    <button 
                    onClick={() => this.props.buttonClicked(id)} 
                    onClickCapture={() => this.setState({clickedButtons: this.props.clickedButtons})}
                    completed={(this.checkComplete(id)) ? "rowCompleted" : ""}
                    className={(this.checkClicked(id)) ? "Clicked" : "notClicked"}
                    shown={(this.checkDeletable(id)) ? "hidden" : ""}
                    >Delete</button> 
                    <button 
                    className="deletebutton"
                    onClick={() => this.props.deleteOneTask(id)}
                    shown={(this.checkDeletable(id)) ? "" : "hidden"}
                    >Delete Task?</button>
                </td>
                <td>
                <button 
                    className={(this.checkClicked(id)) ? "Clicked" : ""}
                    onClick={() => this.props.buttonClicked(id)}
                    shown={(this.checkDeletable(id)) ? "show" : "hidden"}
                    >Cancel</button>
                </td>
                    
            </tr>
        );
    }
}

export default TaskTable;
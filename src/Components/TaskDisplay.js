import React, { Component } from 'react';
import TaskTable from './TaskTable.js'
import '../form.css'


export default class TaskDisplay extends Component {

    constructor(props){
        super(props);
        this.state = { 
            taskCollection: [],
            clickedTasks: [],
            completedTasks: [],
            clickedButtons: [],
            unavailableTasks: []
        };
    }


    taskTable = () => {
        return this.props.taskCollection.map((data, i) => {
            return <TaskTable obj={data} key={i}
            editMenu={this.props.editMenu} 
            isClicked={this.props.isClicked} clickedTasks={this.props.clickedTasks} 
            isCompleted={this.props.isCompleted} completedTasks={this.props.completedTasks}
            deleteOneTask={this.props.deleteOneTask}
            clickedButtons={this.props.clickedButtons} buttonClicked={this.props.buttonClicked}
            unavailableTasks={this.props.unavailableTasks}
            
            />;
        });
    }

    render(){
        const taskTable = this.taskTable()


        return(
            <div className="">
                <table className="taskDisplayer">
                    <thead>
                    </thead>
                    <tbody>
                        {taskTable}
                    </tbody>
                    
                </table>

            </div>

        )
    }



}
import React, { Component } from 'react';
import TaskTable from './TaskTable.js'

export default class TaskDisplay extends Component {

    constructor(props){
        super(props);
        this.state = { taskCollection: [] };
    }


    taskTable = () => {
        return this.props.taskCollection.map((data, i) => {
            return <TaskTable obj={data} key={i} />;
        });
    }

    render(){
        console.log('taskrender')
        const taskTable = this.taskTable()
        return(
            <div className="taskDisplayer">
                <table className="taskTable">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Description</td>
                            <td>Time</td>
                        </tr>
                    </thead>
                    <tbody>
                        {taskTable}
                    </tbody>
                </table>

            </div>

        )
    }



}

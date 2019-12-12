import React, { Component } from 'react';

class TaskTable extends Component {
    
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.name}
                </td>
                <td>
                    {this.props.obj.description}
                </td>
                <td>
                    {this.props.obj.due}
                </td>
            </tr>
        );
    }
}

export default TaskTable;
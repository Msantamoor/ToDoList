import React, { Component } from 'react';
export const ActiveList = React.createContext("default context");




class ListTable extends Component {
    state = {
        selection: []
    }

    
    clickHandler = (name) => {
       this.setState({ selection: name })
    }
    
    
      
    render() {
        return (
            
            <tr onClick={() => this.props.clickHandler(this.props.obj.name)}>
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

export default ListTable;
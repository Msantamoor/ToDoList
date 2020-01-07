import React, { Component } from 'react';




class ListTable extends Component {
    state = {
        selection: [],
        clickedLists: [],
        clickedButtons: [],
        unavailableLists: []
    }
    
    checkClicked(id){
        let bool = (this.state.clickedLists.includes(id))
        return bool
    }

    checkDeletable(id){
        let bool = (this.state.clickedButtons.includes(id))
        return bool
    }

    componentDidMount(){
        this.props.unavailableLists.push(this.props.obj.name)
        this.setState({ unavailableLists: this.props.unavailableLists})
    }    
    render() {
        const listname = this.props.obj.name
        const id = this.props.obj._id

        return (
            
            <tr onClick={() => this.props.isClicked(id)}
                onClickCapture={() => this.setState({clickedLists: this.props.clickedLists})}
            className={(this.checkClicked(id)) ? "rowClicked" : "rowNotClicked"} 
            deletable={(this.checkDeletable(id)) ? "true" : "false"}
            >
                <td className={(this.checkClicked(id)) ? "rowClicked" : "rowNotClicked"}>
                    {this.props.obj.name}
                </td>
                <td className={(this.checkClicked(id)) ? "rowClicked" : "rowNotClicked"}>
                    {this.props.obj.description}
                </td>
                <td className={(this.checkClicked(id)) ? "rowClicked" : "rowNotClicked"}>
                    {this.props.obj.due}
                </td>
                <td>
                    <button 
                    className={(this.checkClicked(id)) ? "Clicked" : "notClicked"} 
                    onClick={() => this.props.clickHandler(listname)}
                    shown={(this.checkDeletable(id)) ? "hidden" : ""}
                    >Select</button>
                
                </td>
                <td>
                    <button className={(this.checkClicked(id)) ? "Clicked" : "notClicked"} 
                    onClick={() => this.props.editMenu(this.props.obj)}
                    shown={(this.checkDeletable(id)) ? "hidden" : ""}
                    >Edit</button>
                </td>
                <td>    
                    <button 
                    onClick={() => this.props.buttonClicked(id)} 
                    onClickCapture={() => this.setState({clickedButtons: this.props.clickedButtons})}
                    className={(this.checkClicked(id)) ? "Clicked" : "notClicked"}
                    shown={(this.checkDeletable(id)) ? "hidden" : ""}
                    >Delete</button> 
                    <button 
                    className="deletebutton"
                    onClick={() => this.props.deleteOneList(id, listname)}
                    shown={(this.checkDeletable(id)) ? "" : "hidden"}
                    >Delete List?</button>
                </td>
                <td>
                <button 
                    className={(this.checkClicked(id)) ? "Clicked" : "notClicked"}
                    onClick={() => this.props.buttonClicked(id)}
                    shown={(this.checkDeletable(id)) ? "show" : "hidden"}
                    >Cancel</button>
                </td>
            </tr>
            
        );
    }
    
}

export default ListTable;
import React, { Component } from 'react';
import ListTable from './ListTable'

export default class ListDisplay extends Component {

    constructor(props){
        super(props);
        this.state = { 
            listCollection: [], 
            clickedLists: [],
            clickedButtons: []
        
        };
    }


    listTable = () => {
        return this.props.listCollection.map((data, i) => {
            return <ListTable obj={data} key={i} clickHandler={this.props.clickHandler} 
            editMenu={this.props.editMenu} 
            isClicked={this.props.isClicked} clickedLists={this.props.clickedLists} 
            deleteOneList={this.props.deleteOneList}
            clickedButtons={this.props.clickedButtons} buttonClicked={this.props.buttonClicked}
            unavailableLists={this.props.unavailableLists} />;
        });
    }


    render(){
        const listTable = this.listTable()
        
        return(
            <div className="tableDisplay">
                <table>
                <thead>
                        <tr>
                            <td>Name</td>
                            <td>Description</td>
                            <td>Time</td>
                        </tr>
                    </thead>
                    <tbody >
                        {listTable}
                        
                    </tbody>
                </table>
            </div>
            

        )
    }

}

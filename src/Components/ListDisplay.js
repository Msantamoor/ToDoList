import React, { Component } from 'react';
import ListTable from './ListTable'

export default class ListDisplay extends Component {

    constructor(props){
        super(props);
        this.state = { listCollection: [] };
    }


    listTable = () => {
        return this.props.listCollection.map((data, i) => {
            return <ListTable obj={data} key={i} clickHandler={this.props.clickHandler} />;
        });
    }


    render(){
        console.log("listrender");
        const listTable = this.listTable()
        
        return(
            <div className="ListDisplayer">
                <table className="listTable">
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

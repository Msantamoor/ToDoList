import React from 'react';  
import '../pop.css';  

class Popup extends React.Component {  
render() {  
return (  
<div className='popup'>  
<div className='popup\_inner'>  
<h1>{this.props.text}</h1>  
<button className="deleteTask" onClick={this.props.deleteOne(this.props.id)}>Delete</button>
<button onClick={this.props.closePopup()}>No</button>  
</div>  
</div>  
);  
}  
}  

export default Popup;
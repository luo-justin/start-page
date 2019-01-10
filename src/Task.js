import React from 'react';
import 'Task'

export default class Task extends React.Component{
	constructor(props){
    super(props);
  }

 

	render(){
		 let EditableLi = contentEditable('li');
		// const {taskID, content} = this.props;
		return(
			 <EditableLi className="list-group-item" value={this.props.content}> 
       </EditableLi>
			);

	}
}


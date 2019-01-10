import React, { Component } from 'react';
import firebase from './Firebase';
import {Droppable} from 'react-beautiful-dnd';
import {Draggable} from 'react-beautiful-dnd';

function contentEditable(WrappedComponent) {
  return class extends React.Component {

    state = {
      editing: false
    }

    toggleEdit = (e) => {
      e.stopPropagation();
      if (this.state.editing) {
         console.log('it is won');

      } else {
        this.edit();
      }
    };

    edit = () => {
      this.setState({
        editing: true
      }, () => {
        this.domElm.focus();
      });
    };

    save = () => {
    	    	console.log('is value changed');
          console.log('Value is changed22', this.props.userID);

      this.setState({
        editing: false
      }, () => {

        if (this.isValueChanged()) {
          console.log('Value is changed', this.domElm.textContent);
          console.log('Value is changed', this.props.userID);

        	const db = firebase.firestore();
          // Add a new document in collection "cities"
					db.collection("users").doc(this.props.userID).collection("taskList").doc(this.domElm.id).update	({
					    content: this.domElm.textContent
					   })
					.then(function() {
					    console.log("Document successfully written!");
					})
					.catch(function(error) {
					    console.error("Error writing document: ", error);
					});

        }
      });
    };

    cancel = () => {
      this.setState({
        editing: false
      });
    };

    isValueChanged = () => {
      return this.props.value !== this.domElm.textContent
    };

    handleKeyDown = (e) => {
      const { key } = e;
      switch (key) {
        case 'Enter':
        case 'Escape':
          this.save();
          break;
      }
    };

    render() {
      let editOnClick = true;
      const {editing} = this.state;
      if (this.props.editOnClick !== undefined) {
        editOnClick = this.props.editOnClick;
      }
      return (
        <WrappedComponent
          className={editing ? 'editing' : ''}
          onClick={editOnClick ? this.toggleEdit : undefined}
          contentEditable={editing}
          ref={(domNode) => {
            this.domElm = domNode;
          }}
          onBlur={this.save}
          onKeyDown={this.handleKeyDown}
          {...this.props}
      >
        {this.props.value}
      </WrappedComponent>
      )
    }
  }
}


class TaskList extends Component{
	render(){
		let EditableLi = contentEditable('li');
		const myTaskList = this.props.taskList.map(task =>{
			return(
				<div key={task.taskID} >
					<EditableLi id={task.taskID} className="list-group-item" value={task.content} userID={this.props.userID} style={{height: '49px'}}>
					</EditableLi>
				</div>
				);
		});
		return(
			<Droppable droppableId="1">
				{(provided) =>(
						<ul className="list-group" ref={provided.innerRef}
							{...provided.droppableProps} 
						 >
						{this.props.taskList.map((task,index) =>
							<Draggable draggableId={task.taskID} key={task.taskID} index={index}>
							{(provided) =>(
								<div 									 
										{...provided.draggableProps}
									 {...provided.dragHandleProps}
									 ref={provided.innerRef}>
									<EditableLi id={task.taskID} className="list-group-item" value={task.content} userID={this.props.userID} style={{height: '49px'}}
									>
								</EditableLi>
								</div>
								)}
							
							</Draggable>)}
							{provided.placeholder}
					</ul>
				)}
			</Droppable>
			);

	}



}

export default TaskList;
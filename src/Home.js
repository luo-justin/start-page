import React, { Component } from 'react';
import TaskList from './TaskList';
import firebase from './Firebase';
import {DragDropContext} from 'react-beautiful-dnd';

class Home extends Component{

	constructor(props){
		super(props);
		this.state = {
			taskList: []
		};
		this.db = firebase.firestore();
		this.ref = null;
		

	}

	componentDidMount(){
			
		}

	addTask = e =>{
		var timestamp = Math.floor(Date.now() / 1000);

		this.db.collection("users").doc(this.props.userID).collection("taskList")
		.add({
        content: "",
        timestamp: timestamp
    })
    .then((docRef) =>{
        const state = this.state;
				state["taskList"].push({
					taskID: docRef,
					content: "",
					timestamp: timestamp
				});
				this.setState(state)
      });

	}

	onDragEnd = result =>{

	}


	render(){

		if(this.props.userID){
			this.ref = this.db.collection("users").doc(this.props.userID).collection("taskList");
		}
		return(
			<DragDropContext onDragEnd={this.onDragEnd}>
				<div className="container mt-5">
					<div class="row">
					  <div class="col">
							1 of 3
					  </div>
					  <div class="col">
					   	<div class="card">
								<div className="card-header">
									<h4 className="">Task List</h4>
									<button type="button" class="btn btn-primary" onClick={(e)=>this.addTask(e) }>Add</button>
								</div>
							</div>
					     		<TaskList taskList={this.props.taskList} userID={this.props.userID}/>
					   </div>
					    <div class="col">
					      3 of 3
					    </div>
					</div>
				</div>
			</DragDropContext>

			);

	}



}

export default Home;
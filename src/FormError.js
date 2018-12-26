import React, {Component} from 'react';

class FormError extends Component{
	
	constructor(props){
		super(props);
	}

	render(){
		const { errorMessage } = this.props;

		return(
			<div className="alert alert-danger" role="alert">
				  {errorMessage}
			</div>
			);

	}

}

export default FormError;
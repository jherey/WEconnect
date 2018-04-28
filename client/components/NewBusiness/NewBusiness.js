import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewBusinessForm from './NewBusinessForm';
import { createBusiness } from '../../actions/businessActions';
import { addFlashMessage } from '../../actions/flashMessages';

class NewBusiness extends Component {
	render() {
		const { createBusiness, addFlashMessage, isLoading } = this.props;
		return (
			<div>
				<NewBusinessForm
					createBusiness={createBusiness}
					addFlashMessage={addFlashMessage}
					isLoading={isLoading}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		isLoading: state.isLoading
	}
}

export default connect(mapStateToProps, { createBusiness, addFlashMessage })(NewBusiness);

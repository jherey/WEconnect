import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import EditBusinessForm from './EditBusinessForm';
import { connect } from 'react-redux';
import { updateBusiness, fetchBusiness, currentBusiness } from '../../actions/businessActions';
import { addFlashMessage } from '../../actions/flashMessages';

class EditBusiness extends Component {
	componentWillMount() {
		this.props.fetchBusiness(this.props.match.params.id);
	}
	render() {
		const { id } = this.props.match.params;
		const { currentBusiness, fetchBusiness, updateBusiness, addFlashMessage } = this.props;

		return (
			<div>
				<EditBusinessForm
					id={id}
					currentBusiness={currentBusiness}
					fetchBusiness={fetchBusiness}
					updateBusiness={updateBusiness}
					addFlashMessage={addFlashMessage}
				/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		currentBusiness: state.currentBusiness
	}
}

export default withRouter(connect(mapStateToProps, { currentBusiness, updateBusiness, fetchBusiness, addFlashMessage })(EditBusiness));

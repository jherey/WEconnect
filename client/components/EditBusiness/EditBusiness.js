import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import EditBusinessForm from './EditBusinessForm';
import { connect } from 'react-redux';
import loading from '../../actions/loading';
import { updateBusiness, fetchBusiness, currentBusiness } from '../../actions/businessActions';
import addFlashMessage from '../../actions/flashMessages';

class EditBusiness extends Component {
	componentWillMount() {
		this.props.fetchBusiness(this.props.match.params.id);
	}
	render() {
		const { id } = this.props.match.params;
		const { currentBusiness, fetchBusiness, updateBusiness, addFlashMessage, isLoading, loading } = this.props;

		return (
			<div>
				<EditBusinessForm
					loading={loading}
					id={id}
					currentBusiness={currentBusiness}
					fetchBusiness={fetchBusiness}
					updateBusiness={updateBusiness}
					addFlashMessage={addFlashMessage}
					isLoading={isLoading}
				/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		currentBusiness: state.currentBusiness,
		isLoading: state.isLoading
	}
}

export default withRouter(connect(mapStateToProps, { currentBusiness, updateBusiness, fetchBusiness, addFlashMessage, loading })(EditBusiness));

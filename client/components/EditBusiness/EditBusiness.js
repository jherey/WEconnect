import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import EditBusinessForm from './EditBusinessForm';
import { connect } from 'react-redux';
import loading from '../../actions/loading';
import { updateBusiness, fetchBusiness, currentBusiness, setProgress } from '../../actions/businessActions';
import addFlashMessage from '../../actions/flashMessages';

class EditBusiness extends Component {
	componentWillMount() {
		this.props.fetchBusiness(this.props.match.params.id);
	}
	render() {
		const { id } = this.props.match.params;
		const {
				currentBusiness,
				fetchBusiness,
				updateBusiness,
				setProgress,
				addFlashMessage,
				isLoading,
				loading,
				uploadProgress
		} = this.props;

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
					setProgress={setProgress}
					uploadProgress={uploadProgress}
				/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		currentBusiness: state.currentBusiness,
		isLoading: state.isLoading,
		uploadProgress: state.uploadProgress
	}
}

export default withRouter(connect(mapStateToProps, { currentBusiness, updateBusiness, fetchBusiness, addFlashMessage, loading, setProgress })(EditBusiness));

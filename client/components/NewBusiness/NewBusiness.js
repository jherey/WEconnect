import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewBusinessForm from './NewBusinessForm';
import { createBusiness, setProgress } from '../../actions/businessActions';
import loading from '../../actions/loading';
import addFlashMessage from '../../actions/flashMessages';

class NewBusiness extends Component {
	render() {
		const { createBusiness, addFlashMessage, isLoading, setProgress, uploadProgress, loading } = this.props;
		return (
			<div>
				<NewBusinessForm
					loading={loading}
					createBusiness={createBusiness}
					addFlashMessage={addFlashMessage}
					isLoading={isLoading}
					setProgress={setProgress}
					uploadProgress={uploadProgress}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		isLoading: state.isLoading,
		uploadProgress: state.uploadProgress
	}
}

export default connect(mapStateToProps, { createBusiness, addFlashMessage, setProgress, loading })(NewBusiness);

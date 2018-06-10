import React, { Component } from 'react';
import DashboardPage from './DashboardPage';
import { connect } from 'react-redux';
import { getOneUser, updateUser } from '../../actions/userActions';
import { getAUserBusiness } from '../../actions/businessActions';
import addFlashMessage from '../../actions/flashMessages';
import loading from '../../actions/loading';
import { setProgress } from '../../actions/businessActions';

class Dashboard extends Component {
	componentWillMount() {
		this.props.getOneUser(this.props.userId);
		this.props.getAUserBusiness(this.props.userId);
	}

	render() {
		const { 
			userId,
			businesses,
			isLoading,
			currentUser,
			uploadProgress,
			updateUser,
			addFlashMessage,
			loading,
			setProgress
		} = this.props;

		return (
			<div className="paddingBottom">
				<DashboardPage
					userId={userId}
					businessList={businesses}
					isLoading={isLoading}
					currentUser={currentUser}
					uploadProgress={uploadProgress}
					updateUser={updateUser}
					addFlashMessage={addFlashMessage}
					loading={loading}
					setProgress={setProgress}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		userId: state.authUser.user.id,
		businesses: state.userBusinesses,
		currentUser: state.currentUser,
		isLoading: state.isLoading,
		uploadProgress: state.uploadProgress
	}
}

export default connect(mapStateToProps, { getOneUser, getAUserBusiness, updateUser, addFlashMessage, loading, setProgress })(Dashboard);

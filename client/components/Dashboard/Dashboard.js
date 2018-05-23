import React, { Component } from 'react';
import DashboardPage from './DashboardPage';
import { connect } from 'react-redux';
import { getOneUser, updateUser } from '../../actions/userActions';
import { getAllBusinesses } from '../../actions/businessActions';
import addFlashMessage from '../../actions/flashMessages';
import loading from '../../actions/loading';
import { setProgress } from '../../actions/businessActions';
import { getAllUsers } from '../../actions/userActions';

class Dashboard extends Component {
	componentWillMount() {
		this.props.getOneUser(this.props.userId);
		this.props.getAllBusinesses();
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
			setProgress,
			getAllUsers
		} = this.props;

		const userBusiness = businesses.filter(business => {
			return business.userId === userId;
		});

		return (
			<div className="paddingBottom">
				<DashboardPage
				userId={userId}
				businessList={userBusiness}
				isLoading={isLoading}
				currentUser={currentUser}
				uploadProgress={uploadProgress}
				updateUser={updateUser}
				addFlashMessage={addFlashMessage}
				loading={loading}
				setProgress={setProgress}
				getAllUsers={getAllUsers}
			/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		userId: state.authUser.user.id,
		businesses: state.businesses,
		currentUser: state.currentUser,
		isLoading: state.isLoading,
		uploadProgress: state.uploadProgress
	}
}

export default connect(mapStateToProps, { getOneUser, getAllBusinesses, updateUser, addFlashMessage, loading, setProgress, getAllUsers })(Dashboard);

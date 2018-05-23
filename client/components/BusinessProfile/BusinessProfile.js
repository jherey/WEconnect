import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllUsers } from '../../actions/userActions';
import { fetchBusiness, currentBusiness, deleteBusiness } from '../../actions/businessActions';
import { fetchReviews } from '../../actions/reviewActions';
import addFlashMessage from '../../actions/flashMessages';
import loading from '../../actions/loading';
import BusinessProfilePage from './BusinessProfilePage';

class BusinessProfile extends Component {
	render() {
		const { id } = this.props.match.params;
		const {
			getAllUsers,
			fetchBusiness,
			currentBusiness,
			deleteBusiness,
			addFlashMessage,
			fetchReviews,
			reviews,
			loading,
			userId,
			isLoading,
			allUsers
		} = this.props;

		return (
			<div className="paddingBottom">
				<BusinessProfilePage
					id={id}
					getAllUsers={getAllUsers}
					loading={loading}
					fetchBusiness={fetchBusiness}
					currentBusiness={currentBusiness}
					addFlashMessage={addFlashMessage}
					deleteBusiness={deleteBusiness}
					fetchReviews={fetchReviews}
					reviews={reviews}
					userId={userId}
					isLoading={isLoading}
					allUsers={allUsers}
				/>
			</div>
		);
	}
};

/**
 * @description - Maps the redux state to the component props
 * 
 * @param {Object} state - Application state
 *  
 * @returns {Object} - Selected state
 */
function mapStateToProps(state) {
	return {
		userId: state.authUser.user.id,
		currentBusiness: state.currentBusiness,
		reviews: state.reviews,
		isLoading: state.isLoading,
		allUsers: state.allUsers
	}
}

export default withRouter(connect(mapStateToProps, { getAllUsers, fetchBusiness, currentBusiness, loading, addFlashMessage, deleteBusiness, fetchReviews })(BusinessProfile));


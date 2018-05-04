import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBusiness, currentBusiness, deleteBusiness } from '../../actions/businessActions';
import { fetchReviews } from '../../actions/reviewActions';
import addFlashMessage from '../../actions/flashMessages';
import loading from '../../actions/loading';
import BusinessProfilePage from './BusinessProfilePage';

class BusinessProfile extends Component {
	render() {
		const { id } = this.props.match.params;
		const {
			fetchBusiness,
			currentBusiness,
			deleteBusiness,
			addFlashMessage,
			fetchReviews,
			reviews,
			loading,
			userId,
			isLoading
		} = this.props;

		return (
			<div>
				<BusinessProfilePage
					id={id}
					loading={loading}
					fetchBusiness={fetchBusiness}
					currentBusiness={currentBusiness}
					addFlashMessage={addFlashMessage}
					deleteBusiness={deleteBusiness}
					fetchReviews={fetchReviews}
					reviews={reviews}
					userId={userId}
					isLoading={isLoading}
				/>
			</div>
		);
	}
};

function mapStateToProps(state) {
	return {
		userId: state.authUser.user.id,
		currentBusiness: state.currentBusiness,
		reviews: state.reviews,
		isLoading: state.isLoading
	}
}

export default withRouter(connect(mapStateToProps, { fetchBusiness, currentBusiness, loading, addFlashMessage, deleteBusiness, fetchReviews })(BusinessProfile));


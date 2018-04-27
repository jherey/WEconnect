import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBusiness, currentBusiness, deleteBusiness } from '../../actions/businessActions';
import { fetchReviews } from '../../actions/reviewActions';
import { addFlashMessage } from '../../actions/flashMessages';
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
			userId,
			isLoading
		} = this.props;

		return (
			<div>
				<BusinessProfilePage
					id={id}
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

export default withRouter(connect(mapStateToProps, { fetchBusiness, currentBusiness, addFlashMessage, deleteBusiness, fetchReviews })(BusinessProfile));


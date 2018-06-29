import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBusiness, currentBusiness, deleteBusiness } from '../../actions/businessActions';
import { fetchReviews } from '../../actions/reviewActions';
import addFlashMessage from '../../actions/flashMessages';
import { isLoading } from '../../actions/userActions';
import BusinessProfilePage from './BusinessProfilePage.jsx';

/**
 * @description Business profile component
 * @export {Object}
 * @class  BusinessProfile
 * @extends {Component}
 */
class BusinessProfile extends Component {
  /**
   * @memberof BusinessProfile
   * @return {ReactElement} markup
   */
  render() {
    const { id } = this.props.match.params;

    return (
			<div className="paddingBottom">
				<BusinessProfilePage
					id={id}
					loading={this.props.loading}
					fetchBusiness={this.props.fetchBusiness}
          currentBusiness={this.props.currentBusiness}
          averageRating={this.props.averageRating}
					addFlashMessage={this.props.addFlashMessage}
					deleteBusiness={this.props.deleteBusiness}
					fetchReviews={this.props.fetchReviews}
					userId={this.props.userId}
					isLoading={this.props.isLoading}
				/>
			</div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.authUser.user.id,
  currentBusiness: state.businesses.currentBusiness,
  averageRating: state.businesses.averageRating,
  loading: state.authUser.isLoading
});

BusinessProfile.propTypes = {
  match: PropTypes.object.isRequired,
  fetchBusiness: PropTypes.func.isRequired,
  currentBusiness: PropTypes.object.isRequired,
  averageRating: PropTypes.number,
  deleteBusiness: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  fetchReviews: PropTypes.func.isRequired,
  isLoading: PropTypes.func.isRequired,
  userId: PropTypes.number,
  loading: PropTypes.bool,
};

export default withRouter(connect(mapStateToProps, {
  fetchBusiness, currentBusiness, isLoading, addFlashMessage, deleteBusiness, fetchReviews
})(BusinessProfile));


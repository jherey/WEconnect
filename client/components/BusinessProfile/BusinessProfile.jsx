import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBusiness, currentBusiness, deleteBusiness } from '../../actions/businessActions';
import { fetchReviews } from '../../actions/reviewActions';
import addFlashMessage from '../../actions/flashMessages';
import loading from '../../actions/loading';
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
  currentBusiness: state.currentBusiness,
  isLoading: state.isLoading
});

BusinessProfile.propTypes = {
  match: PropTypes.object.isRequired,
  fetchBusiness: PropTypes.func.isRequired,
  currentBusiness: PropTypes.object.isRequired,
  deleteBusiness: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  fetchReviews: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  userId: PropTypes.number,
  isLoading: PropTypes.bool,
};

export default withRouter(connect(mapStateToProps, {
  fetchBusiness, currentBusiness, loading, addFlashMessage, deleteBusiness, fetchReviews
})(BusinessProfile));


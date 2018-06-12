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
    const {
      fetchBusiness,
      currentBusiness,
      deleteBusiness,
      addFlashMessage,
      fetchReviews,
      loading,
      userId,
      isLoading
    } = this.props;

    return (
			<div className="paddingBottom">
				<BusinessProfilePage
					id={id}
					loading={loading}
					fetchBusiness={fetchBusiness}
					currentBusiness={currentBusiness}
					addFlashMessage={addFlashMessage}
					deleteBusiness={deleteBusiness}
					fetchReviews={fetchReviews}
					userId={userId}
					isLoading={isLoading}
				/>
			</div>
    );
  }
}

/**
 * @description - Maps the redux state to the component props
 * @param {Object} state - Application state
 * @returns {Object} - Selected state
 */
function mapStateToProps(state) {
  return {
    userId: state.authUser.user.id,
    currentBusiness: state.currentBusiness,
    isLoading: state.isLoading
  };
}

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


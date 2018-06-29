import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardPage from './DashboardPage.jsx';
import { getOneUser, updateUser, isLoading } from '../../actions/userActions';
import addFlashMessage from '../../actions/flashMessages';
import { setProgress, getAUserBusiness } from '../../actions/businessActions';

/**
 * @description User dashboard component
 * @export {Object}
 * @class Dashboard
 * @extends {Component}
 */
class Dashboard extends Component {
  /**
* @description Fetches a user and user's businesses
* @param {any} props
* @returns {null} null
*/
  componentWillMount() {
    this.props.getOneUser(this.props.userId);
    this.props.getAUserBusiness(this.props.userId);
  }

  /**
   * @memberof Dashboard
   * @return {ReactElement} markup
   */
  render() {
    const {
      userId,
      businesses,
      currentUser,
      uploadProgress,
    } = this.props;

    return (
			<div className="paddingBottom">
				<DashboardPage
					userId={userId}
					businessList={businesses}
					isLoading={this.props.isLoading}
					currentUser={currentUser}
					uploadProgress={uploadProgress}
					updateUser={this.props.updateUser}
					addFlashMessage={this.props.addFlashMessage}
					loading={this.props.loading}
					setProgress={this.props.setProgress}
				/>
			</div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.authUser.user.id,
  currentUser: state.authUser.user,
  businesses: state.businesses.userBusiness,
  loading: state.authUser.isLoading,
  uploadProgress: state.authUser.uploadProgress
});

Dashboard.propTypes = {
  userId: PropTypes.number,
  getOneUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  businesses: PropTypes.array.isRequired,
  uploadProgress: PropTypes.number,
  loading: PropTypes.bool,
  isLoading: PropTypes.func.isRequired,
  setProgress: PropTypes.func.isRequired,
  getAUserBusiness: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  getOneUser, getAUserBusiness, updateUser, addFlashMessage, isLoading, setProgress
})(Dashboard);

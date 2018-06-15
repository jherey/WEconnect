import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardPage from './DashboardPage.jsx';
import { getOneUser, updateUser } from '../../actions/userActions';
import addFlashMessage from '../../actions/flashMessages';
import loading from '../../actions/loading';
import { setProgress, getAUserBusiness } from '../../actions/businessActions';

/**
 * @description User dashboard component
 * @export {Object}
 * @class  Dashboard
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

const mapStateToProps = state => ({
  userId: state.authUser.user.id,
  businesses: state.userBusinesses,
  currentUser: state.currentUser,
  isLoading: state.isLoading,
  uploadProgress: state.uploadProgress
});

Dashboard.propTypes = {
  userId: PropTypes.number,
  getOneUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  businesses: PropTypes.array.isRequired,
  uploadProgress: PropTypes.number,
  isLoading: PropTypes.bool,
  loading: PropTypes.func.isRequired,
  setProgress: PropTypes.func.isRequired,
  getAUserBusiness: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  getOneUser, getAUserBusiness, updateUser, addFlashMessage, loading, setProgress
})(Dashboard);

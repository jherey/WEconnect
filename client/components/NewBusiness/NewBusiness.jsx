import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NewBusinessForm from './NewBusinessForm.jsx';
import { createBusiness, setProgress } from '../../actions/businessActions';
import { isLoading } from '../../actions/userActions';
import addFlashMessage from '../../actions/flashMessages';

/**
 * @description Create new business component
 * @export {Object}
 * @class  NewBusiness
 * @extends {Component}
 */
class NewBusiness extends Component {
  /**
	* @memberof NewBusiness
	* @return {ReactElement} markup
	*/
  render() {
    const { uploadProgress } = this.props;
    return (
			<div>
				<NewBusinessForm
					loading={this.props.loading}
					createBusiness={this.props.createBusiness}
					addFlashMessage={this.props.addFlashMessage}
					isLoading={this.props.isLoading}
					setProgress={this.props.setProgress}
					uploadProgress={uploadProgress}
				/>
			</div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.authUser.isLoading,
  uploadProgress: state.authUser.uploadProgress
});

NewBusiness.propTypes = {
  createBusiness: PropTypes.func,
  loading: PropTypes.bool,
  addFlashMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.func.isRequired,
  uploadProgress: PropTypes.number,
  setProgress: PropTypes.func
};

export default connect(mapStateToProps, {
  createBusiness, addFlashMessage, setProgress, isLoading
})(NewBusiness);

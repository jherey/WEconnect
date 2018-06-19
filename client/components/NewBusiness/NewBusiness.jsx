import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NewBusinessForm from './NewBusinessForm.jsx';
import { createBusiness, setProgress } from '../../actions/businessActions';
import loading from '../../actions/loading';
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
    const { isLoading, uploadProgress } = this.props;
    return (
			<div>
				<NewBusinessForm
					loading={this.props.loading}
					createBusiness={this.props.createBusiness}
					addFlashMessage={this.props.addFlashMessage}
					isLoading={isLoading}
					setProgress={this.props.setProgress}
					uploadProgress={uploadProgress}
				/>
			</div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  uploadProgress: state.uploadProgress
});

NewBusiness.propTypes = {
  createBusiness: PropTypes.func,
  isLoading: PropTypes.bool,
  addFlashMessage: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  uploadProgress: PropTypes.number,
  setProgress: PropTypes.func
};

export default connect(mapStateToProps, {
  createBusiness, addFlashMessage, setProgress, loading
})(NewBusiness);

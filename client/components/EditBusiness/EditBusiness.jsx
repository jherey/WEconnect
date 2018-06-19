import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditBusinessForm from './EditBusinessForm.jsx';
import loading from '../../actions/loading';
import { updateBusiness, fetchBusiness, currentBusiness, setProgress } from '../../actions/businessActions';
import addFlashMessage from '../../actions/flashMessages';

/**
 * @description Edit business component
 * @export {Object}
 * @class  EditBusiness
 * @extends {Component}
 */
class EditBusiness extends Component {
  /**
* @description Fetches all businesses and reviews
* @param {any} props
* @returns {null} null
*/
  componentWillMount() {
    this.props.fetchBusiness(this.props.match.params.id);
  }

  /**
   * @memberof EditBusiness
   * @return {ReactElement} markup
   */
  render() {
    const { id } = this.props.match.params;
    const { getCurrentBusiness, isLoading, uploadProgress } = this.props;

    return (
			<div>
				<EditBusinessForm
					loading={this.props.loading}
					id={id}
					currentBusiness={getCurrentBusiness}
					fetchBusiness={this.props.fetchBusiness}
					updateBusiness={this.props.updateBusiness}
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
  getCurrentBusiness: state.currentBusiness,
  isLoading: state.isLoading,
  uploadProgress: state.uploadProgress
});

EditBusiness.propTypes = {
  match: PropTypes.object.isRequired,
  fetchBusiness: PropTypes.func.isRequired,
  updateBusiness: PropTypes.func.isRequired,
  getCurrentBusiness: PropTypes.object.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  deleteBusiness: PropTypes.func,
  setProgress: PropTypes.func,
  loading: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  uploadProgress: PropTypes.number
};

export default withRouter(connect(mapStateToProps, {
  currentBusiness, updateBusiness, fetchBusiness, addFlashMessage, loading, setProgress
})(EditBusiness));

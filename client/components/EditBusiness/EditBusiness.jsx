import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditBusinessForm from './EditBusinessForm.jsx';
import { isLoading } from '../../actions/userActions';
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
    console.log(this.props.match.params.id);
    this.props.fetchBusiness(this.props.match.params.id);
  }

  /**
   * @memberof EditBusiness
   * @return {ReactElement} markup
   */
  render() {
    const { id } = this.props.match.params;
    const { getCurrentBusiness, uploadProgress } = this.props;

    return (
			<div>
				{
          getCurrentBusiness ?
            (<EditBusinessForm
              loading={this.props.loading}
              id={id}
              currentBusiness={getCurrentBusiness}
              fetchBusiness={this.props.fetchBusiness}
              updateBusiness={this.props.updateBusiness}
              addFlashMessage={this.props.addFlashMessage}
              isLoading={this.props.isLoading}
              setProgress={this.props.setProgress}
              uploadProgress={uploadProgress}
            />) : ('loading')
        }
			</div>
    );
  }
}

const mapStateToProps = state => ({
  getCurrentBusiness: state.businesses.currentBusiness,
  loading: state.authUser.isLoading,
  uploadProgress: state.authUser.uploadProgress
});

EditBusiness.propTypes = {
  match: PropTypes.object.isRequired,
  fetchBusiness: PropTypes.func.isRequired,
  updateBusiness: PropTypes.func.isRequired,
  getCurrentBusiness: PropTypes.object.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  deleteBusiness: PropTypes.func,
  setProgress: PropTypes.func,
  isLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  uploadProgress: PropTypes.number
};

export default withRouter(connect(mapStateToProps, {
  currentBusiness, updateBusiness, fetchBusiness, addFlashMessage, isLoading, setProgress
})(EditBusiness));

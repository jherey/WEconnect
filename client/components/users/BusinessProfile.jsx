import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchBusiness, deleteBusiness } from '../../actions/businessActions';
import { fetchReviews, addReview, deleteReview, editReview } from '../../actions/reviewActions';
import BusinessProfilePage from '../pages/BusinessProfilePage.jsx';

let currentBusinessId, currentReviewId;

/**
 * @description Business profile component
 * @export {Object}
 * @class  BusinessProfile
 * @extends {Component}
 */
class BusinessProfile extends Component {
  /**
* @description Creates an instance of Business Profile Page
* @param {object} props
* @memberof BusinessProfilePage
*/
  constructor() {
    super();
    this.state = {
      review: '',
      starRating: 0,
      errors: '',
      editedReview: '',
      editedStarRating: 0,
      editing: null
    };
    this.onReviewChange = this.onReviewChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.setToDeleteReview = this.setToDeleteReview.bind(this);
    this.switchEditReview = this.switchEditReview.bind(this);
    this.onReviewDelete = this.onReviewDelete.bind(this);
    this.onEditChange = this.onEditChange.bind(this);
    this.onEditStarClick = this.onEditStarClick.bind(this);
    this.submitEditedReview = this.submitEditedReview.bind(this);
  }

  /**
* @description Fetches all businesses and reviews
* @param {any} props
* @returns {null} null
*/
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.fetchBusiness(id);
    this.props.fetchReviews(id);
  }

  /**
  * @returns {null} null
  * @param {event} event
  * @memberof EditBusinessForm
  */
  onEditChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description handles changes in review fields
   * @param {nextValue} nextValue
   * @returns {null} null
   * @memberof ReviewList
   */
  onEditStarClick(nextValue) {
    this.setState({ editedStarRating: nextValue });
  }

  /**
  * @returns {null} null
  * @param {object} review
  * @memberof Review
  */
  switchEditReview(review) {
    if (review) {
      this.setState({
        editing: review.id, editedReview: review.review, editedStarRating: review.star
      });
    } else {
      this.setState({ editing: null });
    }
  }

  /**
* @description handles changes in review fields
* @param {event} event
* @returns {null} null
* @memberof ReviewList
*/
  onReviewChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
* @returns {id} id
* @param {businessId} businessId
* @param {reviewId} reviewId
* @memberof Review
*/
  setToDeleteReview(businessId, reviewId) {
    currentBusinessId = businessId;
    currentReviewId = reviewId;
  }

  /**
 * @description deletes a review
 * @param {event} event
 * @returns {null} null
 * @memberof ReviewList
 */
  onReviewDelete() {
    const { deleteReviewAction } = this.props;
    deleteReviewAction(currentBusinessId, currentReviewId);
    document.getElementById('deleteReviewModal').click();
  }

  /**
* @description handles changes in review fields
* @param {nextValue} nextValue
* @returns {null} null
* @memberof ReviewList
*/
  onStarClick(nextValue) {
    this.setState({ starRating: nextValue });
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof ReviewList
*/
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ errors: '' });
    if (this.state.review.trim() === '' || this.state.starRating < 1) {
      return toastr.error('Please type a review and give a rating');
    }
    const { profilepic, sex } = this.props.authUser.user;
    this.props.addReview(this.props.currentBusiness.id, this.state, { profilepic, sex })
      .then(() => {
        this.setState({ starRating: 0 });
      });
  }

  /**
* @returns {null} null
* @param {*} event
* @memberof EditBusinessForm
*/
  submitEditedReview(event) {
    event.preventDefault();
    const { id: businessId } = this.props.match.params;
    const { editing: reviewId } = this.state;
    if (this.state.editedReview.trim() === '' || this.state.editedStarRating < 1) {
      return toastr.error('Please type a review and give a rating');
    }
    const { profilepic, sex } = this.props.authUser.user;
    this.props.editReview(businessId, reviewId, this.state, { profilepic, sex })
      .then(() => {
        this.setState({ editing: null });
      });
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof BusinessProfilePage
*/
  onDelete(event) {
    event.preventDefault();
    this.setState({ errors: '' });
    document.getElementById('deleteBtn').click();
    this.props.deleteBusiness(this.props.currentBusiness.id).then(() => {
      const { deleteSuccess } = this.props.business;
      if (deleteSuccess !== '') {
        this.context.router.history.push('/');
      }
    });
  }

  /**
   * @memberof BusinessProfile
   * @return {ReactElement} markup
   */
  render() {
    return (
			<div className="paddingBottom">
				<BusinessProfilePage
          id={this.props.currentBusiness.id}
          authUser={this.props.authUser}
          currentBusiness={this.props.currentBusiness}
          averageRating={this.props.averageRating}
					deleteBusiness={this.props.deleteBusiness}
          userId={this.props.userId}
          formDetails={this.state}
          onEditStarClick={this.onEditStarClick}
          onStarClick={this.onStarClick}
          onDelete={this.onDelete}
          editingReviewId={this.state.editing}
          switchEditReview={this.switchEditReview}
          onReviewChange={this.onReviewChange}
          handleSubmit={this.handleSubmit}
          reviews={this.props.reviews}
          setToDeleteReview={this.setToDeleteReview}
          onReviewDelete={this.onReviewDelete}
          submitEditedReview={this.submitEditedReview}
				/>
			</div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.authUser.user.id,
  authUser: state.authUser,
  currentBusiness: state.businesses.currentBusiness,
  averageRating: state.businesses.averageRating,
  loading: state.authUser.isLoading,
  business: state.businesses,
  reviews: state.reviews.reviews
});

BusinessProfile.contextTypes = {
  router: PropTypes.object.isRequired
};

BusinessProfile.propTypes = {
  business: PropTypes.object,
  authUser: PropTypes.object,
  match: PropTypes.object.isRequired,
  fetchBusiness: PropTypes.func,
  currentBusiness: PropTypes.object.isRequired,
  averageRating: PropTypes.number,
  id: PropTypes.number,
  deleteBusiness: PropTypes.func.isRequired,
  fetchReviews: PropTypes.func.isRequired,
  userId: PropTypes.number,
  addReview: PropTypes.func,
  switchEditReview: PropTypes.func,
  deleteReviewAction: PropTypes.func.isRequired,
  deleteSuccess: PropTypes.string,
  reviews: PropTypes.array,
  editReview: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  editReview,
  addReview,
  fetchBusiness,
  deleteBusiness,
  fetchReviews,
  deleteReviewAction: deleteReview
})(BusinessProfile);


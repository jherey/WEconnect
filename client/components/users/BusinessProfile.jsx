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
* @memberof BusinessProfile
*/
  constructor() {
    super();
    // Business profile initial state
    this.state = {
      review: '',
      starRating: 0,
      errors: '',
      editedReview: '',
      editedStarRating: 0,
      editing: null
    };
    // Bind functions
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
* @memberof BusinessProfile
* @returns {null} null
*/
  componentWillMount() {
    const { id } = this.props.match.params;
    const { fetchBusinessAction, fetchReviewsAction } = this.props;
    fetchBusinessAction(id);
    fetchReviewsAction(id);
  }

  /**
  * @returns {null} null
  * @param {event} event
  * @memberof BusinessProfile
  */
  onEditChange(event) {
    // Sets state of input fields to inputed values
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description handles changes in review fields
   * @param {nextValue} nextValue
   * @returns {null} null
   * @memberof BusinessProfile
   */
  onEditStarClick(nextValue) {
    this.setState({ editedStarRating: nextValue });
  }

  /**
  * @returns {null} null
  * @param {object} review
  * @memberof BusinessProfile
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
* @memberof BusinessProfile
*/
  onReviewChange(event) {
    // Sets state of input fields to inputed values
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
* @returns {id} id
* @param {businessId} businessId
* @param {reviewId} reviewId
* @memberof BusinessProfile
*/
  setToDeleteReview(businessId, reviewId) {
    currentBusinessId = businessId;
    currentReviewId = reviewId;
  }

  /**
 * @description deletes a review
 * @param {event} event
 * @returns {null} null
 * @memberof BusinessProfile
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
* @memberof BusinessProfile
*/
  onStarClick(nextValue) {
    // Sets state of starRating to new value
    this.setState({ starRating: nextValue });
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof BusinessProfile
*/
  handleSubmit(event) {
    event.preventDefault();
    const { review, starRating } = this.state;
    if (review.trim() === '' || starRating < 1) {
      return toastr.error('Please type a review and give a rating');
    }
    const { addReviewAction, currentBusiness } = this.props;
    const { profilepic, sex } = this.props.authUser.user;
    addReviewAction(currentBusiness.id, this.state, { profilepic, sex })
      .then(() => {
        this.setState({ starRating: 0 });
      });
  }

  /**
* @returns {null} null
* @param {*} event
* @memberof BusinessProfile
*/
  submitEditedReview(event) {
    event.preventDefault();
    const { id: businessId } = this.props.match.params;
    const { editing: reviewId } = this.state;
    if (this.state.editedReview.trim() === '' || this.state.editedStarRating < 1) {
      return toastr.error('Please type a review and give a rating');
    }
    const { editReviewAction } = this.props;
    const { profilepic, sex } = this.props.authUser.user;
    editReviewAction(businessId, reviewId, this.state, { profilepic, sex })
      .then(() => {
        this.setState({ editing: null });
      });
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof BusinessProfile
*/
  onDelete(event) {
    event.preventDefault();
    this.setState({ errors: '' });
    document.getElementById('deleteBtn').click();
    const { deleteBusinessAction } = this.props;
    deleteBusinessAction(this.props.currentBusiness.id).then(() => {
      const { deleteSuccess } = this.props.business;
      if (deleteSuccess !== '') {
        const { history } = this.context.router;
        toastr.success('Business deleted');
        history.push('/');
      }
    });
  }

  /**
   * @memberof BusinessProfile
   * @return {ReactElement} markup
   */
  render() {
    const {
      currentBusiness, authUser, averageRating, deleteBusinessAction, userId, reviews
    } = this.props;

    return (
			<div className="paddingBottom">
				<BusinessProfilePage
          id={currentBusiness.id}
          authUser={authUser}
          currentBusiness={currentBusiness}
          averageRating={averageRating}
					deleteBusiness={deleteBusinessAction}
          userId={userId}
          formDetails={this.state}
          onEditStarClick={this.onEditStarClick}
          onStarClick={this.onStarClick}
          onDelete={this.onDelete}
          editingReviewId={this.state.editing}
          switchEditReview={this.switchEditReview}
          onReviewChange={this.onReviewChange}
          handleSubmit={this.handleSubmit}
          reviews={reviews}
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

// Prop types for business profile page
BusinessProfile.propTypes = {
  business: PropTypes.object,
  authUser: PropTypes.object,
  match: PropTypes.object.isRequired,
  fetchBusinessAction: PropTypes.func,
  currentBusiness: PropTypes.object.isRequired,
  averageRating: PropTypes.number,
  id: PropTypes.number,
  deleteBusinessAction: PropTypes.func.isRequired,
  fetchReviewsAction: PropTypes.func.isRequired,
  userId: PropTypes.number,
  addReviewAction: PropTypes.func,
  switchEditReview: PropTypes.func,
  deleteReviewAction: PropTypes.func.isRequired,
  deleteSuccess: PropTypes.string,
  reviews: PropTypes.array,
  editReviewAction: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  editReviewAction: editReview,
  addReviewAction: addReview,
  fetchBusinessAction: fetchBusiness,
  deleteBusinessAction: deleteBusiness,
  fetchReviewsAction: fetchReviews,
  deleteReviewAction: deleteReview
})(BusinessProfile);


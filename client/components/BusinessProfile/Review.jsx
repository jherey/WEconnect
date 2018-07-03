import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';
import addFlashMessage from '../../actions/flashMessages';
import { isLoading } from '../../actions/userActions';
import { fetchReviews, editReview, deleteReview } from '../../actions/reviewActions';
import maleAvartar from '../../public/images/male-avatar.png';
import femaleAvartar from '../../public/images/female-avatar.png';

let currentBusinessId, currentReviewId;

/**
 * @description Review component
 * @export {Object}
 * @class  ReviewList
 * @extends {Component}
 */
class Review extends Component {
  /**
* @description Creates an instance of edit business form
* @param {object} props
* @memberof EditBusinessForm
*/
  constructor(props) {
    super(props);
    this.state = {
      editedReview: this.props.review.review,
      editedStarRating: this.props.review.star || 0,
      errors: ''
    };
    this.onEditChange = this.onEditChange.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
    this.setToEditReview = this.setToEditReview.bind(this);
    this.submitEditReview = this.submitEditReview.bind(this);
    // this.cancelEditReview = this.cancelEditReview.bind(this);
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
  onStarClick(nextValue) {
    this.setState({ editedStarRating: nextValue });
  }

  /**
* @returns {null} null
* @param {businessId} businessId
* @param {reviewId} reviewId
* @memberof Review
*/
  setToEditReview(businessId, reviewId) {
    currentBusinessId = businessId;
    currentReviewId = reviewId;
    const edit = document.getElementById(this.props.review.id);
    const edit1 = document.getElementById(this.props.review.id + 1);
    edit.classList.add('hide');
    edit1.classList.remove('hide');
  }

  /**
* @returns {null} null
* @memberof Review
*/
  cancelEditReview() {
    const edit = document.getElementById(this.props.review.id);
    const edit1 = document.getElementById(this.props.review.id + 1);
    edit1.classList.add('hide');
    edit.classList.remove('hide');
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof ReviewList
*/
  submitEditReview(event) {
    event.preventDefault();
    this.setState({ errors: '' });
    if (this.state.editedReview.trim() === '' || this.state.editedStarRating < 1) {
      return this.props.addFlashMessage({
        type: 'error',
        text: 'Please type a review and give a rating'
      });
    }
    this.props.editReview(currentBusinessId, currentReviewId, this.state)
      .then(
        () => {
          this.props.fetchReviews(this.props.review.id);
          this.props.addFlashMessage({
            type: 'success',
            text: 'Review updated'
          });
          this.setState({ editedStarRating: 0 });
        },
        (err) => {
          this.props.isLoading(false);
          this.props.addFlashMessage({
            type: 'error',
            text: err.response.data.message
          });
        }
      );
  }

  /**
 * @description deletes a review
 * @param {event} event
 * @returns {null} null
 * @memberof ReviewList
 */
  onDelete() {
    this.props.deleteReview(currentBusinessId, currentReviewId)
      .then(() => {
        this.props.addFlashMessage({
          type: 'success',
          text: 'Review successfully deleted!'
        });
      });
    document.getElementById('deleteReviewModal').click();
  }

  /**
* @returns {id} id
* @param {businessId} businessId
* @param {reviewId} reviewId
* @memberof Review
*/
  setToDelete(businessId, reviewId) {
    currentBusinessId = businessId;
    currentReviewId = reviewId;
  }

  /**
   * @memberof Review
   * @return {ReactElement} markup
   */
  render() {
    const { review, user } = this.props;

    let image;
    if (review.reviewer.profilepic) {
      image = review.reviewer.profilepic;
    } else if (review.reviewer.sex === 'male') {
      image = maleAvartar;
    } else {
      image = femaleAvartar;
    }

    return (
		<div className="row">
			<div className="col-lg-1 col-md-2 text-center">
				<img
					className="rounded-circle mt-2 img-responsive"
					src={image}
					alt="UserImage"
					style={{ width: '60px', height: '60px' }}
				/>
			</div>
			<div className="col-lg-11 col-md-10 separator">
				<strong className="mr-2">{review.username}</strong><br />
				<div id={review.id}>
					<div className="d-flex justify-content-between">
						<p className="mb-0">{review.review}</p>
						{
							user.user.id === review.userId ?
								<span>
									<i className="fa fa-edit edit" onClick={() => this.setToEditReview(review.businessId, review.id)}>
										<span className="hideText">Edit</span>
									</i>
									<i className="fa fa-trash delete" onClick={() => this.setToDelete(review.businessId, review.id)} data-toggle="modal" data-target="#deleteReviewModal">
										<span className="hideText">Delete</span>
									</i>
								</span>
							: null
						}

						{/* Delete modal class */}
						<div className="modal fade" id="deleteReviewModal" tabIndex="-1" role="dialog" aria-labelledby="deleteReviewModalLabel" aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="modalLabel">WeConnect</h5>
										<button id="deleteReviewBtn" type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										<div className="form-group">
											<p>Are you sure you want to delete this review?</p>
										</div>
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
										<button
											className="btn btn-danger"
											onClick={() => this.onDelete(review)}
										>
											Delete
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="star-component" className="d-flex justify-content-between">
						<StarRatingComponent
							name='rate1'
							starCount={5}
							value={review.star}
							starColor="#fd654d"
						/>
						{moment(review.createdAt).fromNow()}
					</div>
				</div>

				<form onSubmit={this.submitEditReview} className="hide" id={review.id + 1}>
					<div>
						<textarea
							placeholder="Write your review here!"
							className="form-control"
							value={this.state.editedReview}
							onChange={this.onEditChange}
							name='editedReview'
							rows="4"
						>
						</textarea>
					</div>
					<div style={{ fontSize: 25 }}>
						<StarRatingComponent
							name='rate1'
							starCount={5}
							value={this.state.editedStarRating}
							onStarClick={this.onStarClick}
							starColor='#fd654d'
						/>
					</div>
					<button className="btn btn-primary mr-2" type="submit">
						Edit Review
					</button>
					<button className="btn btn-danger" onClick={() => this.cancelEditReview()}>
						Cancel
					</button>
				</form>
			</div>
		</div>
    );
  }
}

Review.propTypes = {
  review: PropTypes.object,
  user: PropTypes.object.isRequired,
  deleteReview: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func
};

export default connect(null, {
  fetchReviews, editReview, deleteReview, addFlashMessage, isLoading
})(Review);
{ /* <div>
					<div className="d-flex justify-content-between">
						<p className="mb-0">{review.review}</p>
						{
							user.user.id === review.userId ?
								<span>
									<i className="fa fa-edit edit"></i>
									<i className="fa fa-trash" onClick={() => this.setToDelete(review.businessId, review.id)} data-toggle="modal" data-target="#deleteReviewModal"></i>
								</span>
							: null
						}

						{/* Delete modal class */ }
// 	<div className="modal fade" id="deleteReviewModal" tabIndex="-1" role="dialog" aria-labelledby="deleteReviewModalLabel" aria-hidden="true">
// 		<div className="modal-dialog" role="document">
// 			<div className="modal-content">
// 				<div className="modal-header">
// 					<h5 className="modal-title" id="modalLabel">WeConnect</h5>
// 					<button id="deleteReviewBtn" type="button" className="close" data-dismiss="modal" aria-label="Close">
// 						<span aria-hidden="true">&times;</span>
// 					</button>
// 				</div>
// 				<div className="modal-body">
// 					<div className="form-group">
// 						<p>Are you sure you want to delete this review?</p>
// 					</div>
// 				</div>
// 				<div className="modal-footer">
// 					<button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
// 					<button
// 						className="btn btn-danger"
// 						onClick={() => this.onDelete(review)}
// 					>
// 						Delete
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	</div>
// </div>
// <div id="star-component" className="d-flex justify-content-between">
// 	<StarRatingComponent
// 		name='rate1'
// 		starCount={5}
// 		value={review.star}
// 		starColor="#fd654d"
// 	/>
// 	{moment(review.createdAt).fromNow()}
// </div>
// </div> */}

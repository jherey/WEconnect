import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';
import EditReviewForm from './EditReviewForm';
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
      editing: null,
    };
    this.cancelEditReview = this.cancelEditReview.bind(this);
  }

  /**
  * @returns {null} null
  * @param {reviewId} reviewId
  * @memberof Review
  */
  setToEditReview(reviewId) {
    this.setState({ editing: reviewId });
  }

  /**
  * @returns {null} null
  * @memberof Review
  */
  cancelEditReview() {
    this.setState({
      editing: null
    });
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

    if (this.state.editing === review.id) {
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
						<span>
							<i className="fa fa-times edit pull-right" onClick={() => this.cancelEditReview()}>
								<span className="hideText">Cancel</span>
							</i>
						</span>
						<EditReviewForm
							review={review.review}
							star={review.star}
							reviewId={this.state.editing}
							businessId={review.businessId}
							addFlashMessage={this.props.addFlashMessage}
							editReview={this.props.editReview}
							fetchReviews={this.props.fetchReviews}
							isLoading={this.props.isLoading}
						/>
					</div>
				</div>
      );
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
				<div>
					<div className="d-flex justify-content-between">
						<p className="mb-0">{review.review}</p>
						{
							user.user.id === review.userId ?
								<span>
									<i className="fa fa-edit edit" data-toggle="tooltip" data-placement="top" title="Edit" onClick={() => this.setToEditReview(review.id)}></i>
									<i className="fa fa-trash delete" data-toggle="tooltip" data-placement="top" title="Delete" data-toggle="modal" data-target="#deleteReviewModal" onClick={() => this.setToDelete(review.businessId, review.id)}></i>
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
						{review.id}
						{moment(review.createdAt).fromNow()}
					</div>
				</div>
			</div>
		</div>
    );
  }
}

Review.propTypes = {
  review: PropTypes.object,
  user: PropTypes.object.isRequired,
  deleteReview: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func,
  editReview: PropTypes.func.isRequired,
  fetchReviews: PropTypes.func.isRequired,
  isLoading: PropTypes.func.isRequired
};

export default connect(null, {
  fetchReviews, editReview, deleteReview, addFlashMessage, isLoading
})(Review);

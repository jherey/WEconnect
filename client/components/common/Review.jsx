import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import StarRatingComponent from 'react-star-rating-component';
import EditReviewForm from '../forms/EditReviewForm.jsx';
import maleAvartar from '../../public/images/male-avatar.png';
import femaleAvartar from '../../public/images/female-avatar.png';

const Review = (props) => {
  const {
    submitEditedReview,
    formDetails,
    onEditStarClick,
    onReviewChange,
    review,
    user,
    editingReviewId,
    switchEditReview,
    onReviewDelete,
    setToDeleteReview
  } = props;

  let image;
  if (review.reviewer.profilepic) {
    image = review.reviewer.profilepic;
  } else if (review.reviewer.sex === 'male') {
    image = maleAvartar;
  } else {
    image = femaleAvartar;
  }

  if (editingReviewId === review.id) {
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
						<i className="fa fa-times edit pull-right" onClick={() => switchEditReview()}>
							<span className="hideText">Cancel</span>
						</i>
					</span>
					<EditReviewForm
						review={review}
						reviewId={editingReviewId}
						businessId={review.businessId}
						onReviewChange={onReviewChange}
						submitEditedReview={submitEditedReview}
						onEditStarClick={onEditStarClick}
						formDetails={formDetails}
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
									<i
										className="fa fa-edit edit"
										data-toggle="tooltip"
										data-placement="top"
										title="Edit"
										onClick={() => switchEditReview(review)}
									></i>
									<i
										className="fa fa-trash delete"
										data-toggle="tooltip"
										data-placement="top"
										title="Delete"
										data-toggle="modal"
										data-target="#deleteReviewModal"
										onClick={() => setToDeleteReview(review.businessId, review.id)}
									>
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
											onClick={onReviewDelete}
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
			</div>
		</div>
  );
};

Review.propTypes = {
  review: PropTypes.object,
  user: PropTypes.object.isRequired,
  editingReviewId: PropTypes.number,
  setToDeleteReview: PropTypes.func.isRequired,
  editReview: PropTypes.func,
  onReviewChange: PropTypes.func.isRequired,
  onReviewDelete: PropTypes.func.isRequired,
  switchEditReview: PropTypes.func.isRequired,
  submitEditedReview: PropTypes.func.isRequired,
  onEditStarClick: PropTypes.func.isRequired,
  formDetails: PropTypes.object
};

export default Review;

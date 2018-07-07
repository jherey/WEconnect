import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Review from '../common/Review.jsx';

const ReviewList = ({
  onReviewChange,
  formDetails,
  onEditStarClick,
  submitEditedReview,
  reviews,
  user,
  editingReviewId,
  switchEditReview,
  onReviewDelete,
  setToDeleteReview
}) => {
  const noReviews = (<h5 className="details-margin">No reviews for this business</h5>);

  const reviewComponent = reviews.map(review => (
    <div className="container" key={review.id}>
      <Review
        review={review}
        user={user}
        onReviewChange={onReviewChange}
        onReviewDelete={onReviewDelete}
        editingReviewId={editingReviewId}
        setToDeleteReview={setToDeleteReview}
        switchEditReview={switchEditReview}
        submitEditedReview={submitEditedReview}
        onEditStarClick={onEditStarClick}
        formDetails={formDetails}
      />
      <hr />
    </div>
  ));

  return (
    <div>
      <h3 className="business">Reviews</h3>
      <hr />
      {reviews.length === 0 ? noReviews : reviewComponent}
      {
        !user.isAuthenticated ?
        <p><Link to="/signin">Sign In</Link> to review this business<span></span></p>
        : null
      }
    </div>
  );
};

ReviewList.propTypes = {
  id: PropTypes.number,
  user: PropTypes.object.isRequired,
  reviews: PropTypes.array,
  editingReviewId: PropTypes.number,
  onReviewChange: PropTypes.func.isRequired,
  setToDeleteReview: PropTypes.func.isRequired,
  onReviewDelete: PropTypes.func.isRequired,
  switchEditReview: PropTypes.func.isRequired,
  submitEditedReview: PropTypes.func.isRequired,
  onEditStarClick: PropTypes.func.isRequired,
  formDetails: PropTypes.object
};

export default ReviewList;

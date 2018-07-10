import React from 'react';
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';

// Edit review component
const EditReviewForm = ({
  // Destructure props
  onReviewChange, submitEditedReview, onEditStarClick, formDetails
}) => (
  <div>
    <form onSubmit={submitEditedReview}>
      <div>
        <textarea
          placeholder="Write your review here!"
          className="form-control"
          value={formDetails.editedReview}
          onChange={onReviewChange}
          name='editedReview'
          rows="3"
        >
        </textarea>
      </div>
      <div style={{ fontSize: 25 }}>
        <StarRatingComponent
          name='edit'
          starCount={5}
          value={formDetails.editedStarRating}
          onStarClick={onEditStarClick}
          starColor='#fd654d'
        />
      </div>
      {/* Submit button to edit a review */}
      <button className="btn btn-primary mr-2" type="submit">
        Edit Review
      </button>
    </form>
  </div>
);

// Edit review proptypes
EditReviewForm.propTypes = {
  review: PropTypes.object.isRequired,
  star: PropTypes.number,
  businessId: PropTypes.number.isRequired,
  reviewId: PropTypes.number.isRequired,
  submitEditedReview: PropTypes.func.isRequired,
  onReviewChange: PropTypes.func.isRequired,
  onEditStarClick: PropTypes.func.isRequired,
  formDetails: PropTypes.object
};

export default EditReviewForm;

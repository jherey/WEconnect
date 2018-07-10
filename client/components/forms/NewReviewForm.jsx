import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';

const NewReviewForm = ({
  // Destructure props
  onReviewChange, starRating, onStarClick, handleSubmit
}) => (
  // Return form
  <form onSubmit={handleSubmit}>
  <div>
    <textarea
      placeholder="Write your review here!"
      className="form-control"
      onChange={onReviewChange}
      name='review'
      rows="4"
    >
    </textarea>
  </div>
  <div style={{ fontSize: 25 }}>
    {/* Component that displays star rating */}
    <StarRatingComponent
      name='rate1'
      starCount={5}
      value={starRating}
      onStarClick={onStarClick}
      starColor='#fd654d'
    />
  </div>
  {/* Button to submit a review */}
  <button className="btn btn-primary" type="submit" >
    Post Review
  </button>
</form>
);

// Proptypes for new review form
NewReviewForm.propTypes = {
  onReviewChange: PropTypes.func.isRequired,
  starRating: PropTypes.number,
  onStarClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default NewReviewForm;

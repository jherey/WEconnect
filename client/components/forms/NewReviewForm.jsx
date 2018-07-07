import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';

const NewReviewForm = ({
  onReviewChange, starRating, onStarClick, handleSubmit
}) => (
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
    <StarRatingComponent
      name='rate1'
      starCount={5}
      value={starRating}
      onStarClick={onStarClick}
      starColor='#fd654d'
    />
  </div>
  <button className="btn btn-primary" type="submit" >
    Post Review
  </button>
</form>
);

NewReviewForm.propTypes = {
  onReviewChange: PropTypes.func.isRequired,
  starRating: PropTypes.number,
  onStarClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default NewReviewForm;

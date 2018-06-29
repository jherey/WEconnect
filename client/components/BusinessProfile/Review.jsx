import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import StarRatingComponent from 'react-star-rating-component';
import maleAvartar from '../../public/images/male-avatar.png';
import femaleAvartar from '../../public/images/female-avatar.png';

const Review = ({ review }) => {
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
				<p className="mb-0">{review.review}</p>
				<div id="star-component" className="d-flex justify-content-between">
					<StarRatingComponent
						name='rate1'
						starCount={5}
						value={review.star}
						starColor="#fd654d"
					/>
					<span id="review-createdTime">
						{moment(review.createdAt).fromNow()}
					</span>
				</div>
			</div>
		</div>
  );
};

Review.propTypes = {
  review: PropTypes.object
};

export default Review;

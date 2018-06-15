import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import starRating from './starRating.jsx';
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
			<div className="col-lg-11 col-md-10">
				<p>
					<strong className="mr-2">{review.username}</strong>
					{starRating(review.star)}
					<span id="review-createdTime" className="ml-2">
						{moment(review.createdAt).format('Do MMMM YYYY HH:mm')}
					</span>
				</p>
				<p>{review.review}</p>
			</div>
		</div>
  );
};

Review.propTypes = {
  review: PropTypes.object
};

export default Review;

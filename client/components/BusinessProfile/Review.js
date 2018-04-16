import React from 'react';
import { Link } from 'react-router-dom';

const Review = ({ username, review }) => {
	return (
		<div className="row">
			<div className="col-lg-1 text-center">
				<img src={require('../../public/images/ppic.jpg')} />
			</div>
			<div className="col-lg-11">
				<p><strong>{username}</strong></p>
				<p>{review}</p>
			</div>
			<hr />
		</div>
	);
}

export default Review;
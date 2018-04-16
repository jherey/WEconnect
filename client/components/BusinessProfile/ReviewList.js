import React, { Component } from 'react';
import Review from './Review.js';

class ReviewList extends Component {
	render() {
		const { reviews } = this.props;
		const reviewComponent = reviews.map(review => {
			return (
				<Review
					key={review.id}
					username={review.username}
					review={review.review}
				/>
			);
		});

		return (
			<div>
				<h3 className="text-center rev">REVIEWS</h3>
				{reviewComponent}
				<div className="text-center">
					<button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
						Add Review
						</button>
				</div>

				<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">Write Review</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<div className="form-group">
									<label htmlFor="comment" id="col">Review:</label>
									<textarea className="form-control" rows="5" id="review"></textarea>
								</div>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
								<button type="button" className="btn btn-primary">Save review</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ReviewList;

import React, { Component } from 'react';
import Review from './Review.js';
import { connect } from 'react-redux';
import { addReview } from '../../actions/reviewActions';
import { addFlashMessage } from '../../actions/flashMessages';

class ReviewList extends Component {
	constructor() {
		super();
		this.state = {
			review: '',
			errors: '',
			isLoading: ''
		}

		this.onReviewChange = this.onReviewChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	onReviewChange(e) {
		this.setState({ review: e.target.value })
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({ errors: '', isLoading: true });
		this.props.addReview(this.props.id, this.state).then(
			() => {
				document.getElementById("hidePopUpBtn").click();
				this.props.addFlashMessage({
					type: 'success',
					text: 'Review posted'
				});
			},
			(data) => this.setState({ errors: data.response.data.message, isLoading: false })
		);
		this.setState({ review: '' });
	}

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
								<h5 className="modal-title" id="exampleModalLabel">Add Review</h5>
								<button id="hidePopUpBtn" type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<form onSubmit={this.handleSubmit}>
								<div className="modal-body">
									<div className="form-group">
										<label htmlFor="comment" id="col">Review:</label>
										<textarea
											onChange={this.onReviewChange}
											name='review'
											className="form-control"
											rows="5"
											id="review"
										>
										</textarea>
									</div>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
									<button type="submit" className="btn btn-primary">Save review</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null, { addReview, addFlashMessage })(ReviewList);

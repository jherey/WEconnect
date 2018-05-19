import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Review from './Review';
import Spinner from '../Spinner';
import { connect } from 'react-redux';
import { addReview } from '../../actions/reviewActions';
import loading from '../../actions/loading';
import addFlashMessage from '../../actions/flashMessages';

class ReviewList extends Component {
	constructor() {
		super();
		this.state = {
			review: '',
			errors: ''
		}
		this.onReviewChange = this.onReviewChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	onReviewChange(e) {
		this.setState({ review: e.target.value })
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({ errors: '' });
		document.getElementById("hidePopUpBtn").click();
		this.props.addReview(this.props.id, this.state)
			.then(
				() => {
					this.setState({ review: '' });
					this.props.addFlashMessage({
						type: 'success',
						text: 'Review posted'
					});
				},
				(err) => {
					this.props.loading(false);
					this.setState({ errors: err.response.data.message });
				}
			);
	}

	render() {
		const { reviews, isLoading, user, allUsers } = this.props;

		const noReviews = (
			<h5 className="details-margin">No reviews for this business</h5>
		);

		const reviewComponent = reviews.map(review => {
			return (
				<Review
					key={review.id}
					username={review.username}
					review={review.review}
					allUsers={allUsers}
				/>
			);
		});

		if (isLoading) { return <Spinner />; }

		return (
			<div>
				{reviews.length === 0 ? noReviews : reviewComponent}
				{
					user
					?
					<div>
						<button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
							Add Review
						</button>
					</div>
					:
					<p><Link to="/signin">Sign In</Link> To Add Review</p>
				}

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

function mapStateToProps(state) {
	return {
		isLoading: state.isLoading,
		user: state.authUser.isAuthenticated
	}
}

export default connect(mapStateToProps, { addReview, addFlashMessage, loading })(ReviewList);

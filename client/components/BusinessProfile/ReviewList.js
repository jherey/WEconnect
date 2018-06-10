import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Review from './Review';
import Spinner from '../Spinner';
import { connect } from 'react-redux';
import { addReview } from '../../actions/reviewActions';
import loading from '../../actions/loading';
import addFlashMessage from '../../actions/flashMessages';
import { fetchReviews } from '../../actions/reviewActions';

class ReviewList extends Component {
	constructor() {
		super();
		this.state = {
			review: '',
			star: '',
			errors: ''
		}
		this.onReviewChange = this.onReviewChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	
	onReviewChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({ errors: '' });
		this.props.addReview(this.props.id, this.state)
			.then(
				() => {
					this.props.fetchReviews(this.props.id);
					this.props.addFlashMessage({
						type: 'success',
						text: 'Review posted'
					});
				},
				(err) => {
					this.props.loading(false);
					this.props.addFlashMessage({
						type: 'error',
						text: err.response.data.message
					});
				}
			);
	}

	render() {
		const { reviews, isLoading, user } = this.props;		

		const noReviews = (
			<h5 className="details-margin">No reviews for this business</h5>
		);

		const reviewComponent = reviews.map(review => {
			return (
				<div className="container" key={review.id}>
					<Review review={review} />
				</div>
			);
		});

		if (isLoading) { return <Spinner />; }

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div className="row">
						<div className="col-lg-9">
							<textarea
								placeholder="Write your review here!"
								className="form-control"
								onChange={this.onReviewChange}
								name='review'
								rows="4"
							>
							</textarea>
						</div>
						<div className="col-lg-3">
							<fieldset
								className="starRating"
								value={this.state.rating}
								onChange={this.onReviewChange}
								>
								<label htmlFor="5" />
								<input type="radio" id="5" name="star" value={5} />
								<label htmlFor="4" />
								<input type="radio" id="4" name="star" value={4} />
								<label htmlFor="3" />
								<input type="radio" id="3" name="star" value={3} />
								<label htmlFor="2" />
								<input type="radio" id="2" name="star" value={2} />
								<label htmlFor="1" />
								<input type="radio" id="1" name="star" value={1} />
							</fieldset>
						</div>
					</div><br />
					<button className="btn btn-primary" type="submit" >
						Post Review
					</button><br/>
				</form>
						
				<h3 className="business">Reviews</h3>
				<hr />
				{reviews.length === 0 ? noReviews : reviewComponent}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		isLoading: state.isLoading,
		user: state.authUser.isAuthenticated,
		reviews: state.reviews
	}
}

export default connect(mapStateToProps, { fetchReviews, addReview, addFlashMessage, loading })(ReviewList);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import Review from './Review.jsx';
import { isLoading } from '../../actions/userActions';
import addFlashMessage from '../../actions/flashMessages';
import { fetchReviews, addReview } from '../../actions/reviewActions';

/**
 * @description Review list component
 * @export {Object}
 * @class  ReviewList
 * @extends {Component}
 */
class ReviewList extends Component {
/**
* @description Creates an instance of ReviewList
* @param {object} props
* @memberof ReviewList
*/
  constructor() {
    super();
    this.state = {
      review: '',
      starRating: 0,
      errors: ''
    };
    this.onReviewChange = this.onReviewChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
  }

  /**
 * @description handles changes in review fields
 * @param {event} event
 * @returns {null} null
 * @memberof ReviewList
 */
  onReviewChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 * @description handles changes in review fields
 * @param {nextValue} nextValue
 * @returns {null} null
 * @memberof ReviewList
 */
  onStarClick(nextValue) {
    this.setState({ starRating: nextValue });
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof ReviewList
*/
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ errors: '' });
    if (this.state.review.trim() === '' || this.state.starRating < 1) {
      return this.props.addFlashMessage({
        type: 'error',
        text: 'Please type a review and give a rating'
      });
    }
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
          this.props.isLoading(false);
          this.props.addFlashMessage({
            type: 'error',
            text: err.response.data.message
          });
        }
      );
  }

  /**
   * @memberof ReviewList
   * @return {ReactElement} markup
   */
  render() {
    const { reviews, user } = this.props;

    const noReviews = (<h5 className="details-margin">No reviews for this business</h5>);

    const reviewComponent = reviews.map(review => (
			<div className="container" key={review.id}>
				<Review review={review} />
        <hr />
			</div>
    ));

    return (
			<div>
				<form onSubmit={this.handleSubmit}>
					{/* <div> */}
						<div>
							<textarea
								placeholder="Write your review here!"
								className="form-control"
								onChange={this.onReviewChange}
								name='review'
								rows="4"
							>
							</textarea>
						</div>
            <div style={{ fontSize: 25 }}>
              <StarRatingComponent
                name='rate1'
                starCount={5}
                value={this.state.starRating}
                onStarClick={this.onStarClick}
                starColor='#fd654d'
              />
            </div>
					{/* </div> */}
					<button className="btn btn-primary" type="submit" >
						Post Review
					</button>
				</form>

				<h3 className="business">Reviews</h3>
				<hr />
        {reviews.length === 0 ? noReviews : reviewComponent}
        {
          !user ?
					<p><Link to="/signin">Sign In</Link> to review this business<span></span></p>
          : null }
			</div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.authUser.isLoading,
  user: state.authUser.isAuthenticated,
  reviews: state.reviews.reviews
});

ReviewList.propTypes = {
  addReview: PropTypes.func.isRequired,
  fetchReviews: PropTypes.func.isRequired,
  id: PropTypes.string,
  user: PropTypes.bool.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  isLoading: PropTypes.func.isRequired,
  reviews: PropTypes.array
};

export default connect(mapStateToProps, {
  fetchReviews, addReview, addFlashMessage, isLoading
})(ReviewList);

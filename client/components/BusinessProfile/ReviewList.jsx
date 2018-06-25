import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
      star: '',
      errors: ''
    };
    this.onReviewChange = this.onReviewChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
* @returns {null} null
* @param {event} event
* @memberof ReviewList
*/
  handleSubmit(event) {
    event.preventDefault();
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
    const { reviews } = this.props;

    const noReviews = (<h5 className="details-margin">No reviews for this business</h5>);

    const reviewComponent = reviews.map(review => (
			<div className="container" key={review.id}>
				<Review review={review} />
			</div>
    ));

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

const mapStateToProps = state => ({
  isLoading: state.authUser.isLoading,
  user: state.authUser.isAuthenticated,
  reviews: state.reviews.reviews
});

ReviewList.propTypes = {
  addReview: PropTypes.func.isRequired,
  fetchReviews: PropTypes.func.isRequired,
  id: PropTypes.string,
  addFlashMessage: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  isLoading: PropTypes.func.isRequired,
  reviews: PropTypes.array
};

export default connect(mapStateToProps, {
  fetchReviews, addReview, addFlashMessage, isLoading
})(ReviewList);

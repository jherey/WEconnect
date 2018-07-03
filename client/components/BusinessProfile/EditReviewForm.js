import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';

/**
 * @description Review component
 * @export {Object}
 * @class  EditReviewForm
 * @extends {Component}
 */
class EditReviewForm extends Component {
  /**
* @description Creates an instance of edit business form
* @param {object} props
* @memberof EditBusinessForm
*/
  constructor() {
    super();
    this.state = {
      editedReview: '',
      editedStarRating: 0,
      errors: ''
    };
    this.onEditChange = this.onEditChange.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
    this.submitEditReview = this.submitEditReview.bind(this);
  }

  /**
   * @description Sets state to edit review
   * @returns {null} null
   * @memberof EditReviewForm
   */
  componentDidMount() {
    this.setState({
      editedReview: this.props.review,
      editedStarRating: this.props.star,
    });
  }

  /**
  * @returns {null} null
  * @param {event} event
  * @memberof EditBusinessForm
  */
  onEditChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description handles changes in review fields
   * @param {nextValue} nextValue
   * @returns {null} null
   * @memberof ReviewList
   */
  onStarClick(nextValue) {
    this.setState({ editedStarRating: nextValue });
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof EditBusinessForm
*/
  submitEditReview(event) {
    event.preventDefault();
    this.setState({ errors: '' });
    if (this.state.editedReview.trim() === '' || this.state.editedStarRating < 1) {
      return this.props.addFlashMessage({
        type: 'error',
        text: 'Please type a review and give a rating'
      });
    }
    this.props.editReview(this.props.businessId, this.props.reviewId, this.state)
      .then(
        () => {
          this.props.fetchReviews(this.props.businessId);
          this.props.addFlashMessage({
            type: 'success',
            text: 'Review updated'
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
   * @memberof Review
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div>
        <form onSubmit={this.submitEditReview}>
					<div>
						<textarea
							placeholder="Write your review here!"
							className="form-control"
							value={this.state.editedReview}
							onChange={this.onEditChange}
							name='editedReview'
							rows="3"
						>
						</textarea>
					</div>
					<div style={{ fontSize: 25 }}>
						<StarRatingComponent
							name='rate1'
							starCount={5}
							value={this.state.editedStarRating}
							onStarClick={this.onStarClick}
							starColor='#fd654d'
						/>
					</div>
					<button className="btn btn-primary mr-2" type="submit">
						Edit Review
					</button>
				</form>
      </div>
    );
  }
}

EditReviewForm.propTypes = {
  review: PropTypes.string.isRequired,
  star: PropTypes.number.isRequired,
  businessId: PropTypes.number.isRequired,
  reviewId: PropTypes.number.isRequired,
  addFlashMessage: PropTypes.func,
  editReview: PropTypes.func.isRequired,
  fetchReviews: PropTypes.func.isRequired,
  isLoading: PropTypes.func.isRequired
};

export default EditReviewForm;

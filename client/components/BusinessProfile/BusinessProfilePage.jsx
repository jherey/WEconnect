import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';
import ReviewList from './ReviewList.jsx';
import Spinner from '../Spinner/index.jsx';
import addFlashMessage from '../../actions/flashMessages';
import { fetchReviews, addReview } from '../../actions/reviewActions';
import imageAvatar from '../../public/images/business-avatar.png';

/**
 * @description Business profile page component
 * @export {Object}
 * @class  BusinessProfilePage
 * @extends {Component}
 */
class BusinessProfilePage extends Component {
  /**
* @description Creates an instance of Business Profile Page
* @param {object} props
* @memberof BusinessProfilePage
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
* @description Fetches all businesses and reviews
* @param {any} props
* @returns {null} null
*/
  componentWillMount() {
    this.props.fetchBusiness(this.props.id);
    this.props.fetchReviews(this.props.id);
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
          this.setState({ starRating: 0 });
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
* @returns {null} null
* @param {event} event
* @memberof BusinessProfilePage
*/
  onClick(event) {
    event.preventDefault();
    this.setState({ errors: '' });
    document.getElementById('deleteBtn').click();
    this.props.deleteBusiness(this.props.id)
      .then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'Business deleted successfully'
          });
          this.context.router.history.push('/');
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
   * @memberof BusinessProfilePage
   * @return {ReactElement} markup
   */
  render() {
    const {
      currentBusiness, id, userId, loading, averageRating
    } = this.props;

    if (loading) {
      return (
				<div style={{ marginTop: '10%', textAlign: 'center' }}>
					<Spinner />
				</div>
      );
    }

    return (
			<div className="businesses">
				<div className="container list">
					<img id="businessImage"
						src={!currentBusiness.businessImage ? imageAvatar : currentBusiness.businessImage}
						alt="Business Image"
					/><br/>
					<h1 className="businessName">{currentBusiness.businessName}</h1>
					<div className="details"><br/>
						<div className="row">
							{currentBusiness.businessInfo}
						</div><br/>
						{
							averageRating > 0 ?
							<div style={{ fontSize: 25 }}>
								<StarRatingComponent
									name='rate1'
									starCount={5}
									value={averageRating}
									starColor="#fd654d"
								/>
							</div> : null
						}
						<div className="row">
							<div className="col-md-7">
								<div className="mr-3 address">
									<i className="fa fa-map-marker fa-lg"></i>
								</div>
								<div className="address">
									<h5>{currentBusiness.address} {currentBusiness.location}</h5>
								</div>
							</div>
							<div className="col-md-5">
								<div className="mr-3 address">
									<i className="fa fa-envelope fa-lg"></i>
								</div>
								<div className="address">
									<h5>{currentBusiness.email}</h5>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-7">
								<div className="mr-3 address">
									<i className="fa fa-sitemap fa-lg"></i>
								</div>
								<div className="address">
									<h5>{currentBusiness.category}</h5>
								</div>
							</div>
							{
								currentBusiness.website ?
									<div className="col-md-5">
										<div className="mr-3 address">
											<i className="fa fa-globe fa-lg"></i>
										</div>
										<div className="address">
											<h5>{currentBusiness.website}</h5>
										</div>
								</div>
								: null
							}
						</div>
						{
							currentBusiness.userId === userId
							?
								<div style={{ display: 'inline-block', float: 'right' }}>
									<Link to={`/${id}/edit`} className="btn btn-primary mr-2"> Edit</Link>
									<button className="btn btn-danger" data-toggle="modal" data-target="#deleteModal">
										Delete
									</button>
								</div>
							: null
						}
						<br /><br />
						<hr />

						{/* Form to post review */}
						<form onSubmit={this.handleSubmit}>
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
							<button className="btn btn-primary" type="submit" >
								Post Review
							</button>
						</form>

						<ReviewList id={id} />
					</div>
				</div>

				{/* Delete modal class */}
				<div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">WeConnect</h5>
								<button id="deleteBtn" type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<div className="form-group">
									<p>Are you sure you want to delete this business?</p>
								</div>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
								<button
									className="btn btn-danger"
									onClick={this.onClick.bind(this)}
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
    );
  }
}

BusinessProfilePage.contextTypes = {
  router: PropTypes.object.isRequired
};

BusinessProfilePage.propTypes = {
  currentBusiness: PropTypes.object.isRequired,
  fetchBusiness: PropTypes.func.isRequired,
  addReview: PropTypes.func.isRequired,
  averageRating: PropTypes.number,
  id: PropTypes.string.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  deleteBusiness: PropTypes.func.isRequired,
  isLoading: PropTypes.func.isRequired,
  fetchReviews: PropTypes.func.isRequired,
  userId: PropTypes.number,
  loading: PropTypes.bool
};

export default connect(null, { addFlashMessage, fetchReviews, addReview })(BusinessProfilePage);

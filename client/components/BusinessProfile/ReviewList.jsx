import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Review from './Review.jsx';
import { isLoading } from '../../actions/userActions';

/**
 * @description Review list component
 * @export {Object}
 * @class  ReviewList
 * @extends {Component}
 */
class ReviewList extends Component {
  /**
   * @memberof ReviewList
   * @return {ReactElement} markup
   */
  render() {
    const { reviews, user } = this.props;

    const noReviews = (<h5 className="details-margin">No reviews for this business</h5>);

    const reviewComponent = reviews.map(review => (
			<div className="container" key={review.id}>
				<Review review={review} user={user}/>
        <hr />
			</div>
    ));

    return (
			<div>
				<h3 className="business">Reviews</h3>
				<hr />
        {reviews.length === 0 ? noReviews : reviewComponent}
        {
          !user.isAuthenticated ?
					<p><Link to="/signin">Sign In</Link> to review this business<span></span></p>
          : null
        }
			</div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.authUser.isLoading,
  user: state.authUser,
  reviews: state.reviews.reviews
});

ReviewList.propTypes = {
  id: PropTypes.string,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  isLoading: PropTypes.func.isRequired,
  reviews: PropTypes.array
};

export default connect(mapStateToProps, {
  isLoading
})(ReviewList);

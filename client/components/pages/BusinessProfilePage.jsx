import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';
import ReviewList from '../pages/ReviewList.jsx';
import NewReviewForm from '../forms/NewReviewForm.jsx';
import Spinner from '../common/Spinner.jsx';
import imageAvatar from '../../public/images/business-avatar.png';

const BusinessProfilePage = ({
  // Destructure props
  currentBusiness,
  id,
  userId,
  onStarClick,
  handleSubmit,
  averageRating,
  authUser,
  onDelete,
  onReviewChange,
  reviews,
  editingReviewId,
  switchEditReview,
  setToDeleteReview,
  onReviewDelete,
  submitEditedReview,
  onEditStarClick,
  formDetails
}) => {
  const { starRating } = formDetails;

  // If page is loading, display spinner
  if (authUser.isLoading) {
    return (
			<div style={{ marginTop: '10%', textAlign: 'center' }}>
				<Spinner />
			</div>
    );
  }

  // Destructure currentBusiness
  const {
    businessImage,
    businessName,
    businessInfo,
    address,
    location,
    email,
    category,
    website
  } = currentBusiness;

  return (
		<div className="businesses">
			<div className="container list">
				<img id="businessImage"
					// Business image
					src={!businessImage ? imageAvatar : businessImage}
					alt="Business Image"
				/><br/>
				<h1 className="businessName">{businessName}</h1>
				<div className="details"><br/>
					<div className="row">
						{/* Business description */}
						{businessInfo}
					</div><br/>
					{
						averageRating > 0 ?
						<div style={{ fontSize: 25 }}>
							{/* Rating component */}
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
								{/* Business address and location */}
								<h5>{address} {location}</h5>
							</div>
						</div>
						<div className="col-md-5">
							<div className="mr-3 address">
								<i className="fa fa-envelope fa-lg"></i>
							</div>
							<div className="address">
								{/* Business email */}
								<h5>{email}</h5>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-7">
							<div className="mr-3 address">
								<i className="fa fa-sitemap fa-lg"></i>
							</div>
							<div className="address">
								{/* Business category */}
								<h5>{category}</h5>
							</div>
						</div>
						{
							website ?
								<div className="col-md-5">
									<div className="mr-3 address">
										<i className="fa fa-globe fa-lg"></i>
									</div>
									<div className="address">
										<h5>{website}</h5>
									</div>
							</div>
							: null
						}
					</div>
					{
						// Display delete and edit button if user is owner of business
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
					<NewReviewForm
						onReviewChange={onReviewChange}
						starRating={starRating}
						onStarClick={onStarClick}
						handleSubmit={handleSubmit}
					/>
					{/* Review list component */}
					<ReviewList
						id={id}
						user={authUser}
						reviews={reviews}
						onEditStarClick={onEditStarClick}
						onReviewChange={onReviewChange}
						setToDeleteReview={setToDeleteReview}
						onReviewDelete={onReviewDelete}
						editingReviewId={editingReviewId}
						switchEditReview={switchEditReview}
						submitEditedReview={submitEditedReview}
						formDetails={formDetails}
					/>
				</div>
			</div>

			{/* Delete review modal class */}
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
							{/* Button to delete a business */}
							<button
								className="btn btn-danger"
								onClick={onDelete}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
  );
};

BusinessProfilePage.contextTypes = {
  router: PropTypes.object.isRequired
};

// Prop types for business profile page
BusinessProfilePage.propTypes = {
  formDetails: PropTypes.object.isRequired,
  currentBusiness: PropTypes.object.isRequired,
  addReview: PropTypes.func,
  averageRating: PropTypes.number,
  id: PropTypes.number,
  deleteBusiness: PropTypes.func.isRequired,
  fetchReviews: PropTypes.func,
  userId: PropTypes.number,
  authUser: PropTypes.object,
  reviews: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  onStarClick: PropTypes.func.isRequired,
  onReviewChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  editingReviewId: PropTypes.number,
  setToDeleteReview: PropTypes.func.isRequired,
  onReviewDelete: PropTypes.func.isRequired,
  switchEditReview: PropTypes.func.isRequired,
  submitEditedReview: PropTypes.func.isRequired,
  onEditStarClick: PropTypes.func.isRequired
};

export default BusinessProfilePage;

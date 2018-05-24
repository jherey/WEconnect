import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReviewList from './ReviewList';
import Spinner from '../Spinner';

class BusinessProfilePage extends Component {
	constructor() {
		super();
		this.state = {
			errors: ''
		}
	}

	componentWillMount() {
		this.props.fetchBusiness(this.props.id);
		this.props.fetchReviews(this.props.id);
	}

	onClick(e) {
		this.setState({ errors: '' });
		document.getElementById("deleteBtn").click();
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
					this.props.loading(false);
					this.props.addFlashMessage({
						type: 'error',
						text: err.response.data.message
					});
				}
			);
	}

	render() {
		const { currentBusiness, id, reviews, userId, isLoading, allUsers } = this.props;
		const { errors } = this.state;

		if (isLoading) { return <Spinner />; }

		return (
			<div className="businesses">
				<div className="container list">
					<img id="businessImage" src={currentBusiness.businessImage} alt="Business Image" />
					<h1 className="businessName">{currentBusiness.businessName}</h1>
					<div className="details">
						<div>
							<h3 className="business" style={{'display': 'inline-block'}}>Business Details</h3>
							{
								currentBusiness.userId === userId
								?
									<div style={{'display': 'inline-block', 'float': 'right'}}>
										<Link to={`/${id}/edit`} className="btn btn-primary mr-2"> Edit</Link>
										<button className="btn btn-danger" data-toggle="modal" data-target="#deleteModal">
											Delete
										</button>

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
										{
											errors === 'Oops! You cannot delete this business' &&
											<div style={{ marginTop: '30px' }}>
												<span className='alert alert-danger'>{errors}</span>
											</div>
										}
									</div>
								: null
							}
						</div>
						<hr />
						<div className="details-margin">
							<div>
								<div className="mr-3 address">
									<i className="fa fa-map-marker fa-lg"></i>
								</div>
								<div className="address">
									<h5>{currentBusiness.address} {currentBusiness.location}</h5>
								</div>
							</div>
							<div>
								<div className="mr-3 address">
									<i className="fa fa-envelope fa-lg"></i>
								</div>
								<div className="address">
									<h5>{currentBusiness.email}</h5>
								</div>
							</div>
							<div>
								<div className="mr-3 address">
									<i className="fa fa-sitemap fa-lg"></i>
								</div>
								<div className="address">
									<h5>{currentBusiness.category}</h5>
								</div>
							</div>
							<div>
								<div className="mr-3 address">
									<i className="fa fa-globe fa-lg"></i>
								</div>
								<div className="address">
									<h5>{currentBusiness.website}</h5>
								</div>
							</div>
						</div>
						<h3 className="business">Description</h3>
						<hr />
						<div className="details-margin">
							{currentBusiness.businessInfo}
						</div>
						<h3 className="business">Reviews</h3>
						<hr />
						<ReviewList reviews={reviews} id={id} />
					</div>
				</div>
			</div>
		);
	}
}

BusinessProfilePage.contextTypes = {
	router: PropTypes.object.isRequired
}

export default BusinessProfilePage;

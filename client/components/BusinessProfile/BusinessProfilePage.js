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
					this.setState({ errors: err.response.data.message });
				}
			);
	}

	render() {
		const { currentBusiness, id, reviews, userId, isLoading } = this.props;
		const { errors } = this.state;

		if (isLoading) { return <Spinner />; }

		return (
			<div className="back">
				<div className="mid">
					<div className="row">
						<div className="col-md-6 col-lg-6">
							<div className="text-lg-center">
								<h1 className="bus-name">{currentBusiness.businessName}</h1>
								<div>
									<img id="logo" src={require('../../public/images/companies/nbc.jpg')} alt="" />
								</div>
								<p id="motto">{currentBusiness.website}</p>
							</div>
						</div>
						<hr />
						<div className="col-md-6 col-lg-6 verticalLine">
							<h3 className="text-lg-center details bus-name">Details</h3>
							<div className="top">
								<p><strong>Address:</strong> {currentBusiness.address}</p>
								<p><strong>Email Address:</strong> {currentBusiness.email}</p>
								<p><strong>Brief Bio:</strong> {currentBusiness.businessInfo}</p>
								<p><strong>Category:</strong> {currentBusiness.category}</p>
								<p><strong>Location:</strong> {currentBusiness.location}</p>
							</div>
						</div>
					</div>
					{
						currentBusiness.userId === userId
						?
							<div className="form-row text-center">
								<div className="col-12">
									<Link to={`/${id}/edit`} className="btn btn-primary edit fa fa-cog"> Edit</Link>
									<button className="btn btn-danger" data-toggle="modal" data-target="#deleteModal">
										Delete
									</button>

									<div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
										<div className="modal-dialog" role="document">
											<div className="modal-content">
												<div className="modal-header">
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
							</div>
						: null
					}
					<hr />

					<ReviewList reviews={reviews} id={id} />
				</div>
			</div>
		);
	}
}

BusinessProfilePage.contextTypes = {
	router: PropTypes.object.isRequired
}

export default BusinessProfilePage;

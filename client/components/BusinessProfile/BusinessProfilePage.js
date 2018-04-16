import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReviewList from './ReviewList';

class BusinessProfilePage extends Component {
	constructor() {
		super();
		this.state = {
			errors: '',
			isLoading: false
		}
	}

	componentWillMount() {
		this.props.fetchBusiness(this.props.id);
		this.props.fetchReviews(this.props.id);
	}

	onClick(e) {
		this.setState({ errors: '', isLoading: true });
		this.props.deleteBusiness(this.props.id).then(
			() => {
				this.props.addFlashMessage({
					type: 'success',
					text: 'Business deleted successfully'
				});
				this.context.router.history.push('/');
			},
			(data) => this.setState({ errors: data.response.data.message, isLoading: false })
		);
	}

	render() {
		const { currentBusiness, id, reviews } = this.props;
		const { errors } = this.state;

		const noReviews = (
			<h5>There are no reviews for this business</h5>
		);

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
					<div className="form-row text-center">
						<div className="col-12">
							<Link to={`/${id}/edit`} className="btn btn-primary edit fa fa-cog"> Edit</Link>
							<button
								className="btn btn-danger"
								onClick={this.onClick.bind(this)}
							>
								Delete
							</button>
							{
								errors === 'Oops! You cannot delete this business' &&
								<div style={{ marginTop: '30px' }}>
									<span className='alert alert-danger'>{errors}</span>
								</div>
							}
						</div>
					</div>
					<hr />

					{reviews.length === 0 ? noReviews : <ReviewList reviews={reviews} />}
				</div>
			</div>
		);
	}
}

BusinessProfilePage.contextTypes = {
	router: PropTypes.object.isRequired
}

export default BusinessProfilePage;

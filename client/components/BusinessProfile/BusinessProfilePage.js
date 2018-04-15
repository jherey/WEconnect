import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BusinessProfilePage extends Component {
	componentWillMount() {
		this.props.fetchBusiness(this.props.id);
	}

	render() {
		const { currentBusiness } = this.props;

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
							<Link to={`/${this.props.id}/edit`} className="btn btn-primary edit fa fa-cog"> Edit Account Details</Link>
							<Link to="/delete" className="btn btn-danger edit fa fa-cog"> Delete Business</Link>
						</div>
					</div>
					<hr />
					<h3 className="text-center rev">REVIEWS</h3>
					<div className="row">
						<div className="col-lg-1 text-center">
							<img src={require('../../public/images/ppic.jpg')} />
						</div>
						<div className="col-lg-11">
							<p><strong>sheyii</strong></p>
							<p>Good working conditions. Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
						</div>
						<hr />
						<div className="col-lg-1 text-center">
							<img src={require('../../public/images/ppic.jpg')} />
						</div>
						<div className="col-lg-11">
							<p><strong>sheyii</strong></p>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
						aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
						</div>
					</div>
					<div className="text-center">
						<button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
							Add Review
						</button>
					</div>
				</div>

				<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">Write Review</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<div className="form-group">
									<label htmlFor="comment" id="col">Review:</label>
									<textarea className="form-control" rows="5" id="review"></textarea>
								</div>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
								<button type="button" className="btn btn-primary">Save review</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default BusinessProfilePage;

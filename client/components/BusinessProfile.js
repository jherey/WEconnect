import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BusinessProfile extends Component {
	render() {
		return (
			<div class="back">
				<div class="mid">
					<div class="row">
						<div class="col-md-6 col-lg-6">
							<div class="text-lg-center">
								<h1 class="bus-name">BRUTE DEV HUB</h1>
								<div>
									<img id="logo" src={require('../public/images/companies/nbc.jpg')} alt="" />
								</div>
								<p id="motto">Motto/Slogan of Business</p>
							</div>
						</div>
						<hr />
						<div class="col-md-6 col-lg-6 verticalLine">
							<h3 class="text-lg-center details bus-name">Details</h3>
							<div class="top">
								<p><strong>Address:</strong> 5, Soko Street, Ilupeju, Lagos State</p>
								<p><strong>Email Address:</strong> bus@gmail.com</p>
								<p><strong>Brief Bio:</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
							</div>
						</div>
					</div>
					<div class="form-row text-center">
						<div class="col-12">
							<Link to="/edit" class="btn btn-primary edit fa fa-cog"> Edit Account Details</Link>
							<Link to="/delete" class="btn btn-danger edit fa fa-cog"> Delete Business</Link>
						</div>
					</div>
					<hr />
					<h3 class="text-center rev">REVIEWS</h3>
					<div class="row">
						<div class="col-lg-1 text-center">
							<img src={require('../public/images/ppic.jpg')} />
						</div>
						<div class="col-lg-11">
							<p><strong>sheyii</strong></p>
							<p>Good working conditions. Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
						</div>
						<hr />
						<div class="col-lg-1 text-center">
							<img src={require('../public/images/ppic.jpg')} />
						</div>
						<div class="col-lg-11">
							<p><strong>sheyii</strong></p>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
						aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
						</div>
					</div>
					<div class="text-center">
						<button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
							Add Review
						</button>
					</div>
				</div>

				<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="exampleModalLabel">Write Review</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<div class="form-group">
									<label for="comment" id="col">Review:</label>
									<textarea class="form-control" rows="5" id="review"></textarea>
								</div>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
								<button type="button" class="btn btn-primary">Save review</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default BusinessProfile;

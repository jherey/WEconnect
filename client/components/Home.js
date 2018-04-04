import React, { Component } from 'react';

class Home extends Component {
	render() {
		return (
			<div>
				<div className="main-image">
					<div className="row">
						<div className="col-lg-12">
							<div className="text-center catchphrase">
								<h3>Connecting People, Connecting Businesses</h3>
								<hr id="index-hr" />
							</div>
							<div className="btn-toolbar mb-3 container" id="content" role="toolbar" aria-label="Toolbar with button groups">
								<div className="input-group mr-3">
									<input type="text" size="50" class="form-control" placeholder="Search by location or category" aria-describedby="btnGroupAddon" />
								</div>
								<button className="btn button">
									<i class="fa fa-search" aria-hidden="true"></i> SEARCH</button>
							</div>
						</div>
					</div>
				</div>

				<div style={{ background: 'white' }}>
					<div class="row align-items-center justify-content-center" id="regbutton">
						<a href="busreg.html" class="btn btn-primary btn-md">Register a Business</a>
					</div>

					<div class="container tech-content">
						<div class="row text-center">
							<div class="col-lg-2 col-sm-6">
								<a href="busprofile1.html" class="d-block mb-4 h-100">
									<img class="img-fluid img-thumbnail" src={require('../public/images/companies/nbc.jpg')} alt="" />
									<p class="category">NBC</p>
								</a>
							</div>
							<div class="col-lg-2 col-sm-6">
								<a href="busprofile1.html" class="d-block mb-4 h-100">
									<img class="img-fluid img-thumbnail" src={require('../public/images/companies/chevron.jpg')} alt="" />
									<p class="category">CHEVRON</p>
								</a>
							</div>
							<div class="col-lg-2 col-sm-6">
								<a href="busprofile1.html" class="d-block mb-4 h-100">
									<img class="img-fluid img-thumbnail" src={require('../public/images/companies/exxon.jpg')} alt="" />
									<p class="category">EXXON MOBIL</p>
								</a>
							</div>
							<div class="col-lg-2 col-sm-6">
								<a href="busprofile1.html" class="d-block mb-4 h-100">
									<img class="img-fluid img-thumbnail" src={require('../public/images/companies/nnpc.png')} alt="" />
									<p class="category">NNPC</p>
								</a>
							</div>
							<div class="col-lg-2 col-sm-6">
								<a href="busprofile1.html" class="d-block mb-4 h-100">
									<img class="img-fluid img-thumbnail" src={require('../public/images/companies/mtn.jpg')} alt="" />
									<p class="category">MTN</p>
								</a>
							</div>
							<div class="col-lg-2 col-sm-6">
								<a href="busprofile1.html" class="d-block mb-4 h-100">
									<img class="img-fluid img-thumbnail" src={require('../public/images/companies/nestle.png')} alt="" />
									<p class="category">NESTLE</p>
								</a>
							</div>
							<div class="col-lg-2 col-sm-6">
								<a href="busprofile1.html" class="d-block mb-4 h-100">
									<img class="img-fluid img-thumbnail" src={require('../public/images/companies/shell.png')} alt="" />
									<p class="category">SHELL</p>
								</a>
							</div>
							<div class="col-lg-2 col-sm-6">
								<a href="busprofile1.html" class="d-block mb-4 h-100">
									<img class="img-fluid img-thumbnail" src={require('../public/images/companies/shoprite.png')} alt="" />
									<p class="category">SHOPRITE</p>
								</a>
							</div>
							<div class="col-lg-2 col-sm-6">
								<a href="busprofile1.html" class="d-block mb-4 h-100">
									<img class="img-fluid img-thumbnail" src={require('../public/images/companies/nbc.jpg')} alt="" />
									<p class="category">NBC</p>
								</a>
							</div>
							<div class="col-lg-2 col-sm-6">
								<a href="busprofile1.html" class="d-block mb-4 h-100">
									<img class="img-fluid img-thumbnail" src={require('../public/images/companies/chevron.jpg')} alt="" />
									<p class="category">CHEVRON</p>
								</a>
							</div>
							<div class="col-lg-2 col-sm-6">
								<a href="busprofile1.html" class="d-block mb-4 h-100">
									<img class="img-fluid img-thumbnail" src={require('../public/images/companies/exxon.jpg')} alt="" />
									<p class="category">EXXON MOBIL</p>
								</a>
							</div>
							<div class="col-lg-2 col-sm-6">
								<a href="busprofile1.html" class="d-block mb-4 h-100">
									<img class="img-fluid img-thumbnail" src={require('../public/images/companies/nnpc.png')} alt="" />
									<p class="category">NNPC</p>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Home;
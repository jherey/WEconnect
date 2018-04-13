import React, { Component } from 'react';

const HeroImage = () => {
	return (
		<div className="main-image">
			<div className="row">
				<div className="col-lg-12">
					<div className="text-center catchphrase">
						<h3>Connecting People, Connecting Businesses</h3>
						<hr id="index-hr" />
					</div>
					<div className="btn-toolbar mb-3 container" id="content" role="toolbar" aria-label="Toolbar with button groups">
						<div className="input-group mr-3">
							<input type="text" size="50" className="form-control" placeholder="Search by location or category" aria-describedby="btnGroupAddon" />
						</div>
						<button className="btn button">
							<i className="fa fa-search" aria-hidden="true"></i> SEARCH</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HeroImage;

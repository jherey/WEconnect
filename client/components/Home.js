import React, { Component } from 'react';

class Home extends Component {
	render() {
		return (
			<div>
				<div class="main-image">
					<div class="row">
						<div class="col-lg-12">
							<div class="text-center catchphrase">
								<h3>Connecting People, Connecting Businesses</h3>
								<hr id="index-hr" />
				</div>
								<div class="btn-toolbar mb-3 container" id="content" role="toolbar" aria-label="Toolbar with button groups">
									<div class="input-group mr-3">
										<input type="text" size="50" class="form-control" placeholder="Search by location or category" aria-describedby="btnGroupAddon" />
					</div>
										<button class="btn button">
											<i class="fa fa-search" aria-hidden="true"></i> SEARCH</button>
									</div>
								</div>
							</div>
						</div>
			</div>
		);
	}
}
export default Home;
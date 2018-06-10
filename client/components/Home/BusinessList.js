import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Business from './Business';

const BusinessList = ({ businesses }) => {
	const noBusiness = (
		<h5>There are no businesses yet</h5>
	);

	const businessComponent = businesses.reverse().map((business, i) => {
		if (i < 8) {
			return (
				<div className="col-lg-3 col-md-6 py-2" key={business.id}>
					<Business
						id={business.id}
						name={business.businessName}
						description={business.businessInfo}
						businessImage={business.businessImage}
						address={business.address}
						location={business.location}
						category={business.category}
						user={business.User.username}
					/>
				</div>
			);
		}
	});

	return (
		<div className="container list">
			<h2 className='text-center latest'>Latest Businesses</h2>
			<div className="row">
				{businesses.length === 0 ? noBusiness : businessComponent}
			</div>
		</div>
	);
}

export default BusinessList;

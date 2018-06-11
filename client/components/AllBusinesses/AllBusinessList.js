import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Business from '../Home/Business';
import Spinner from '../Spinner';

const BusinessList = ({ businesses, isLoading }) => {
	const noBusiness = (
		<h5>There are no businesses yet</h5>
	);

	const businessComponent = businesses.map((business, i) => {
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
	});

	if (isLoading) { return <Spinner />; }

	return (
		<div className="businesses">
			<div className="container list allBusinesses">
				<div className="row">
					{businesses.length === 0 ? noBusiness : businessComponent}
				</div>
			</div>
		</div>
	);
}

export default BusinessList;

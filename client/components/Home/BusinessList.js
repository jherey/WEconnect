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
				<div className="col-lg-3 col-md-6 py-2">
					<Business
						key={businesses[i].id}
						id={businesses[i].id}
						name={businesses[i].businessName}
						description={businesses[i].businessInfo}
						businessImage={businesses[i].businessImage}
						address={businesses[i].address}
						location={businesses[i].location}
						category={businesses[i].category}
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
			{businesses.length < 8 ?
				null
				:
				<div className="row justify-content-end d-flex">
					<Link to="/all">View all Businesses...</Link>
				</div>
			}
		</div>
	);
}

export default BusinessList;

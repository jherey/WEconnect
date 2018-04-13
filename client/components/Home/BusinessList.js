import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Business from './Business';

const BusinessList = ({ businesses }) => {
	const noBusiness = (
		<h5>There are no businesses yet</h5>
	);

	const businessComponent = businesses.reverse().map((business, i) => {
		return (
			<Business
				key={businesses[i].id}
				id={businesses[i].id}
				name={businesses[i].businessName}
			/>
		);
	});

	return (
		<div className="container">
			<div className="row text-center">
				{businesses.length === 0 ? noBusiness : businessComponent}
			</div>
			<div className="row justify-content-end d-flex">
				<Link to="/all">View all Businesses...</Link>
			</div>
		</div>
	);
}

export default BusinessList;

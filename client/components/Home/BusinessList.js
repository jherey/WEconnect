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
				<Business
					key={businesses[i].id}
					id={businesses[i].id}
					name={businesses[i].businessName}
				/>
			);
		}
	});

	return (
		<div className="container">
			<div className="row text-center">
				{businesses.length === 0 ? noBusiness : businessComponent}
			</div>
			{businesses.length < 8 ? <p></p>
			:
				<div className="row justify-content-end d-flex">
					<Link to="/all">View all Businesses...</Link>
				</div>
			}
		</div>
	);
}

export default BusinessList;

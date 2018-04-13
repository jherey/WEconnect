import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Business from './Business';

const BusinessList = ({ businesses }) => {
	const noBusiness = (
		<h5>There are no businesses yet</h5>
	);

	const businessComponent = businesses.map((business, i) => {
		return (
			<Business
				key={businesses[i].id}
				id={businesses[i].id}
				name={businesses[i].businessName}
			/>
		);
	});

	return (
		<div className="container tech-content">
			<div className="row text-center">
				{businesses.length === 0 ? noBusiness : businessComponent}
			</div>
		</div>
	);
}

export default BusinessList;

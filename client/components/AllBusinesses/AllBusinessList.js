import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Business from '../Home/Business';

const BusinessList = ({ businesses }) => {
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
		<div className="container">
			<div className="row text-center">
				{businessComponent}
			</div>
		</div>
	);
}

export default BusinessList;

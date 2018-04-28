import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Business from '../Home/Business';
import Spinner from '../Spinner';

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

	const { isLoading } = this.props;

	if (isLoading) { return <Spinner />; }

	return (
		<div className="container">
			<div className="row text-center">
				{businessComponent}
			</div>
		</div>
	);
}

export default BusinessList;

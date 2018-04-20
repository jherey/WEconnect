import React, { Component } from 'react';
import Business from '../Home/Business';

class DashboardPage extends Component {
	render() {
		const businessComponent = this.props.businessList.map((business) => {
			return (
				<Business
					key={business.id}
					id={business.id}
					name={business.businessName}
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
}

export default DashboardPage;

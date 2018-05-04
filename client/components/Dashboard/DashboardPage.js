import React, { Component } from 'react';
import Business from '../Home/Business';
import Spinner from '../Spinner';

class DashboardPage extends Component {
	render() {
		const noBusiness = (
			<h5>You don't own any business</h5>
		);

		const businessComponent = this.props.businessList.map((business) => {
			return (
				<Business
					key={business.id}
					id={business.id}
					name={business.businessName}
					description={business.businessInfo}
					businessImage={business.businessImage}
					address={business.address}
					location={business.location}
					category={business.category}
				/>
			);
		});

		const { isLoading } = this.props;

		if (isLoading) { return <Spinner />; }

		return (
			<div className="container">
				<div className="row">
					{businessComponent.length === 0 ? noBusiness : businessComponent}
				</div>
			</div>
		);
	}
}

export default DashboardPage;

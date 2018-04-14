import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import BusinessProfilePage from './BusinessProfilePage';

class BusinessProfile extends Component {
	render() {
		const { id } = this.props.match.params;
		const { businesses } = this.props;
		const business = businesses.filter(business => {
			return business.id == id
		});

		return (
			<div>
				<BusinessProfilePage business={business} />
			</div>
		);
	}
};

function mapStateToProps(state) {
	return {
		businesses: state.businesses
	}
}

export default withRouter(connect(mapStateToProps)(BusinessProfile));


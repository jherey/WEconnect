import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBusiness } from '../../actions/businessActions';
import BusinessProfilePage from './BusinessProfilePage';

class BusinessProfile extends Component {
	render() {
		const { id } = this.props.match.params;

		return (
			<div>
				<BusinessProfilePage id={id} fetchBusiness={this.props.fetchBusiness} />
			</div>
		);
	}
};

export default withRouter(connect(null, { fetchBusiness })(BusinessProfile));


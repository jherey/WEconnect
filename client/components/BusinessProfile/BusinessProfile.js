import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBusiness, currentBusiness } from '../../actions/businessActions';
import BusinessProfilePage from './BusinessProfilePage';

class BusinessProfile extends Component {
	render() {
		const { id } = this.props.match.params;

		return (
			<div>
				<BusinessProfilePage id={id} fetchBusiness={this.props.fetchBusiness} currentBusiness={this.props.currentBusiness} />
			</div>
		);
	}
};

function mapStateToProps(state) {
	return {
		currentBusiness: state.currentBusiness
	}
}

export default withRouter(connect(mapStateToProps, { fetchBusiness, currentBusiness })(BusinessProfile));


import React, { Component } from 'react';
import AllBusinessList from './AllBusinessList';
import { connect } from 'react-redux';
import { getAllBusinesses } from '../../actions/businessActions';

class AllBusinesses extends Component {
	componentDidMount() {
		this.props.getAllBusinesses();
	}

	render() {
		const { businesses } = this.props;

		return (
			<div id='allbusiness'>
				<AllBusinessList businesses={businesses} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		businesses: state.businesses
	}
}

export default connect(mapStateToProps, { getAllBusinesses })(AllBusinesses);

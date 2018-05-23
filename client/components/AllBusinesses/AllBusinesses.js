import React, { Component } from 'react';
import AllBusinessList from './AllBusinessList';
import { connect } from 'react-redux';
import { getAllBusinesses } from '../../actions/businessActions';

class AllBusinesses extends Component {
	componentWillMount() {
		this.props.getAllBusinesses();
	}

	render() {
		const { businesses, isLoading } = this.props;

		return (
			<div className="paddingBottom">
				<div id='allbusiness'>
					<AllBusinessList businesses={businesses} isLoading={isLoading} />
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		businesses: state.businesses,
		isLoading: state.isLoading
	}
}

export default connect(mapStateToProps, { getAllBusinesses })(AllBusinesses);

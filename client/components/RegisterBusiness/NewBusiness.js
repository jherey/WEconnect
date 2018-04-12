import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewBusinessForm from './NewBusinessForm';
import { createBusiness } from '../../actions/businessActions';

class NewBusiness extends Component {
	render() {
		const { createBusiness } = this.props;
		return (
			<div>
				<NewBusinessForm createBusiness={createBusiness} />
			</div>
		);
	}
}

export default connect(null, { createBusiness })(NewBusiness);

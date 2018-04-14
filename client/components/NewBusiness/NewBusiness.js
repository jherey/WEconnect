import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewBusinessForm from './NewBusinessForm';
import { createBusiness } from '../../actions/businessActions';
import { addFlashMessage } from '../../actions/flashMessages';

class NewBusiness extends Component {
	render() {
		const { createBusiness, addFlashMessage } = this.props;
		return (
			<div>
				<NewBusinessForm createBusiness={createBusiness} addFlashMessage={addFlashMessage} />
			</div>
		);
	}
}

export default connect(null, { createBusiness, addFlashMessage })(NewBusiness);

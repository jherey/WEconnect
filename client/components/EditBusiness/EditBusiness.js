import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import EditBusinessForm from './EditBusinessForm';
import { connect } from 'react-redux';
import { updateBusiness } from '../../actions/businessActions';
import { addFlashMessage } from '../../actions/flashMessages';

class EditBusiness extends Component {
	render() {
		const { id } = this.props.match.params;
		const { businesses, updateBusiness, addFlashMessage } = this.props;
		const business = businesses.filter(business => {
			return business.id == id
		});

		return (
			<div>
				<EditBusinessForm
					id={id}
					business={business}
					updateBusiness={updateBusiness}
					addFlashMessage={addFlashMessage}
				/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		businesses: state.businesses
	}
}

export default withRouter(connect(mapStateToProps, { updateBusiness, addFlashMessage })(EditBusiness));

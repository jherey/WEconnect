import React, { Component } from 'react';
import { ToastContainer } from "react-toastr";
import { connect } from 'react-redux';

class FlashMessage extends Component {
	componentWillReceiveProps(nextProps) {
		const { type, text } = nextProps.message;
		if (type === 'success') {
			this.refs.container.success(type, text, {
				closeButton: true,
			})
		}
	}

	render() {
		return(
		<div className="container">
			<ToastContainer
				ref='container'
				className="toast-top-right"
			/>
		</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		message: state.flashMessages
	}
}

export default connect(mapStateToProps)(FlashMessage);

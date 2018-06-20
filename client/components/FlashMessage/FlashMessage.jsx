import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastr';
import { connect } from 'react-redux';

let container;
/**
 * @description Flash message component
 * @export {Object}
 * @class  FlashMessage
 * @extends {Component}
 */
class FlashMessage extends Component {
  /**
   * @return {object} JSX object
   * @param {nextProps} nextProps
   * @memberof FlashMessage
   */
  componentWillReceiveProps(nextProps) {
    const { type, text } = nextProps.message;

    if (type === 'success') {
      container.success(text);
    }

    if (type === 'error') {
      container.error(text);
    }
  }

  /**
   * @memberof FlashMessage
   * @return {ReactElement} markup
   */
  render() {
    return (
		<div className="container">
			<ToastContainer
        ref={(ref) => { return container = ref; }}
				className="toast-top-right"
			/>
		</div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.flashMessages
});

FlashMessage.propTypes = {
  message: PropTypes.object,
};

export default connect(mapStateToProps)(FlashMessage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BusinessList from './BusinessList.jsx';
import { getBusinessesByPage } from '../../actions/businessActions';

/**
 * @description Home page component
 * @export {Object}
 * @class  HomePage
 * @extends {Component}
 */
class HomePage extends Component {
  /**
* @description Fetches all businesses and reviews
* @param {any} props
* @returns {null} null
*/
  componentWillMount() {
    const { getBusinessesByPageAction } = this.props;
    // Action to get businesses
    getBusinessesByPageAction(1);
  }

  /**
   * @memberof HomePage
   * @return {ReactElement} markup
   */
  render() {
    // Destructure props
    const { businesses, isLoading } = this.props;

    return (
			<div className="paddingBottom">
				<div className="hero-image">
          <h1 className="container catchphrase">Connecting People, Connecting Businesses</h1>
        </div>
				<div className="businesses">
          {/* Render business list */}
          <BusinessList businesses={businesses} isLoading={isLoading} />
				</div>
			</div>
    );
  }
}

const mapStateToProps = state => ({
  businesses: state.businesses.businesses,
  isLoading: state.authUser.isLoading
});

// Prop types for homepage
HomePage.propTypes = {
  getBusinessesByPageAction: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  businesses: PropTypes.object,
};

export default connect(mapStateToProps, {
  getBusinessesByPageAction: getBusinessesByPage
})(HomePage);

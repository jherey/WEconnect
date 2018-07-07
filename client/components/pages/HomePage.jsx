import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BusinessList from './BusinessList.jsx';
import Spinner from '../common/Spinner/index.jsx';
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
    this.props.getBusinessesByPage(1);
  }

  /**
   * @memberof HomePage
   * @return {ReactElement} markup
   */
  render() {
    const { businesses, isLoading } = this.props;

    return (
			<div className="paddingBottom">
				<div className="hero-image">
          <h1 className="container catchphrase">Connecting People, Connecting Businesses</h1>
        </div>
				<div className="businesses">
          {
            isLoading
            ?
            <div style={{ marginTop: '10%', textAlign: 'center' }}>
              <Spinner />
            </div>
            :
            <BusinessList businesses={businesses} />
          }
				</div>
			</div>
    );
  }
}

const mapStateToProps = state => ({
  businesses: state.businesses.businesses,
  isLoading: state.authUser.isLoading
});

HomePage.propTypes = {
  getBusinessesByPage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  businesses: PropTypes.array,
};

export default connect(mapStateToProps, { getBusinessesByPage })(HomePage);

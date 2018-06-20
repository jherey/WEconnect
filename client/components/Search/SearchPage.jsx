import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Business from '../Home/Business.jsx';

/**
 * @description Search page component
 * @export {Object}
 * @class  SearchPage
 * @extends {Component}
 */
class SearchPage extends Component {
  /**
   * @memberof SearchPage
   * @return {ReactElement} markup
   */
  render() {
    const { searchResults } = this.props;

    const noSearchResults = (<h5>No business found</h5>);

    const searchComponent = searchResults.map(business => (
			<div className="col-lg-3 col-md-6 py-2" key={business.id}>
				<Business
					id={business.id}
					name={business.businessName}
					description={business.businessInfo}
					businessImage={business.businessImage}
					address={business.address}
					location={business.location}
					category={business.category}
					user={business.User.username}
				/>
			</div>
    ));

    return (
			<div className="container">
				<h3 className="text-center">Search results for {`"${this.props.searchWord}"`}</h3>
				<div className="row">
					{this.props.searchResults.length === 0 ? noSearchResults : searchComponent}
				</div>
			</div>
    );
  }
}

SearchPage.propTypes = {
  searchResults: PropTypes.array.isRequired,
  searchWord: PropTypes.string.isRequired,
  searchType: PropTypes.string,
};

export default SearchPage;

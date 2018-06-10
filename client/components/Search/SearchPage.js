import React, { Component } from 'react';
import Business from '../Home/Business';

class SearchPage extends Component {
	render() {
		const { searchResults, searchType } = this.props;

		const noSearchResults = (
			<h5>No business found</h5>
		);

		const searchComponent = searchResults.map((business, i) => {
			return (
				<div className="col-lg-3 col-md-6 py-2" key={business.id}>
					<Business
						id={business.id}
						name={business.businessName}
						description={business.businessInfo}
						businessImage={business.businessImage}
						address={business.address}
						location={business.location}
						category={business.category}
					/>
				</div>
			);
		});

		return (
			<div className="container list">
				<h3 className="text-center">Search results for "{this.props.searchWord}"</h3>
				<div className="row">
					{this.props.searchResults.length === 0 ? noSearchResults : searchComponent}
				</div>
			</div>
		);
	}
}

export default SearchPage;

import React, { Component } from 'react';
import Business from '../Home/Business';

class SearchPage extends Component {
	render() {
		const { searchResults } = this.props;

		const noSearchResults = (
			<h5>No business found</h5>
		);

		const searchComponent = searchResults.map((business, i) => {
			return (
				<Business
					key={business.id}
					id={business.id}
					name={business.businessName}
				/>
			);
		});

		return (
			<div className="container search">
				<div className="row text-center">
					{this.props.searchResults.length === 0 ? noSearchResults : searchComponent}
				</div>
			</div>
		);
	}
}

export default SearchPage;

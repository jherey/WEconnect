import React, { Component } from 'react';
import SearchPage from './SearchPage';
import { connect } from 'react-redux';

class Search extends Component {
	render() {
		return (
			<div className="paddingBottom">
				<div className="businesses">
					<SearchPage searchResults={this.props.searchResults} />
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		searchResults: state.searchResults
	}
}

export default connect(mapStateToProps)(Search);

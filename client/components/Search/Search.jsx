import React, { Component } from 'react';
import SearchPage from './SearchPage.jsx';
import { connect } from 'react-redux';

class Search extends Component {
	render() {
		return (
			<div className="paddingBottom">
				<div className="businesses">
					<SearchPage
						searchResults={this.props.searchResults}
						searchWord={this.props.searchWord}
					/>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		searchResults: state.searchResults.business,
		searchWord: state.searchResults.searchWord
	}
}

export default connect(mapStateToProps)(Search);

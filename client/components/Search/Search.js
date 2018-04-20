import React, { Component } from 'react';
import SearchPage from './SearchPage';
import { connect } from 'react-redux';

class Search extends Component {
	render() {
		return (
			<div id='allbusiness'>
				<SearchPage searchResults={this.props.searchResults} />
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

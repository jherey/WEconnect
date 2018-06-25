import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchPage from './SearchPage.jsx';

/**
 * @description Search component
 * @export {Object}
 * @class  Search
 * @extends {Component}
 */
class Search extends Component {
  /**
   * @memberof Search
   * @return {ReactElement} markup
   */
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

const mapStateToProps = state => ({
  searchResults: state.businesses.searchResults.business,
  searchWord: state.businesses.searchResults.searchWord
});

Search.propTypes = {
  searchResults: PropTypes.array.isRequired,
  searchWord: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(Search);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPagination from 'react-paginate';
import { connect } from 'react-redux';
import { search } from '../../actions/businessActions';
import SearchPage from './SearchPage.jsx';

/**
 * @description Search component
 * @export {Object}
 * @class  Search
 * @extends {Component}
 */
class Search extends Component {
  /**
* @description Creates an instance of AllBusinesses
* @param {object} props
* @memberof AllBusinesses
*/
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
    this.onPageChange = this.onPageChange.bind(this);
  }

  /**
* @description - get all busineses in pages
* @param  {object} page the event for the content field
* @return {null} no return or void
*/
  onPageChange(page) {
    const { searchResults, searchType } = this.props;
    this.props.search(searchResults.searchWord, searchType, page.selected + 1);
  }

  /**
* @description handles pagination
* @param {count} count
* @returns {pages} pageNumbers
* @memberof AllBusinesses
*/
  renderPagination() {
    return (
    <div>
      <ReactPagination
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={<a href="">...</a>}
        breakClassName={'break-me'}
        pageCount={this.props.paginate.totalPages}
        marginPagesDisplayed={this.props.paginate.currentPage}
        pageRangeDisplayed={8}
        onPageChange={this.onPageChange}
        containerClassName={'paginate justify-content-center'}
        subContainerClassName={'pages paginate'}
        activeClassName={'active'}
      />
    </div>
    );
  }

  /**
   * @memberof Search
   * @return {ReactElement} markup
   */
  render() {
    const { allBusinesses, searchWord } = this.props.searchResults;
    return (
			<div className="paddingBottom">
				{
          allBusinesses ?
          (<div className="businesses">
            <SearchPage
              searchResults={allBusinesses.rows}
              searchWord={searchWord}
            />
            { this.props.paginate.count > 8 ? this.renderPagination(0) : null }
          </div>) :
          (<div className="query">Please enter a search query</div>)
        }
			</div>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: state.businesses.searchResults,
  searchType: state.businesses.searchResults.searchType,
  paginate: state.businesses.searchResults.pageDetails
});

Search.propTypes = {
  search: PropTypes.func,
  searchResults: PropTypes.object,
  searchType: PropTypes.string,
  paginate: PropTypes.object
};

export default connect(mapStateToProps, { search })(Search);

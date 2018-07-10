import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPagination from 'react-paginate';
import { connect } from 'react-redux';
import { search } from '../../actions/businessActions';
import Business from '../common/Business.jsx';

/**
 * @description Search component
 * @export {Object}
 * @class  Search
 * @extends {Component}
 */
class SearchPage extends Component {
  /**
* @description Creates an instance of SearchPage
* @param {object} props
* @memberof SearchPage
*/
  constructor(props) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this);
  }

  /**
* @description - get all busineses in pages
* @param  {object} page - the event for the content field
* @return {null} no return or void
*/
  onPageChange(page) {
    const { searchResults, searchType, searchAction } = this.props;
    searchAction(searchResults.searchWord, searchType, page.selected + 1);
  }

  /**
* @description handles pagination
* @param {count} count
* @returns {pages} pageNumbers
* @memberof SearchPage
*/
  renderPagination() {
    return (
      // Pagination component
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
    );
  }

  /**
   * @memberof SearchPage
   * @return {ReactElement} markup
   */
  render() {
    // Destructure props
    const { allBusinesses, searchWord } = this.props.searchResults;

    // No business found
    if (allBusinesses === undefined) {
      return (<div className="query">Please enter a search query</div>);
    }

    const noSearchResults = (
			<div className="query text-center">
				<h2>No business found</h2>
			</div>
    );

    // Loop through search results and render a business
    const searchComponent = allBusinesses.rows.map(business => (
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
			<div className="paddingBottom">
				{
          <div className="businesses">
            <div className="container">
              {/* Search text */}
              <h3 className="text-center">Search results for {`"${searchWord}"`}</h3>
              <div className="row">
                {allBusinesses.rows.length === 0 ? noSearchResults : searchComponent}
              </div>
            </div>
            {/* Render pagination */}
            { this.props.paginate.count > 8 ? this.renderPagination() : null }
          </div>
        }
			</div>
    );
  }
}

// Map state to props
const mapStateToProps = state => ({
  searchResults: state.businesses.searchResults,
  searchType: state.businesses.searchResults.searchType,
  paginate: state.businesses.searchResults.pageDetails
});

// Proptypes for search page
SearchPage.propTypes = {
  search: PropTypes.func,
  searchResults: PropTypes.object,
  searchType: PropTypes.string,
  paginate: PropTypes.object,
  searchAction: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { searchAction: search })(SearchPage);
